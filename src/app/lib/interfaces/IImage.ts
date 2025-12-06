export interface ImageResponse {
    id: string;
    url: string;
    altText: string;
    objectName: string;
    createdAt?: string;
    updatedAt?: string;
}

export interface ImageRequest {
    url: string;
    altText?: string;
}
