// services/quotaTypeService.ts
import api from '@/lib/axios';
import type { QuotaTypes } from '@/types/quotaTypes.types';

type QuotaTypePayload = Omit<QuotaTypes, 'id' | 'is_active'>;

export const quotaTypeService = {
  getAll: () =>
    api.get<QuotaTypes[]>('/register/quota-type/').then((res) => res.data),

  getById: (id: number) =>
    api.get<QuotaTypes>(`/register/quota-type/${id}/`).then((res) => res.data),

  create: (payload: QuotaTypePayload) =>
    api
      .post<QuotaTypes>('/register/quota-type/', payload)
      .then((res) => res.data),

  update: (id: number, payload: Partial<QuotaTypePayload>) =>
    api
      .put<QuotaTypes>(`/register/quota-type/${id}/`, payload)
      .then((res) => res.data),

  remove: (id: number) =>
    api
      .patch<QuotaTypes>(`/register/quota-type/${id}/`, { is_active: false })
      .then((res) => res.data),
};
