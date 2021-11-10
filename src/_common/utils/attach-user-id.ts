import { AxiosRequestConfig } from 'axios';

const X_USER_ID = 'x-user-id';

export function attachUserId(userId: string): AxiosRequestConfig {
  return {
    headers: {
      [X_USER_ID]: userId,
    },
  };
}
