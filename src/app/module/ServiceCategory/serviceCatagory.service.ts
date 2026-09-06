import { prisma } from "../../lib/prisma";

const createServiceCategory = async (payload: {
	name: string;
	description?: string;
	basePrice: number;
}) => {
	const existingCategory = await prisma.serviceCategory.findUnique({
		where: {
			name: payload.name,
		},
	});

	if (existingCategory) {
		throw new Error("Service category already exists");
	}

	const result = await prisma.serviceCategory.create({
		data: {
			name: payload.name,
			description: payload.description,
			basePrice: payload.basePrice,
		},
	});

	return result;
};

const getAllServiceCategories = async () => {
	const result = await prisma.serviceCategory.findMany({
		orderBy: {
			createdAt: "desc",
		},
	});

	return result;
};

const getSingleServiceCategory = async (id: string) => {
	const result = await prisma.serviceCategory.findUnique({
		where: {
			id,
		},
	});

	if (!result) {
		throw new Error("Service category not found");
	}

	return result;
};

const updateServiceCategory = async (
	id: string,
	payload: {
		name?: string;
		description?: string;
		basePrice?: number;
	},
) => {
	const category = await prisma.serviceCategory.findUnique({
		where: {
			id,
		},
	});

	if (!category) {
		throw new Error("Service category not found");
	}

	if (payload.name) {
		const existingCategory = await prisma.serviceCategory.findFirst({
			where: {
				name: payload.name,
				NOT: {
					id,
				},
			},
		});

		if (existingCategory) {
			throw new Error("Service category name already exists");
		}
	}

	const result = await prisma.serviceCategory.update({
		where: {
			id,
		},
		data: payload,
	});

	return result;
};

const deleteServiceCategory = async (id: string) => {
	const category = await prisma.serviceCategory.findUnique({
		where: {
			id,
		},
	});

	if (!category) {
		throw new Error("Service category not found");
	}

	const result = await prisma.serviceCategory.delete({
		where: {
			id,
		},
	});

	return result;
};

export const ServiceCategoryService = {
	createServiceCategory,
	getAllServiceCategories,
	getSingleServiceCategory,
	updateServiceCategory,
	deleteServiceCategory,
};
