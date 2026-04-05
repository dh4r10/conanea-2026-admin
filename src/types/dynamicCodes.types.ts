// types/dynamicCode.types.ts
import type { QuotaTypes } from './quotaTypes.types';

export type DynamicCodes = {
  id: number;
  quota_type_id: number;
  code: string;
  status: string;
  used_at: string;
  is_active: boolean;
  created_at: string;
};

export type DynamicCodeDetail = {
  id: number;
  quota_type: QuotaTypes;
  quota_type_id: number;
  code: string;
  status: string;
  used_at: string;
  is_active: boolean;
  created_at: string;
};

export type PaginatedResponse<T> = {
  count: number;
  next: string | null;
  previous: string | null;
  results: T[];
};
