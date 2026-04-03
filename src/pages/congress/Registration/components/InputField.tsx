interface InputFieldProps {
  label: string;
  name: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
  type?: string;
  required?: boolean;
  icon?: React.ElementType;
}

const InputField = ({
  label,
  name,
  value,
  onChange,
  placeholder,
  type = 'text',
  required = false,
  icon: Icon,
}: InputFieldProps) => {
  return (
    <div className='flex flex-col gap-1.5'>
      <label className='text-xs font-bold text-gray-600 uppercase tracking-wider'>
        {label}
        {required && <span className='text-red-400 ml-1'>*</span>}
      </label>
      <div className='relative'>
        {Icon && (
          <Icon className='absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400' />
        )}
        <input
          type={type}
          name={name}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          className={[
            'w-full border border-gray-200 rounded-xl py-2.5 text-sm text-gray-900',
            'focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent',
            'placeholder:text-gray-300 bg-white transition-all',
            Icon ? 'pl-9 pr-4' : 'px-4',
          ].join(' ')}
        />
      </div>
    </div>
  );
};

export default InputField;
