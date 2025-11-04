export interface PaginationResponse<T> {
    items: T[];
    offset: number;
    limit: number;
    total: number;
}

export interface PaginationRequest {
    offset: number;
    limit: number;
}