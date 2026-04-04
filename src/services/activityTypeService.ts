import api from '@/lib/axios';
import type { ActivityTypes } from '@/types/activityTypes.types';

type ActivityTypePayload = Omit<ActivityTypes, 'id' | 'is_active'>;

export const activityTypeService = {
  getAll: () =>
    api
      .get<ActivityTypes[]>('/activities/activity-type/')
      .then((res) => res.data),

  getById: (id: number) =>
    api
      .get<ActivityTypes>(`/activities/activity-type/${id}/`)
      .then((res) => res.data),

  create: (payload: ActivityTypePayload) =>
    api
      .post<ActivityTypes>('/activities/activity-type/', payload)
      .then((res) => res.data),

  update: (id: number, payload: Partial<ActivityTypePayload>) =>
    api
      .put<ActivityTypes>(`/activities/activity-type/${id}/`, payload)
      .then((res) => res.data),

  remove: (id: number) =>
    api
      .patch<ActivityTypes>(`/activities/activity-type/${id}/`, {
        is_active: false,
      })
      .then((res) => res.data),
};
