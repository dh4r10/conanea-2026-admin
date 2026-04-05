export type QuotaTypeForm = {
  name: string;
  currency: string;
};

export type FormErrors = Partial<Record<keyof QuotaTypeForm, string>>;

export const emptyForm: QuotaTypeForm = {
  name: '',
  currency: '',
};
