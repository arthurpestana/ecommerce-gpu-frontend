export interface ManufacturerResponse {
    id: string;
    name: string;
    email: string;
    cnpj: string;
    country: string;
    createdAt: string;
    updatedAt: string;
}

export interface ManufacturerRequest {
    name: string;
    email: string;
    cnpj: string;
    country: string;
}