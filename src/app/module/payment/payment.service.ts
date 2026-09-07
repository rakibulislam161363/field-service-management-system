import httpStatus from "http-status";
import { Role } from "../../../generated/prisma/enums";
import { PaymentWhereInput } from "../../../generated/prisma/models";
import config from "../../config";
import { bkashRequest } from "../../lib/bkash";
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

type BkashCreateResponse = {
	paymentID: string;
	bkashURL: string;
};

type BkashExecuteResponse = {
	paymentID: string;
	trxID: string;
	transactionStatus: string;
};

const createPayment = async (invoiceId: string, user: RequestUser) => {
	if (!invoiceId || typeof invoiceId !== "string") {
		throw new AppError(httpStatus.BAD_REQUEST, "Invoice ID Is Required");
	}

	const invoice = await prisma.invoice.findFirst({
		where: { id: invoiceId, customerId: user.userId },
	});

	if (!invoice) {
		throw new AppError(httpStatus.NOT_FOUND, "Invoice Not Found");
	}

	if (invoice.status === "PAID") {
		throw new AppError(httpStatus.BAD_REQUEST, "Invoice Is Already Paid");
	}

	const payment = await prisma.payment.create({
		data: {
			invoiceId: invoice.id,
			customerId: user.userId,
			amount: invoice.amount,
			paymentMethod: "BKASH",
		},
	});

	try {
		const result = await bkashRequest<BkashCreateResponse>(
			"/tokenized/checkout/create",
			{
				mode: "001",
				payerReference: user.userId,
				callbackURL: config.bkash_callback_url,
				amount: invoice.amount.toString(),
				currency: "BDT",
				intent: "sale",
				merchantInvoiceNumber: payment.id,
			},
		);

		const updatedPayment = await prisma.payment.update({
			where: { id: payment.id },
			data: { transactionId: result.paymentID },
		});

		return {
			payment: updatedPayment,
			paymentID: result.paymentID,
			bkashURL: result.bkashURL,
		};
	} catch (error) {
		await prisma.payment.update({
			where: { id: payment.id },
			data: { status: "FAILED" },
		});
		throw error;
	}
};

const executePayment = async (paymentID: string, user: RequestUser) => {
	if (!paymentID || typeof paymentID !== "string") {
		throw new AppError(httpStatus.BAD_REQUEST, "Payment ID Is Required");
	}

	const payment = await prisma.payment.findFirst({
		where: { transactionId: paymentID, customerId: user.userId },
	});

	if (!payment) {
		throw new AppError(httpStatus.NOT_FOUND, "Payment Not Found");
	}

	if (payment.status === "PAID") {
		return payment;
	}

	const result = await bkashRequest<BkashExecuteResponse>(
		"/tokenized/checkout/execute",
		{ paymentID },
	);

	if (result.transactionStatus !== "Completed") {
		await prisma.payment.update({
			where: { id: payment.id },
			data: { status: "FAILED" },
		});
		throw new AppError(httpStatus.BAD_REQUEST, "Bkash Payment Was Not Completed");
	}

	return prisma.$transaction(async (transaction) => {
		const paidPayment = await transaction.payment.update({
			where: { id: payment.id },
			data: {
				status: "PAID",
				transactionId: result.trxID,
				paidAt: new Date(),
			},
		});
		await transaction.invoice.update({
			where: { id: payment.invoiceId },
			data: { status: "PAID" },
		});
		return paidPayment;
	});
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
	createPayment,
	executePayment,
	getAllPayments,
	getMyPayments,
	getSinglePayment,
};
