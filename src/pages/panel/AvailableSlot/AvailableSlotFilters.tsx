import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { useEffect } from 'react';
import { usePreSaleStore } from '@/store/usePreSaleStore';
import { useQuotaTypeStore } from '@/store/useQuotaTypeStore';

interface AvailableSlotFiltersProps {
  selectedPreSaleId: number | undefined;
  selectedQuotaTypeId: number | undefined;
  onPreSaleChange: (id: number | undefined) => void;
  onQuotaTypeChange: (id: number | undefined) => void;
}

const AvailableSlotFilters = ({
  selectedPreSaleId,
  selectedQuotaTypeId,
  onPreSaleChange,
  onQuotaTypeChange,
}: AvailableSlotFiltersProps) => {
  const { preSales, fetchPreSales } = usePreSaleStore();
  const { quotaTypes, fetchQuotaTypes } = useQuotaTypeStore();

  useEffect(() => {
    fetchPreSales();
    fetchQuotaTypes();
  }, []);

  useEffect(() => {
    if (preSales.length > 0 && selectedPreSaleId === undefined) {
      onPreSaleChange(preSales[0].id);
    }
  }, [preSales]);

  return (
    <div className='flex flex-wrap gap-2'>
      <Select
        value={selectedPreSaleId?.toString()}
        onValueChange={(val) => onPreSaleChange(Number(val))}
      >
        <SelectTrigger className='w-44 bg-[#111] border-white/10 text-slate-200 focus:ring-[#fbba0e] focus:ring-offset-0 text-sm'>
          <SelectValue placeholder='Filtrar por preventa' />
        </SelectTrigger>
        <SelectContent className='bg-[#1a1a1a] border-white/10 text-slate-200'>
          {preSales.map((preSale) => (
            <SelectItem
              key={preSale.id}
              value={preSale.id.toString()}
              className='focus:bg-white/5 focus:text-slate-100'
            >
              {preSale.name}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      <Select
        value={selectedQuotaTypeId?.toString() ?? 'all'}
        onValueChange={(val) =>
          onQuotaTypeChange(val === 'all' ? undefined : Number(val))
        }
      >
        <SelectTrigger className='w-52 bg-[#111] border-white/10 text-slate-200 focus:ring-[#fbba0e] focus:ring-offset-0 text-sm'>
          <SelectValue placeholder='Filtrar por tipo de cuota' />
        </SelectTrigger>
        <SelectContent className='bg-[#1a1a1a] border-white/10 text-slate-200'>
          <SelectItem
            value='all'
            className='focus:bg-white/5 focus:text-slate-100'
          >
            Todos los tipos
          </SelectItem>
          {quotaTypes.map((type) => (
            <SelectItem
              key={type.id}
              value={type.id.toString()}
              className='focus:bg-white/5 focus:text-slate-100'
            >
              {type.name}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
};

export default AvailableSlotFilters;
