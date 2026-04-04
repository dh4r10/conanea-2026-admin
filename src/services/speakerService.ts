import api from '@/lib/axios';
import type { Speakers } from '@/types/speakers.types';

export const speakerService = {
  getAll: () =>
    api.get<Speakers[]>('/activities/speaker/').then((res) => res.data),

  getById: (id: number) =>
    api.get<Speakers>(`/activities/speaker/${id}/`).then((res) => res.data),

  create: (
    payload: FormData, // 👈 FormData
  ) =>
    api
      .post<Speakers>('/activities/speaker/', payload, {
        headers: { 'Content-Type': 'multipart/form-data' }, // 👈
      })
      .then((res) => res.data),

  update: (
    id: number,
    payload: FormData, // 👈 FormData
  ) =>
    api
      .patch<Speakers>(`/activities/speaker/${id}/`, payload, {
        headers: { 'Content-Type': 'multipart/form-data' }, // 👈
      })
      .then((res) => res.data),

  remove: (id: number) =>
    api
      .patch<Speakers>(`/activities/speaker/${id}/`, { is_active: false })
      .then((res) => res.data),
};
