export type SpeakerForm = {
  name: string;
  title: string;
  bio: string;
  photo: File | null;
};

export type FormErrors = Partial<Record<keyof SpeakerForm, string>>;

export const emptyForm: SpeakerForm = {
  name: '',
  title: '',
  bio: '',
  photo: null,
};
