import { prisma } from "../../lib/prisma";
import { AppError } from "../../utils/AppError";
import type {
	AddTechnicianSkillPayload,
	CreateTechnicianPayload,
	UpdateTechnicianPayload,
} from "./technician.interface";

const technicianInclude = {
	user: {
		select: { id: true, name: true, email: true, phone: true, imageUrl: true },
	},
	technicianSkills: {
		include: { skill: true },
	},
};

const createTechnician = async (payload: CreateTechnicianPayload) => {
	const user = await prisma.user.findUnique({ where: { id: payload.userId } });

	if (!user) {
		throw new AppError(404, "User not found");
	}

	if (user.role !== "TECHNICIAN") {
		throw new AppError(
			400,
			"Only users with technician role can have a technician profile",
		);
	}

	const existingProfile = await prisma.technicianProfile.findUnique({
		where: { userId: payload.userId },
	});

	if (existingProfile) {
		throw new AppError(409, "Technician profile already exists");
	}

	return prisma.technicianProfile.create({
		data: payload,
		include: technicianInclude,
	});
};

const getAllTechnicians = async () =>
	prisma.technicianProfile.findMany({
		include: technicianInclude,
		orderBy: { createdAt: "desc" },
	});

const getSingleTechnician = async (id: string) => {
	const result = await prisma.technicianProfile.findUnique({
		where: { id },
		include: technicianInclude,
	});

	if (!result) {
		throw new AppError(404, "Technician profile not found");
	}

	return result;
};

const updateTechnician = async (
	id: string,
	userId: string,
	role: string,
	payload: UpdateTechnicianPayload,
) => {
	const technician = await prisma.technicianProfile.findUnique({
		where: { id },
	});

	if (!technician) {
		throw new AppError(404, "Technician profile not found");
	}

	if (role === "TECHNICIAN" && technician.userId !== userId) {
		throw new AppError(
			403,
			"You are not allowed to update this technician profile",
		);
	}

	return prisma.technicianProfile.update({
		where: { id },
		data: payload,
		include: technicianInclude,
	});
};

const addSkill = async (
	id: string,
	userId: string,
	role: string,
	payload: AddTechnicianSkillPayload,
) => {
	const technician = await prisma.technicianProfile.findUnique({
		where: { id },
	});
	if (!technician) throw new AppError(404, "Technician profile not found");
	if (role === "TECHNICIAN" && technician.userId !== userId) {
		throw new AppError(
			403,
			"You are not allowed to update this technician profile",
		);
	}

	const skill = await prisma.skill.findUnique({
		where: { id: payload.skillId },
	});
	if (!skill) throw new AppError(404, "Skill not found");

	const existingSkill = await prisma.technicianSkill.findUnique({
		where: {
			technicianId_skillId: { technicianId: id, skillId: payload.skillId },
		},
	});
	if (existingSkill)
		throw new AppError(409, "Skill is already assigned to this technician");

	return prisma.technicianSkill.create({
		data: { technicianId: id, skillId: payload.skillId },
		include: { skill: true },
	});
};

const removeSkill = async (
	id: string,
	userId: string,
	role: string,
	skillId: string,
) => {
	const technician = await prisma.technicianProfile.findUnique({
		where: { id },
	});
	if (!technician) throw new AppError(404, "Technician profile not found");
	if (role === "TECHNICIAN" && technician.userId !== userId) {
		throw new AppError(
			403,
			"You are not allowed to update this technician profile",
		);
	}

	const existingSkill = await prisma.technicianSkill.findUnique({
		where: { technicianId_skillId: { technicianId: id, skillId } },
	});
	if (!existingSkill) throw new AppError(404, "Technician skill not found");

	return prisma.technicianSkill.delete({ where: { id: existingSkill.id } });
};

export const TechnicianService = {
	createTechnician,
	getAllTechnicians,
	getSingleTechnician,
	updateTechnician,
	addSkill,
	removeSkill,
};
