export interface ImageResponse {
    id: number;
    url: string;
    altText: string;
}

export interface ImageRequest {
  url: string;
  alt?: string;
}