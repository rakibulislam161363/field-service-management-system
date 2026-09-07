import bcrypt from "bcryptjs";
import { Role } from "../../generated/prisma/enums";
import { prisma } from "../lib/prisma";

const password = process.env.SEED_PASSWORD ?? "ChangeMe123!";
const rounds = Number(process.env.BCRYPT_SALT_ROUNDS ?? 10);

const ensureUser = async (data: {
	name: string;
	email: string;
	role: Role;
	profile?: "customer" | "technician";
}) => {
	const existingUser = await prisma.user.findUnique({
		where: { email: data.email },
	});

	if (existingUser) return existingUser;

	const hashedPassword = await bcrypt.hash(password, rounds);
	return prisma.user.create({
		data: {
			name: data.name,
			email: data.email,
			password: hashedPassword,
			role: data.role,
			emailVerified: true,
			needPasswordChange: false,
			...(data.profile === "customer"
				? { customerProfile: { create: { name: data.name, email: data.email } } }
				: {}),
			...(data.profile === "technician"
				? { technicianProfile: { create: { experience: 5 } } }
				: {}),
		},
	});
};

export const seed = async () => {
	await ensureUser({
		name: "System Admin",
		email: process.env.SEED_ADMIN_EMAIL ?? "admin@example.com",
		role: Role.ADMIN,
	});
	await ensureUser({
		name: "Operations Manager",
		email: process.env.SEED_MANAGER_EMAIL ?? "manager@example.com",
		role: Role.MANAGER,
	});
	const technician = await ensureUser({
		name: "Test Technician",
		email: process.env.SEED_TECHNICIAN_EMAIL ?? "technician@example.com",
		role: Role.TECHNICIAN,
		profile: "technician",
	});
	await ensureUser({
		name: "Test Customer",
		email: process.env.SEED_CUSTOMER_EMAIL ?? "customer@example.com",
		role: Role.CUSTOMER,
		profile: "customer",
	});

	const skill = await prisma.skill.upsert({
		where: { name: "Electrical Repair" },
		update: {},
		create: { name: "Electrical Repair", description: "Home electrical service" },
	});
	const technicianProfile = await prisma.technicianProfile.findUniqueOrThrow({
		where: { userId: technician.id },
	});
	await prisma.technicianSkill.upsert({
		where: {
			technicianId_skillId: { technicianId: technicianProfile.id, skillId: skill.id },
		},
		update: {},
		create: { technicianId: technicianProfile.id, skillId: skill.id },
	});

	await prisma.serviceCategory.upsert({
		where: { name: "Electrical Services" },
		update: {},
		create: {
			name: "Electrical Services",
			description: "Electrical installation and repair",
			basePrice: "500.00",
		},
	});
	console.log("Seed data created successfully.");
};

if (process.argv[1]?.endsWith("seed.ts")) {
	seed()
		.catch((error) => {
			console.error("Seed failed:", error);
			process.exitCode = 1;
		})
		.finally(async () => prisma.$disconnect());
}
