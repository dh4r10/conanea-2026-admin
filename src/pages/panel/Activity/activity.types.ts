export type ActivityForm = {
  name: string;
  order: string;
  start_date: string;
  duration: string;
  location: string;
  capacity: string;
  day: string;
  activity_type: string;
  speaker: string;
};

export type FormErrors = Partial<Record<keyof ActivityForm, string>>;
