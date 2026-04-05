export interface JwtPayload {
  user_id: number;
  username: string;
  is_superuser: boolean;
  is_staff: boolean;
  exp: number;
  first_name?: string;
  paternal_surname?: string;
  email?: string;
}

export interface AuthTokens {
  access: string;
  refresh: string;
}
