import { CategoryResponse } from "./ICategory";
import { ImageResponse } from "./IImage";
import { ModelResponse } from "./IModel";
import { TechnologyResponse } from "./ITechnology";

export interface GpuResponse {
    id: number;
    name: string;
    description: string;
    price: number;
    isActive: boolean;
    availableQuantity: number;
    memory: number;
    architecture: string;
    energyConsumption: number;
    model: ModelResponse;
    images: ImageResponse[];
    technologies: TechnologyResponse[];
    categories: CategoryResponse[];
}
