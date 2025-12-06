import { CategoryResponse } from "./ICategory";
import { ImageRequest, ImageResponse } from "./IImage";
import { ManufacturerResponse } from "./IManufacturer";
import { ModelResponse } from "./IModel";
import { TechnologyRequest, TechnologyResponse } from "./ITechnology";

export interface GpuResponse {
    id: string;
    name: string;
    description: string;
    price: number;
    isActive: boolean;
    availableQuantity: number;
    memory: number;
    architecture: string;
    energyConsumption: number;
    model: ModelResponse;
    manufacturer: ManufacturerResponse;
    images: ImageResponse[];
    technologies: TechnologyResponse[];
    categories: CategoryResponse[];
    createdAt?: string;
    updatedAt?: string;
}

export interface GpuRequest {
    name: string;
    description: string;
    price: number;
    isActive: boolean;
    availableQuantity: number;
    memory: number;
    architecture: string;
    energyConsumption: number;
    modelId: string | null;
    technologies?: TechnologyRequest[];
    categoryIds?: string[];
}