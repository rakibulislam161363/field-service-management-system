import httpStatus from "http-status";
import { Role } from "../../../generated/prisma/enums";
import { PaymentWhereInput } from "../../../generated/prisma/models";
import { prisma } from "../../lib/prisma";
import { RequestUser } from "../../middleware/checkAuth";
import { AppError } from "../../utils/AppError";

type PaymentQuery = {
	limit?: unknown;
	page?: unknown;
	sortBy?: unknown;
	sortOrder?: unknown;
	customerEmail?: unknown;
};

const getPagination = (query: PaymentQuery) => {
	const limitValue = Number(query.limit);
	const pageValue = Number(query.page);
	const limit = Number.isInteger(limitValue) && limitValue > 0 ? limitValue : 10;
	const page = Number.isInteger(pageValue) && pageValue > 0 ? pageValue : 1;
	return { limit, page, skip: (page - 1) * limit };
};

const getOrderBy = (query: PaymentQuery) => ({
	[typeof query.sortBy === "string" ? query.sortBy : "createdAt"]:
		query.sortOrder === "asc" ? "asc" : "desc",
});

const paymentInclude = {
	customer: { select: { id: true, name: true, email: true } },
	invoice: { include: { serviceRequest: true } },
};

const getMyPayments = async (query: PaymentQuery, user: RequestUser) => {
	const { limit, page, skip } = getPagination(query);
	const where: PaymentWhereInput = { customerId: user.userId };
	const [payments, total] = await Promise.all([
		prisma.payment.findMany({ where, take: limit, skip, orderBy: getOrderBy(query), include: paymentInclude }),
		prisma.payment.count({ where }),
	]);

	return {
		data: payments,
		meta: {
			page,
			limit,
			total,
			totalPages: Math.ceil(total / limit),
		},
	};
};

const getAllPayments = async (query: PaymentQuery) => {
	const { limit, page, skip } = getPagination(query);
	const where: PaymentWhereInput = query.customerEmail
		? { customer: { email: String(query.customerEmail) } }
		: {};
	const [payments, total] = await Promise.all([
		prisma.payment.findMany({ where, take: limit, skip, orderBy: getOrderBy(query), include: paymentInclude }),
		prisma.payment.count({ where }),
	]);

	return {
		data: payments,
		meta: {
			page,
			limit,
			total,
			totalPages: Math.ceil(total / limit),
		},
	};
};

const getSinglePayment = async (paymentId: string, user: RequestUser) => {
	const payment = await prisma.payment.findUnique({
		where: { id: paymentId },
		include: paymentInclude,
	});

	if (!payment) {
		throw new AppError(httpStatus.NOT_FOUND, "Payment Not Found");
	}

	if (user.role === Role.CUSTOMER && payment.customerId !== user.userId) {
		throw new AppError(
			httpStatus.FORBIDDEN,
			"You Are Not Allowed To View This Payment",
		);
	}

	return payment;
};

export const PaymentServices = {
	getAllPayments,
	getMyPayments,
	getSinglePayment,
};
