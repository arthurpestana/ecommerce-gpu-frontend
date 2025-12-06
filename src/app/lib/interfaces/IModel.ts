import { ManufacturerResponse } from "./IManufacturer";

export interface ModelResponse {
    id: string;
    name: string;
    manufacturer: ManufacturerResponse;
    releaseYear: number;
    createdAt?: string;
    updatedAt?: string;
}

export interface ModelRequest {
    name: string;
    manufacturerId: string;
    releaseYear: number;
}
