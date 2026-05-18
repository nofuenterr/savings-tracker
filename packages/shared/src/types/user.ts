export interface User {
  id: string;
  username: string;
  email: string;
}

export interface ApiResponse<T> {
  data: T;
  message: string;
}
