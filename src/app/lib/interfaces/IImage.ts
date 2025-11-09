export interface ImageResponse {
  id: string;
  url: string;
  altText: string;
  objectName: string;
}

export interface ImageRequest {
  url: string;
  altText?: string;
}
