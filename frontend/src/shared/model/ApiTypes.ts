export interface FailedRequest {
  resolve: (value: unknown) => void;
  reject: (reason: any) => void;
}
