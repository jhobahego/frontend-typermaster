import { toast } from 'vue3-toastify';

export const toastUtilities = {
  success(message: string) {
    toast.success(message, {
      position: toast.POSITION.BOTTOM_RIGHT,
      autoClose: 3000
    });
  },
  error(message: string) {
    toast.error(message, {
      position: toast.POSITION.BOTTOM_RIGHT,
      autoClose: 3000
    });
  },
  info(message: string) {
    toast.info(message, {
      position: toast.POSITION.BOTTOM_RIGHT,
      autoClose: 3000
    });
  },
  warning(message: string) {
    toast.warning(message, {
      position: toast.POSITION.BOTTOM_RIGHT,
      autoClose: 3000
    });
  }
};

// Helper function to get a user-friendly error message based on status code
export function getApiErrorMessage(status: number, defaultMessage: string = 'An unexpected error occurred'): string {
  switch (status) {
    case 400:
      return 'Bad Request: Please check your input.';
    case 401:
      return 'Unauthorized: Authentication required.';
    case 403:
      return 'Forbidden: You do not have permission.';
    case 404:
      return 'Not Found: The requested resource could not be found.';
    case 500:
      return 'Server Error: Please try again later.';
    default:
      return defaultMessage;
  }
}
