import { useState, useRef, useEffect } from 'react';
import Label from './Label';

const baseInput = [
  'w-full border border-gray-200 rounded-xl py-2.5 text-sm text-gray-900',
  'focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent',
  'placeholder:text-gray-300 bg-white transition-all',
].join(' ');

interface SelectOption {
  value: string | number;
  label: string;
}

interface InputSelectWithSearchProps {
  label: string;
  _name: string;
  value: string | number;
  onChange: (value: string | number) => void;
  options: SelectOption[];
  placeholder?: string;
  required?: boolean;
  error?: string;
}

const INITIAL_LIMIT = 10;

const InputSelectWithSearch = ({
  label,
  _name,
  value,
  onChange,
  options,
  placeholder = 'Buscar…',
  required = false,
  error,
}: InputSelectWithSearchProps) => {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState('');
  const containerRef = useRef<HTMLDivElement>(null);

  console.log(_name);

  const selected = options.find((o) => o.value === value);

  const filtered = (
    query
      ? options.filter((o) =>
          o.label.toLowerCase().includes(query.toLowerCase()),
        )
      : options
  ).slice(0, INITIAL_LIMIT);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(e.target as Node)
      ) {
        setOpen(false);
        setQuery('');
      }
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  return (
    <div className='flex flex-col gap-1.5' ref={containerRef}>
      <Label label={label} required={required} />
      <div className='relative'>
        {/* Trigger */}
        <button
          type='button'
          onClick={() => setOpen((p) => !p)}
          className={[
            baseInput,
            'px-4 pr-9 text-left flex items-center',
            !selected ? 'text-gray-300' : 'text-gray-900',
            error ? 'border-red-400 focus:ring-red-400' : '',
          ].join(' ')}
        >
          {selected ? selected.label : placeholder}
        </button>
        <svg
          className='pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400'
          fill='none'
          viewBox='0 0 24 24'
          stroke='currentColor'
          strokeWidth={2}
        >
          <path
            strokeLinecap='round'
            strokeLinejoin='round'
            d='M19 9l-7 7-7-7'
          />
        </svg>

        {/* Dropdown */}
        {open && (
          <div className='absolute z-50 mt-1 w-full bg-white border border-gray-200 rounded-xl shadow-lg overflow-hidden'>
            {/* Search box */}
            <div className='p-2 border-b border-gray-100'>
              <input
                autoFocus
                type='text'
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder='Buscar…'
                className='w-full px-3 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent'
              />
            </div>

            {/* Options list */}
            <ul className='max-h-52 overflow-y-auto py-1'>
              {filtered.length === 0 ? (
                <li className='px-4 py-2.5 text-sm text-gray-400'>
                  Sin resultados
                </li>
              ) : (
                filtered.map((opt) => (
                  <li
                    key={opt.value}
                    onClick={() => {
                      onChange(opt.value);
                      setOpen(false);
                      setQuery('');
                    }}
                    className={[
                      'px-4 py-2.5 text-sm cursor-pointer transition-colors',
                      opt.value === value
                        ? 'bg-green-50 text-green-700 font-semibold'
                        : 'text-gray-700 hover:bg-gray-50',
                    ].join(' ')}
                  >
                    {opt.label}
                  </li>
                ))
              )}
            </ul>
          </div>
        )}
      </div>
      {error && <p className='text-xs text-red-400'>{error}</p>}
    </div>
  );
};

export default InputSelectWithSearch;
