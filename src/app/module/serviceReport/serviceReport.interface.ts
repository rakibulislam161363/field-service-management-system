export interface CreateServiceReportPayload {
	serviceRequestId: string;
	workOrderId: string;
	technicianNotes?: string;
	workDescription?: string;
	materialsUsed?: string;
}
export type UpdateServiceReportPayload = Omit<
	Partial<CreateServiceReportPayload>,
	"serviceRequestId" | "workOrderId"
>;
