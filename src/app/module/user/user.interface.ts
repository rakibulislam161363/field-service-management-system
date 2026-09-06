export interface CreateUserPayload {
	name: string;
	email: string;
	password: string;
	role?: "CUSTOMER" | "TECHNICIAN" | "MANAGER" | "FINANCE" | "ADMIN";
	phone?: string;
}

export interface UpdateUserPayload {
	name?: string;
	phone?: string;
	role?: "CUSTOMER" | "TECHNICIAN" | "MANAGER" | "FINANCE" | "ADMIN";
	status?: "ACTIVE" | "BLOCKED" | "DELETED";
	imageUrl?: string;
}
