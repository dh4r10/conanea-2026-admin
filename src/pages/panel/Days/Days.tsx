import { useEffect, useState } from 'react';
import { CalendarDays, Trash2 } from 'lucide-react';
import { useDayStore } from '@/store/useDayStore';
import type { Day } from '@/types/day.types';
import HeaderPanel from '../components/HeaderPanel';
import TablePanel from '../components/TablePanel';
import FooterPanel from '../components/FooterPanel';
import SearchPanel from '../components/SearchPanel';
import DaysActionButtons from './DaysActionButtons';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';

import { Toaster } from 'sonner'; // 👈 agregar
import { toast } from 'sonner';
import LoadingControl from '@/components/LoadingControl';
import DaysTableButtons from './DaysTableButtons';

type Row = Record<string, unknown>;

const Days = () => {
  const { days, loading, error, fetchDays, removeDay } = useDayStore();
  const [search, setSearch] = useState('');

  // --- Modal Eliminar ---
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [rowToDelete, setRowToDelete] = useState<Row | null>(null);
  const [deleting, setDeleting] = useState(false);

  // --- Modal Editar (el padre controla qué fila se edita) ---
  const [editOpen, setEditOpen] = useState(false);
  const [rowToEdit, setRowToEdit] = useState<Day | null>(null);

  const columns = [
    { id: 1, label: 'Título', key: 'title' },
    { id: 2, label: 'Fecha', key: 'date' },
  ];

  useEffect(() => {
    fetchDays();
  }, []);

  const filtered = days.filter(
    (d) =>
      d.title.toLowerCase().includes(search.toLowerCase()) ||
      d.date.includes(search),
  );

  const formatDate = (dateString: string) => {
    const [year, month, day] = dateString.split('T')[0].split('-').map(Number);
    const date = new Date(year, month - 1, day); // 👈 constructor local, sin UTC

    return new Intl.DateTimeFormat('es-PE', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
    }).format(date);
  };

  const formattedData = filtered.map((d) => ({
    ...d,
    date: formatDate(d.date),
  }));

  // Abre el modal de editar con la fila seleccionada
  const handleEditRequest = (row: Row) => {
    const original = days.find((d) => d.id === (row.id as number));
    if (original) {
      setRowToEdit(original); // usa los datos originales (no formateados)
      setEditOpen(true);
    }
  };

  // Handlers eliminar
  const handleDeleteRequest = (row: Row) => {
    setRowToDelete(row);
    setConfirmOpen(true);
  };

  const handleDeleteConfirm = async () => {
    if (!rowToDelete) return;
    setDeleting(true);
    try {
      await removeDay(rowToDelete.id as number);
      toast.success('Día eliminado correctamente.');
      setConfirmOpen(false);
      setRowToDelete(null);
    } catch {
      toast.error('Error al eliminar el día. Intenta nuevamente.');
    } finally {
      setDeleting(false); // 👈 siempre se ejecuta, salga bien o mal
    }
  };

  const handleDeleteCancel = () => {
    setConfirmOpen(false);
    setRowToDelete(null);
  };

  if (loading) return <LoadingControl />;
  if (error) return <p className='text-red-400 p-8'>{error}</p>;

  return (
    <>
      <HeaderPanel
        title='Panel de Control'
        description='Gestión de Días'
        icon={<CalendarDays className='h-5 w-5 text-black' />}
      />

      <div className='rounded-2xl border border-white/10 bg-[#1a1a1a] shadow-xl'>
        <div className='flex flex-col gap-3 border-b border-white/10 px-6 py-4 sm:flex-row sm:items-center sm:justify-between'>
          <DaysActionButtons
            rowToEdit={rowToEdit}
            editOpen={editOpen}
            onEditOpenChange={setEditOpen}
          />
          <SearchPanel
            search={search}
            setSearch={setSearch}
            placeholder='Buscar días...'
          />
        </div>

        <TablePanel columns={columns} data={formattedData}>
          {(row) => (
            <DaysTableButtons
              row={row as Day}
              onEdit={handleEditRequest}
              onDelete={handleDeleteRequest}
            />
          )}
        </TablePanel>

        <FooterPanel filtered={filtered.length} elements={days.length} />
      </div>

      {/* Modal Eliminar */}
      <Dialog open={confirmOpen} onOpenChange={handleDeleteCancel}>
        <DialogContent className='bg-[#1a1a1a] border border-white/10 text-slate-200 sm:max-w-sm'>
          <DialogHeader>
            <div className='flex items-center gap-3 mb-1'>
              <div className='flex h-9 w-9 items-center justify-center rounded-lg bg-red-500/10 border border-red-500/20'>
                <Trash2 className='h-4 w-4 text-red-400' />
              </div>
              <DialogTitle className='text-slate-100 text-lg font-semibold'>
                Eliminar día
              </DialogTitle>
            </div>
            <p className='text-sm text-slate-400 pl-12'>
              ¿Estás seguro que deseas eliminar{' '}
              <span className='text-slate-200 font-medium'>
                {rowToDelete?.title as string}
              </span>
              ? Esta acción no se puede deshacer.
            </p>
          </DialogHeader>
          <DialogFooter className='gap-2 pt-2'>
            <Button
              variant='outline'
              size='sm'
              className='border-white/10 bg-transparent text-slate-400 hover:bg-white/5 hover:text-white transition'
              onClick={handleDeleteCancel}
              disabled={deleting}
            >
              Cancelar
            </Button>
            <Button
              size='sm'
              className='bg-red-500 text-white font-semibold hover:bg-red-600 transition min-w-24'
              onClick={handleDeleteConfirm}
              disabled={deleting}
            >
              {deleting ? 'Eliminando...' : 'Sí, eliminar'}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Toaster position='bottom-right' richColors theme='dark' />
    </>
  );
};

export default Days;
