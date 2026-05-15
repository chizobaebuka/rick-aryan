export interface ApiEnvelope<T> {
  success: boolean;
  message: string;
  data: T;
}

export interface UserPublic {
  id: string;
  email: string;
  role: string;
  fullName: string;
  avatarUrl?: string | null;
}

export interface LoginResponse {
  token: string;
  user: UserPublic;
}
