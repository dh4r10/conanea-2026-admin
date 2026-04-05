export type PreSaleForm = {
  name: string;
  start_date: string;
  end_date: string;
};

export type FormErrors = Partial<Record<keyof PreSaleForm, string>>;

export const emptyForm: PreSaleForm = {
  name: '',
  start_date: '',
  end_date: '',
};
