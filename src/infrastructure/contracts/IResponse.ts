// Layer: Infrastructure
// Path: src/infrastructure/contracts/IResponse.ts

export interface IResponse<T> {
  ok: boolean;
  response: T;
  message: string;
}
