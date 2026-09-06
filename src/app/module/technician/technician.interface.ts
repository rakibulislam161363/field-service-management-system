export interface CreateTechnicianPayload {
  userId: string;
  bio?: string;
  experience?: number;
  isAvailable?: boolean;
}

export interface UpdateTechnicianPayload {
  bio?: string;
  experience?: number;
  isAvailable?: boolean;
}

export interface AddTechnicianSkillPayload {
  skillId: string;
}