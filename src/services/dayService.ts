import api from '@/lib/axios';
import type { Days } from '@/types/days.types';
import type { Activity } from '@/types/activities.types';

type DayPayload = Omit<Days, 'id' | 'is_active'>;

export const dayService = {
  getAll: () => api.get<Days[]>('/activities/day/').then((res) => res.data),

  getById: (id: number) =>
    api.get<Days>(`/activities/day/${id}/`).then((res) => res.data),

  create: (payload: DayPayload) =>
    api.post<Days>('/activities/day/', payload).then((res) => res.data),

  update: (id: number, payload: Partial<DayPayload>) =>
    api.put<Days>(`/activities/day/${id}/`, payload).then((res) => res.data),

  remove: (id: number) =>
    api
      .patch<Days>(`/activities/day/${id}/`, { is_active: false })
      .then((res) => res.data),

  getActivities: (id: number) =>
    api
      .get<Activity[]>(`/activities/day/${id}/activities/`)
      .then((res) => res.data),
};
