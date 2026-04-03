import api from '@/lib/axios';
import type { ActivityType } from '@/types/activityType.types';

type ActivityTypePayload = Omit<ActivityType, 'id' | 'is_active'>;

export const activityTypeService = {
  getAll: () =>
    api
      .get<ActivityType[]>('/activities/activity-type/')
      .then((res) => res.data),

  getById: (id: number) =>
    api
      .get<ActivityType>(`/activities/activity-type/${id}/`)
      .then((res) => res.data),

  create: (payload: ActivityTypePayload) =>
    api
      .post<ActivityType>('/activities/activity-type/', payload)
      .then((res) => res.data),

  update: (id: number, payload: Partial<ActivityTypePayload>) =>
    api
      .put<ActivityType>(`/activities/activity-type/${id}/`, payload)
      .then((res) => res.data),

  remove: (id: number) =>
    api
      .patch<ActivityType>(`/activities/activity-type/${id}/`, {
        is_active: false,
      })
      .then((res) => res.data),
};
