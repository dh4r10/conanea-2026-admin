import { CheckCircle } from 'lucide-react';

interface StepItemProps {
  label: string;
  index: number;
  current: number;
  total: number;
}

const StepItem = ({ label, index, current, total }: StepItemProps) => {
  const isDone = index < current;
  const isActive = index === current;
  const isLast = index === total - 1;

  return (
    <div className='flex items-center flex-1'>
      <div className='flex flex-col items-center'>
        <div
          className={[
            'w-8 h-8 rounded-full flex items-center justify-center text-xs font-black transition-all',
            isDone
              ? 'bg-green-600 text-white'
              : isActive
                ? 'bg-[#fbba0e] text-black'
                : 'bg-gray-200 text-gray-400',
          ].join(' ')}
        >
          {isDone ? <CheckCircle className='w-4 h-4' /> : index + 1}
        </div>
        <span
          className={`text-[10px] font-bold mt-1 ${isActive ? 'text-gray-900' : 'text-gray-400'}`}
        >
          {label}
        </span>
      </div>

      {!isLast && (
        <div
          className={`flex-1 h-px mx-2 mb-4 transition-all ${isDone ? 'bg-green-600' : 'bg-gray-200'}`}
        />
      )}
    </div>
  );
};

export default StepItem;
