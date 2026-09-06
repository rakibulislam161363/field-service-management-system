export interface CreateAssignmentPayload {
	serviceRequestId: string;
	technicianId: string;
	scheduledAt?: string;
	notes?: string;
}

export interface UpdateAssignmentPayload {
	scheduledAt?: string;
	status?: "PENDING" | "ACCEPTED" | "REJECTED" | "COMPLETED" | "CANCELLED";
	notes?: string;
}
