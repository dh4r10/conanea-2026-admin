import { Button } from '@/components/ui/button';
import { Eye, Pencil, Trash2 } from 'lucide-react';
import type { Day } from '@/types/day.types';

interface DaysTableButtonsProps {
  row: Day;
  onView?: (row: Day) => void;
  onEdit?: (row: Day) => void;
  onDelete?: (row: Day) => void;
}

const DaysTableButtons = ({
  row,
  onView,
  onEdit,
  onDelete,
}: DaysTableButtonsProps) => {
  return (
    <div className='flex items-center justify-end gap-1'>
      <Button
        size='sm'
        variant='ghost'
        className='h-8 gap-1.5 px-2.5 text-[#fbba0e] hover:bg-[#fbba0e]/10 hover:text-[#fbba0e] text-xs transition'
        onClick={() => onView?.(row)}
      >
        <Eye className='h-3.5 w-3.5' />
        Actividades
      </Button>
      <Button
        size='sm'
        variant='ghost'
        className='h-8 w-8 p-0 text-slate-400 hover:bg-white/5 hover:text-slate-200 transition'
        onClick={() => onEdit?.(row)}
      >
        <Pencil className='h-3.5 w-3.5' />
      </Button>
      <Button
        size='sm'
        variant='ghost'
        className='h-8 w-8 p-0 text-slate-400 hover:bg-red-500/10 hover:text-red-400 transition'
        onClick={() => onDelete?.(row)}
      >
        <Trash2 className='h-3.5 w-3.5' />
      </Button>
    </div>
  );
};

export default DaysTableButtons;
