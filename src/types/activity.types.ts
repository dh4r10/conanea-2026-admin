import type { Speaker } from './speaker.types';
import type { Day } from './day.types';
import type { ActivityType } from './activityType.types';

export type Activity = {
  id: number;
  activity_type: number;
  day: number;
  speaker: number;
  name: string;
  order: number;
  start_date: string;
  duration: number;
  location: string;
  capacity: number;
  is_active: boolean;
};

export type ActivityDetail = {
  id: number;
  activity_type: ActivityType;
  day: Day;
  speaker: Speaker;
  name: string;
  order: number;
  start_date: string;
  duration: number;
  location: string;
  capacity: number;
  is_active: boolean;
};
