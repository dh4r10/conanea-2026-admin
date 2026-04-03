import React from 'react';
import Label from './Label';

const baseInput = [
  'w-full border border-gray-200 rounded-xl py-2.5 text-sm text-gray-900',
  'focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent',
  'placeholder:text-gray-300 bg-white transition-all',
].join(' ');

interface InputDateProps {
  label: string;
  name: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  required?: boolean;
  min?: string;
  max?: string;
  error?: string;
}

const InputDate = ({
  label,
  name,
  value,
  onChange,
  required = false,
  min,
  max,
  error,
}: InputDateProps) => (
  <div className='flex flex-col gap-1.5'>
    <Label label={label} required={required} />
    <input
      type='date'
      name={name}
      value={value}
      onChange={onChange}
      min={min}
      max={max}
      className={[
        baseInput,
        'px-4',
        error ? 'border-red-400 focus:ring-red-400' : '',
      ].join(' ')}
    />
    {error && <p className='text-xs text-red-400'>{error}</p>}
  </div>
);

export default InputDate;
