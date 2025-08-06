import type { AxiosResponse } from "axios";
import type { SuccessResponse } from "./types";
import type { ErrorResponse } from "react-router";

const handleApi = async <T>(
  apiCall: Promise<AxiosResponse<SuccessResponse<T>>>
): Promise<T> => {
  try {
    const { data } = await apiCall;
    return data.data;
  } catch (error: any) {
    const err: ErrorResponse = error.response?.data || {
      status: false,
      error: "UNKNOWN_ERROR",
      message: error.message || "Something went wrong",
    };
    throw err;
  }
};


export default handleApi;