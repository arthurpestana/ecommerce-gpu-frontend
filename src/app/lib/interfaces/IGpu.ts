import { CategoryResponse } from "./ICategory";
import { ImageRequest, ImageResponse } from "./IImage";
import { ModelResponse } from "./IModel";
import { TechnologyRequest, TechnologyResponse } from "./ITechnology";

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

export interface GpuRequest {
  name: string;
  description: string;
  price: number;
  isActive: boolean;
  availableQuantity: number;
  memory: number;
  architecture: string;
  energyConsumption?: number | null;
  modelId: string;
  images?: ImageRequest[]; 
  technologies?: TechnologyRequest[];
  categoryIds?: string[];
}