import React from 'react';
import FormInput from './FormInput';
import FormSelect from './FormSelect';
import FormFile from './FormFile';
import FormPhoto from './FormPhoto';

interface Option {
  label: string;
  value: string;
}

type BaseProps = {
  label?: string;
  error?: string;
};

type InputProps = BaseProps & {
  kind: 'input';
  id: string;
  label: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  type?: string;
  placeholder?: string;
  min?: number;
  max?: number;
  maxLength?: number;
};

type SelectProps = BaseProps & {
  kind: 'select';
  value: string;
  onValueChange: (value: string) => void;
  options: Option[];
  placeholder?: string;
};

type FileProps = BaseProps & {
  kind: 'file';
  value: File | null;
  onChange: (file: File | null) => void;
};

type PhotoProps = BaseProps & {
  kind: 'photo';
  id?: string;
  currentPhoto?: string;
  value: File | null;
  onChange: (file: File | null) => void;
};

type InputControllerProps = InputProps | SelectProps | FileProps | PhotoProps;

const InputController = ({ kind, ...props }: InputControllerProps) => {
  if (kind === 'select')
    return <FormSelect {...(props as Omit<SelectProps, 'kind'>)} />;
  if (kind === 'file')
    return <FormFile {...(props as Omit<FileProps, 'kind'>)} />;
  if (kind === 'photo')
    return <FormPhoto {...(props as Omit<PhotoProps, 'kind'>)} />;
  return <FormInput {...(props as Omit<InputProps, 'kind'>)} />;
};

export default InputController;
