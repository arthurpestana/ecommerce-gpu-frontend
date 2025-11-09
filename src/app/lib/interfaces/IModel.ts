import { ManufacturerResponse } from "./IManufacturer";

export interface ModelResponse {
    id: string;
    name: string;
    manufacturer: ManufacturerResponse;
    releaseDate: Date;
}
