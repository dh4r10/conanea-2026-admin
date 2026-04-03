export type ActivityType =
  | 'ponencia'
  | 'laboratorio'
  | 'feria'
  | 'ceremonia'
  | 'cultural';

export interface Activity {
  time: string;
  duration: string;
  title: string;
  speaker?: string;
  location: string;
  type: ActivityType;
  capacity?: number;
  description?: string;
}
