import InputField from './InputField';
import InputDate from './InputDate';
import InputSelect from './InputSelect';
import InputSelectWithSearch from './InputSelectWithSearch';
import InputDescriptionCheck from './InputDescriptionCheck';

type SelectOption = {
  value: string | number;
  label: string;
};

type InputType =
  | 'text'
  | 'date'
  | 'select'
  | 'select-search'
  | 'description-check';

interface InputControllerProps {
  inputType: InputType;

  // Comunes
  label: string;
  name: string;
  required?: boolean;
  error?: string;

  // InputField
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
  type?: string;
  icon?: React.ElementType;

  // InputDate
  onChangeDate?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  min?: string;
  max?: string;

  // InputSelect
  selectValue?: string | number;
  onChangeSelect?: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  options?: SelectOption[];

  // InputSelectWithSearch
  onChangeSearch?: (value: string | number) => void;

  // InputDescriptionCheck
  descriptionValue?: string;
  onChangeDescription?: (value: string) => void;
  checkLabel?: string;
}

const InputController = (props: InputControllerProps) => {
  const { inputType } = props;

  if (inputType === 'text') {
    return (
      <InputField
        label={props.label}
        name={props.name}
        value={props.value ?? ''}
        onChange={props.onChange!}
        placeholder={props.placeholder}
        required={props.required}
        icon={props.icon}
        error={props.error}
      />
    );
  }

  if (inputType === 'date') {
    return (
      <InputDate
        label={props.label}
        name={props.name}
        value={props.value ?? ''}
        onChange={props.onChangeDate ?? props.onChange!}
        required={props.required}
        min={props.min}
        max={props.max}
        error={props.error}
      />
    );
  }

  if (inputType === 'select') {
    return (
      <InputSelect
        label={props.label}
        name={props.name}
        value={props.selectValue ?? ''}
        onChange={props.onChangeSelect!}
        options={props.options ?? []}
        placeholder={props.placeholder}
        required={props.required}
        error={props.error}
      />
    );
  }

  if (inputType === 'select-search') {
    return (
      <InputSelectWithSearch
        label={props.label}
        value={props.selectValue ?? ''}
        onChange={props.onChangeSearch!}
        options={props.options ?? []}
        placeholder={props.placeholder}
        required={props.required}
        error={props.error}
        _name=''
      />
    );
  }

  if (inputType === 'description-check') {
    return (
      <InputDescriptionCheck
        label={props.label}
        name={props.name}
        value={props.descriptionValue ?? '-'}
        onChange={props.onChangeDescription!}
        checkLabel={props.checkLabel}
        placeholder={props.placeholder}
        required={props.required}
        error={props.error}
      />
    );
  }

  return null;
};

export default InputController;
