import { AlertCircle, CheckCircle, GraduationCap } from 'lucide-react';
import type { ParticipantType } from '../registration.types';

interface FeeCardProps {
  type: ParticipantType;
  label: string;
  amount: number;
  currency: string;
  selected: boolean;
  onSelect: (type: ParticipantType) => void;
}

const FeeCard = ({
  type,
  label,
  amount,
  currency,
  selected,
  onSelect,
}: FeeCardProps) => {
  return (
    <button
      onClick={() => onSelect(type)}
      className={[
        'relative flex flex-col items-start justify-between p-5 rounded-2xl border-2 text-left transition-all cursor-pointer',
        selected
          ? 'border-green-600 bg-green-50'
          : 'border-gray-200 hover:border-green-300',
      ].join(' ')}
    >
      {selected && (
        <div className='absolute top-3 right-3'>
          <CheckCircle className='w-4 h-4 text-green-600' />
        </div>
      )}

      <div>
        <div
          className={[
            'w-10 h-10 rounded-xl flex items-center justify-center mb-3',
            selected ? 'bg-green-100' : 'bg-gray-100',
          ].join(' ')}
        >
          <GraduationCap
            className={`w-5 h-5 ${selected ? 'text-green-700' : 'text-gray-400'}`}
          />
        </div>

        <p className='text-xl font-black text-green-600 mt-1'>
          {currency} {amount}
          <span className='text-xs text-gray-400 font-medium'>.00</span>
        </p>
        <p className='font-black text-sm text-gray-900'>{label}</p>
      </div>

      <p className='text-[10px] text-gray-400 mt-1 flex gap-1'>
        <AlertCircle className='w-3 h-3' /> Requiere ficha de matrícula
      </p>
    </button>
  );
};

export default FeeCard;
