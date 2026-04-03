import api from '@/lib/axios';
import type { Day } from '@/types/day.types';
import type { Activity } from '@/types/activity.types';

type DayPayload = Omit<Day, 'id' | 'is_active'>;

export const dayService = {
  getAll: () => api.get<Day[]>('/activities/day/').then((res) => res.data),

  getById: (id: number) =>
    api.get<Day>(`/activities/day/${id}/`).then((res) => res.data),

  create: (payload: DayPayload) =>
    api.post<Day>('/activities/day/', payload).then((res) => res.data),

  update: (id: number, payload: Partial<DayPayload>) =>
    api.put<Day>(`/activities/day/${id}/`, payload).then((res) => res.data),

  remove: (id: number) =>
    api
      .patch<Day>(`/activities/day/${id}/`, { is_active: false })
      .then((res) => res.data),

  getActivities: (id: number) =>
    api
      .get<Activity[]>(`/activities/day/${id}/activities/`)
      .then((res) => res.data),
};
