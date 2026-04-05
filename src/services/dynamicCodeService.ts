// services/dynamicCodeService.ts
import api from '@/lib/axios';
import type {
  DynamicCodeDetail,
  PaginatedResponse,
} from '@/types/dynamicCodes.types';

export const dynamicCodeService = {
  getAll: (page = 1, params?: { status?: string; quota_type_id?: number }) =>
    api
      .get<PaginatedResponse<DynamicCodeDetail>>('/register/dynamic-code/', {
        params: { page, ...params },
      })
      .then((res) => res.data),

  generate: () =>
    api
      .post<DynamicCodeDetail>('/register/dynamic-code/generate/')
      .then((res) => res.data),
};
