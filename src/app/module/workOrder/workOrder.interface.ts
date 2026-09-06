export interface CreateWorkOrderPayload {
	serviceRequestId: string;
	assignmentId: string;
}
export interface UpdateWorkOrderPayload {
	status?:
		| "ASSIGNED"
		| "SCHEDULED"
		| "TECHNICIAN_ARRIVED"
		| "IN_PROGRESS"
		| "COMPLETED"
		| "CANCELLED";
	startedAt?: string;
	completedAt?: string;
}
