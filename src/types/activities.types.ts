import type { Speakers } from './speakers.types';
import type { Days } from './days.types';
import type { ActivityTypes } from './activityTypes.types';

export type Activities = {
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
  activity_type: ActivityTypes;
  day: Days;
  speaker: Speakers;
  name: string;
  order: number;
  start_date: string;
  duration: number;
  location: string;
  capacity: number;
  is_active: boolean;
};
