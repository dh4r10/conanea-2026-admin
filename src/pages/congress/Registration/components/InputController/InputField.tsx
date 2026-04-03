import React from 'react';
import Label from './Label';

const baseInput = [
  'w-full border border-gray-200 rounded-xl py-2.5 text-sm text-gray-900',
  'focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent',
  'placeholder:text-gray-300 bg-white transition-all',
].join(' ');

// ─────────────────────────────────────────────
// InputField (text, email, number, password…)
// ─────────────────────────────────────────────

interface InputFieldProps {
  label: string;
  name: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
  required?: boolean;
  icon?: React.ElementType;
  error?: string;
}

const InputField = ({
  label,
  name,
  value,
  onChange,
  placeholder,
  required = false,
  icon: Icon,
  error,
}: InputFieldProps) => (
  <div className='flex flex-col gap-1.5'>
    <Label label={label} required={required} />
    <div className='relative'>
      {Icon && (
        <Icon className='absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400' />
      )}
      <input
        type='text'
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className={[
          baseInput,
          Icon ? 'pl-9 pr-4' : 'px-4',
          error ? 'border-red-400 focus:ring-red-400' : '',
        ].join(' ')}
      />
    </div>
    {error && <p className='text-xs text-red-400'>{error}</p>}
  </div>
);

export default InputField;
