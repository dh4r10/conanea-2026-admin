import { Button } from '@/components/ui/button';

interface FooterPanelProps {
  filtered: number;
  elements: number;
}

const FooterPanel = ({ filtered, elements }: FooterPanelProps) => {
  return (
    <div className='flex items-center justify-between border-t border-white/10 px-6 py-3'>
      <span className='text-xs text-slate-500'>
        Mostrando {filtered} de {elements} elementos
      </span>
      <div className='flex gap-1'>
        <Button
          size='sm'
          variant='outline'
          className='h-7 px-2.5 text-xs border-white/10 bg-transparent text-slate-400 hover:bg-white/5'
          disabled
        >
          Anterior
        </Button>
        <Button
          size='sm'
          variant='outline'
          className='h-7 px-2.5 text-xs border-white/10 bg-transparent text-slate-400 hover:bg-white/5'
          disabled
        >
          Siguiente
        </Button>
      </div>
    </div>
  );
};

export default FooterPanel;
