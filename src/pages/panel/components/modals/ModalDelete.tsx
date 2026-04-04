import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Trash2 } from 'lucide-react';

interface ModalDeleteProps {
  open: boolean;
  onClose: () => void;
  onConfirm: () => void;
  loading?: boolean;
  title?: string;
  description?: string;
}

const ModalDelete = ({
  open,
  onClose,
  onConfirm,
  loading = false,
  title = 'Eliminar',
  description,
}: ModalDeleteProps) => {
  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className='bg-[#1a1a1a] border border-white/10 text-slate-200 sm:max-w-sm'>
        <DialogHeader>
          <div className='flex items-center gap-3 mb-1'>
            <div className='flex h-9 w-9 items-center justify-center rounded-lg bg-red-500/10 border border-red-500/20'>
              <Trash2 className='h-4 w-4 text-red-400' />
            </div>
            <DialogTitle className='text-slate-100 text-lg font-semibold'>
              {title}
            </DialogTitle>
          </div>
          <p className='text-sm text-slate-400 pl-12'>
            ¿Estás seguro que deseas eliminar{' '}
            <span className='text-slate-200 font-semibold'>{description}</span>?
            Esta acción no se puede deshacer.
          </p>
        </DialogHeader>

        <DialogFooter className='gap-2 pt-2'>
          <Button
            variant='outline'
            size='sm'
            className='border-white/10 bg-transparent text-slate-400 hover:bg-white/5 hover:text-white transition'
            onClick={onClose}
            disabled={loading}
          >
            Cancelar
          </Button>

          <Button
            size='sm'
            className='bg-red-500 text-white font-semibold hover:bg-red-600 transition min-w-24'
            onClick={onConfirm}
            disabled={loading}
          >
            {loading ? 'Eliminando...' : 'Sí, eliminar'}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default ModalDelete;
