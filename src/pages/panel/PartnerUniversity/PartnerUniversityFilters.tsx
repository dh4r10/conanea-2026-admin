import { useEffect } from 'react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { useQuotaTypeStore } from '@/store/useQuotaTypeStore';

interface PartnerUniversityFiltersProps {
  selectedQuotaTypeId: number | undefined;
  onQuotaTypeChange: (id: number | undefined) => void;
}

const PartnerUniversityFilters = ({
  selectedQuotaTypeId,
  onQuotaTypeChange,
}: PartnerUniversityFiltersProps) => {
  const { quotaTypes, fetchQuotaTypes } = useQuotaTypeStore();

  useEffect(() => {
    fetchQuotaTypes();
  }, []);

  useEffect(() => {
    if (quotaTypes.length > 0 && selectedQuotaTypeId === undefined) {
      onQuotaTypeChange(quotaTypes[0].id);
    }
  }, [quotaTypes]);

  return (
    <div className='flex flex-wrap gap-2'>
      <Select
        value={selectedQuotaTypeId?.toString()}
        onValueChange={(val) => onQuotaTypeChange(Number(val))}
      >
        <SelectTrigger className='w-44 bg-[#111] border-white/10 text-slate-200 focus:ring-[#fbba0e] focus:ring-offset-0 text-sm'>
          <SelectValue placeholder='Filtrar por tipo de cuota' />
        </SelectTrigger>
        <SelectContent className='bg-[#1a1a1a] border-white/10 text-slate-200'>
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

export default PartnerUniversityFilters;
