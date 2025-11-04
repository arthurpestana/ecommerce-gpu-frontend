import { ManufacturerResponse } from "./IManufacturer";

export interface ModelResponse {
    id: number;
    name: string;
    manufacturer: ManufacturerResponse;
    releaseDate: Date;
}
