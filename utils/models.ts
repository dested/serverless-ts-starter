export interface LambdaRequestEvent<T> {
  queryStringParameters: T;
  pathParameters: T;
  body: T;
  params: T;
  headers: RequestHeaders;
  httpMethod: string;
  path: string;
}

export interface RequestEvent<T> {
  params: T;
  headers: RequestHeaders;
  httpMethod: string;
  path: string;
}

export interface RequestHeaders {
  authorization: string;
}
