import { AxiosRequestConfig } from 'axios';

const ON_BEHALF_OF = 'on-behalf-of';

export function onBehalfOf(userId: string): AxiosRequestConfig {
  return {
    headers: {
      [ON_BEHALF_OF]: userId,
    },
  };
}
