export type ActivityTypeForm = {
  name: string;
  logo: string;
};

export type FormErrors = Partial<Record<keyof ActivityTypeForm, string>>;
