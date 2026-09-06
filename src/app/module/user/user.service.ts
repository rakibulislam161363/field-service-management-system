import bcrypt from "bcryptjs";
import { prisma } from "../../lib/prisma";
import { AppError } from "../../utils/AppError";
import type { CreateUserPayload, UpdateUserPayload } from "./user.interface";

const userSelect = {
	id: true,
	name: true,
	email: true,
	phone: true,
	role: true,
	status: true,
	authProvider: true,
	emailVerified: true,
	imageUrl: true,
	isDeleted: true,
	createdAt: true,
	updatedAt: true,
	customerProfile: true,
	technicianProfile: true,
};

const createUser = async (payload: CreateUserPayload) => {
	const email = payload.email.trim().toLowerCase();
	const existingUser = await prisma.user.findUnique({ where: { email } });
	if (existingUser)
		throw new AppError(409, "User with this email already exists");

	const password = await bcrypt.hash(payload.password, 8);
	return prisma.user.create({
		data: {
			name: payload.name,
			email,
			password,
			role: payload.role ?? "CUSTOMER",
			phone: payload.phone,
		},
		select: userSelect,
	});
};

const getAllUsers = async () =>
	prisma.user.findMany({
		where: { isDeleted: false },
		select: userSelect,
		orderBy: { createdAt: "desc" },
	});

const getSingleUser = async (id: string) => {
	const result = await prisma.user.findUnique({
		where: { id },
		select: userSelect,
	});
	if (!result) throw new AppError(404, "User not found");
	return result;
};

const updateUser = async (id: string, payload: UpdateUserPayload) => {
	await getSingleUser(id);
	const isDeleted =
		payload.status === "DELETED"
			? true
			: payload.status === "ACTIVE"
				? false
				: undefined;
	return prisma.user.update({
		where: { id },
		data: { ...payload, isDeleted },
		select: userSelect,
	});
};

const deleteUser = async (id: string) => {
	await getSingleUser(id);
	return prisma.user.update({
		where: { id },
		data: { status: "DELETED", isDeleted: true },
		select: userSelect,
	});
};

export const UserService = {
	createUser,
	getAllUsers,
	getSingleUser,
	updateUser,
	deleteUser,
};
