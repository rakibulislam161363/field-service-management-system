export interface CreateServiceRequestPayload {
	categoryId: string;
	title: string;
	description: string;
	address: string;
	preferredDate?: string;
}

export interface UpdateServiceRequestPayload {
	categoryId?: string;
	title?: string;
	description?: string;
	address?: string;
	preferredDate?: string;
}
