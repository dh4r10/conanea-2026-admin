import api from '@/lib/axios';
import type { Speaker } from '@/types/speaker.types';

export const speakerService = {
  getAll: () =>
    api.get<Speaker[]>('/activities/speaker/').then((res) => res.data),

  getById: (id: number) =>
    api.get<Speaker>(`/activities/speaker/${id}/`).then((res) => res.data),

  create: (
    payload: FormData, // 👈 FormData
  ) =>
    api
      .post<Speaker>('/activities/speaker/', payload, {
        headers: { 'Content-Type': 'multipart/form-data' }, // 👈
      })
      .then((res) => res.data),

  update: (
    id: number,
    payload: FormData, // 👈 FormData
  ) =>
    api
      .patch<Speaker>(`/activities/speaker/${id}/`, payload, {
        headers: { 'Content-Type': 'multipart/form-data' }, // 👈
      })
      .then((res) => res.data),

  remove: (id: number) =>
    api
      .patch<Speaker>(`/activities/speaker/${id}/`, { is_active: false })
      .then((res) => res.data),
};
