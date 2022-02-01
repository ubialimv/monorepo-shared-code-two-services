import { AxiosInstance } from 'axios';

export default class AxiosInterceptor {
  constructor(protected api: AxiosInstance) {
    api.interceptors.request.use((request) => {
      console.log(
        'info',
        `Started Request ${request?.method?.toUpperCase()} ${request.url}`,
        {
          eventName: 'started_outbound_request',
        },
      );
      return request;
    });

    api.interceptors.response.use(
      (response) => {
        console.log(
          'info',
          `Finished Request ${response?.config?.method?.toUpperCase()} ${
            response.config.url
          } with status ${response.status}`,
          {
            eventName: 'successful_outbound_request',
          },
        );
        return response.data;
      },
      (error) => {
        console.log(
          'error',
          `Finished Request ${error?.config?.method?.toUpperCase()} ${
            error?.config?.url
          } with status ${error?.response?.status || error?.status}`,
          {
            eventName: 'failed_outbound_request',
          },
        );
        return Promise.reject(error);
      },
    );
  }
}
