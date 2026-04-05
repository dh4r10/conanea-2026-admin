// SearchPanel.tsx — sin cambios, igual que antes
import { Input } from '@/components/ui/input';
import { Search } from 'lucide-react';

interface SearchPanelProps {
  search: string;
  setSearch: (search: string) => void;
  placeholder?: string;
}

const SearchPanel = ({ search, setSearch, placeholder }: SearchPanelProps) => {
  return (
    <div className='relative w-full sm:w-64'>
      <Search className='absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-500' />
      <Input
        placeholder={placeholder}
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className='pl-9 text-sm bg-[#111] border-white/10 text-slate-200 placeholder:text-slate-500 focus-visible:ring-[#fbba0e] focus-visible:ring-offset-0'
      />
    </div>
  );
};

export default SearchPanel;
