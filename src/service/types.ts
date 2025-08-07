import type { User } from "../common/types";

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
  name: string;
};

export type Notes = {
  id: string;
  name: string;
  content: string;
  createdAt: string;
  updatedAt: string;
};


export type Collabrator = {
  socketId: string;
  user : User
}