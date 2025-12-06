export interface CategoryResponse {
    id: string;
    name: string;
    description: string;
    createdAt?: string;
    updatedAt?: string;
}

export interface CategoryRequest {
    name: string;
    description?: string;
}