import type { Activity } from './components/ActivityCard/activityCard.types';

export interface Day {
  date: string;
  dayName: string;
  dayNum: string;
  month: string;
  theme: string;
  activities: Activity[];
}
