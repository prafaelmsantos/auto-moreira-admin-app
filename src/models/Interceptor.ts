export interface InterceptorRequest {
  method: string;
  headers: InterceptorRequestHeaders;
  body?: string | FormData | null | undefined;
}

interface InterceptorRequestHeaders {
  [key: string]: string;
}
