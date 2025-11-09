export interface PaginationResponse<T> {
    items: T[];
    page: number;
    limit: number;
    total: number;
}

export interface PaginationRequest {
    page: number;
    limit: number;
}