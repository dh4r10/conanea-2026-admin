import api from '@/lib/axios';
import type { Activities, ActivityDetail } from '@/types/activities.types';

// activityService.ts
type ActivityPayload = Omit<Activities, 'id' | 'is_active'>;

export const activityService = {
  getAll: (params?: {
    day_id?: number;
    activity_type_id?: number;
    speaker_id?: number;
  }) =>
    api
      .get<ActivityDetail[]>('/activities/activity/', { params })
      .then((res) => res.data),

  getById: (id: number) =>
    api
      .get<ActivityDetail>(`/activities/activity/${id}/`)
      .then((res) => res.data),

  create: (payload: ActivityPayload) =>
    api
      .post<Activities>('/activities/activity/', payload)
      .then((res) => res.data),

  update: (id: number, payload: Partial<ActivityPayload>) =>
    api
      .patch<Activities>(`/activities/activity/${id}/`, payload)
      .then((res) => res.data),

  remove: (id: number) =>
    api
      .patch<Activities>(`/activities/activity/${id}/`, {
        is_active: false,
      })
      .then((res) => res.data),
};
