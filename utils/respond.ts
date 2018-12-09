export interface HttpResponse<T, TErrors extends {statusCode: number} = undefined> {
  statusCode: TErrors['statusCode'];
  headers: any;
  body: T;
}

export function respond<T, TStatusCode extends number, TError>(
  statusCode: TStatusCode,
  body?: TError
): HttpResponse<null, {statusCode: TStatusCode} & TError>;
export function respond<T, TStatusCode extends 200>(statusCode: 200, body: T): HttpResponse<T, null>;

export function respond<T, TStatusCode extends number>(
  statusCode: TStatusCode,
  body: T
): HttpResponse<T, {statusCode: TStatusCode}> {
  return {
    statusCode,
    headers: {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Credentials': true,
    },
    body: (JSON.stringify(body) as any) as T,
  };
}
