export interface SuccessResponse<T> {
  status: boolean;
  message: string;
  data: T;
}

export interface ErrorResponse {
  status: boolean;
  error: string;
  message: string;
  details?: any;
}


export type Note = {
    name : string
}