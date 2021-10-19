/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */

// todo -- explore typing
export const axiosErrorHandler = (error: any) => {
  // ? axios error object has a response property on it.
  return {
    type: error.response?.data.type || "error",
    message: error.response?.data.message || "Oops, something went wrong.",
  };
};
