// types/partnerUniversity.types.ts
import type { QuotaTypes } from './quotaTypes.types';

export type PartnerUniversities = {
  id: number;
  quota_type: number;
  name: string;
  abbreviation: string;
  place: string;
  country: string;
  region: string;
  is_active: boolean;
};

export type PartnerUniversityDetail = {
  id: number;
  quota_type: QuotaTypes;
  quota_type_id: number;
  name: string;
  abbreviation: string;
  place: string;
  country: string;
  region: string;
  is_active: boolean;
};

export type PaginatedResponse<T> = {
  count: number;
  next: string | null;
  previous: string | null;
  results: T[];
};
