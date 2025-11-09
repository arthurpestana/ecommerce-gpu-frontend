export interface TechnologyResponse {
  id: string;
  name: string;
  description: string;
  createdAt: string;
  updatedAt: string;
}

export interface TechnologyRequest {
  name?: string;
  description?: string;
}
