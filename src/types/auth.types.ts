export interface JwtPayload {
  user_id: number;
  username: string;
  is_superuser: boolean;
  is_staff: boolean;
  exp: number;
}

export interface AuthTokens {
  access: string;
  refresh: string;
}
