export interface TechnologyResponse {
  id: number;
  name: string;
  description: string;
}

export interface TechnologyRequest {
  name?: string;
  description?: string;
}
