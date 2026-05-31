export interface FieldError {
  field: string;
  message: string;
}

export interface ErrorResponse {
  message: string;
  errors?: FieldError[];
}
