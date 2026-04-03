import { useEffect, useState } from 'react';
import { Brackets, Trash2 } from 'lucide-react';
import { useActivityTypeStore } from '@/store/useActivityTypeStore';
import type { ActivityType } from '@/types/activityType.types';
import HeaderPanel from '../components/HeaderPanel';
import TablePanel from '../components/TablePanel';
import FooterPanel from '../components/FooterPanel';
import SearchPanel from '../components/SearchPanel';
import ActivityTypeActionButtons from './ActivityTypeActionButtons';
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
import ActivityTypeTableButtons from './ActivityTypeTableButtons';

type Row = Record<string, unknown>;

const Days = () => {
  const {
    activityTypes,
    loading,
    error,
    fetchActivityTypes,
    removeActivityType,
  } = useActivityTypeStore();
  const [search, setSearch] = useState('');

  // --- Modal Eliminar ---
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [rowToDelete, setRowToDelete] = useState<Row | null>(null);
  const [deleting, setDeleting] = useState(false);

  // --- Modal Editar (el padre controla qué fila se edita) ---
  const [editOpen, setEditOpen] = useState(false);
  const [rowToEdit, setRowToEdit] = useState<ActivityType | null>(null);

  const columns = [
    { id: 1, label: 'Nombre', key: 'name' },
    { id: 2, label: 'Logo', key: 'logo' },
  ];

  useEffect(() => {
    fetchActivityTypes();
  }, []);

  const filtered = activityTypes.filter((d) =>
    d.name.toLowerCase().includes(search.toLowerCase()),
  );

  // Abre el modal de editar con la fila seleccionada
  const handleEditRequest = (row: Row) => {
    const original = activityTypes.find((d) => d.id === (row.id as number));
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
      await removeActivityType(rowToDelete.id as number);
      toast.success('Tipo de actividad eliminada correctamente.');
      setConfirmOpen(false);
      setRowToDelete(null);
    } catch {
      toast.error(
        'Error al eliminar el tipo de actividad. Intenta nuevamente.',
      );
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
        description='Gestión de Tipos de Actividades'
        icon={<Brackets className='h-5 w-5 text-black' />}
      />

      <div className='rounded-2xl border border-white/10 bg-[#1a1a1a] shadow-xl'>
        <div className='flex flex-col gap-3 border-b border-white/10 px-6 py-4 sm:flex-row sm:items-center sm:justify-between'>
          <ActivityTypeActionButtons
            rowToEdit={rowToEdit}
            editOpen={editOpen}
            onEditOpenChange={setEditOpen}
          />
          <SearchPanel
            search={search}
            setSearch={setSearch}
            placeholder='Buscar tipos de actividades...'
          />
        </div>

        <TablePanel columns={columns} data={filtered}>
          {(row) => (
            <ActivityTypeTableButtons
              row={row as ActivityType}
              onEdit={handleEditRequest}
              onDelete={handleDeleteRequest}
            />
          )}
        </TablePanel>

        <FooterPanel
          filtered={filtered.length}
          elements={activityTypes.length}
        />
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
                Eliminar tipo de actividad
              </DialogTitle>
            </div>
            <p className='text-sm text-slate-400 pl-12'>
              ¿Estás seguro que deseas eliminar{' '}
              <span className='text-slate-200 font-medium'>
                {rowToDelete?.name as string}
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
