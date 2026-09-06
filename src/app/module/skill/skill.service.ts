import { prisma } from "../../lib/prisma";
import { AppError } from "../../utils/AppError";
import type { SkillPayload } from "./skill.interface";
const createSkill = (data: SkillPayload) => prisma.skill.create({ data });
const getAllSkills = () => prisma.skill.findMany({ include: { technicianSkills: true }, orderBy: { name: "asc" } });
const getSingleSkill = async (id: string) => { const result = await prisma.skill.findUnique({ where: { id }, include: { technicianSkills: true } }); if (!result) throw new AppError(404, "Skill not found"); return result; };
const updateSkill = async (id: string, data: Partial<SkillPayload>) => { await getSingleSkill(id); return prisma.skill.update({ where: { id }, data }); };
const deleteSkill = async (id: string) => { await getSingleSkill(id); return prisma.skill.delete({ where: { id } }); };
export const SkillService = { createSkill, getAllSkills, getSingleSkill, updateSkill, deleteSkill };
