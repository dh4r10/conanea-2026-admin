import { useEffect, useState } from 'react';
import { Zap, Trash2 } from 'lucide-react';
import { useActivityStore } from '@/store/useActivityStore';
import type {
  ActivityDetail,
  Activity as ActivityType,
} from '@/types/activity.types';
import HeaderPanel from '../components/HeaderPanel';
import TablePanel from '../components/TablePanel';
import FooterPanel from '../components/FooterPanel';
import SearchPanel from '../components/SearchPanel';
import ActivityActionButtons from './ActivityActionButtons';
import ActivityFilters from './ActivityFilters';
import ActivityTableButtons from './ActivityTableButtons';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Toaster } from 'sonner';
import { toast } from 'sonner';
import LoadingControl from '@/components/LoadingControl';

type Row = Record<string, unknown>;

const Activity = () => {
  const { activities, loading, error, fetchActivities, removeActivity } =
    useActivityStore();
  const [search, setSearch] = useState('');

  // --- Filtros ---
  const [selectedDayId, setSelectedDayId] = useState<number | undefined>(
    undefined,
  );
  const [selectedActivityTypeId, setSelectedActivityTypeId] = useState<
    number | undefined
  >(undefined);

  const [selectedSpeakerId, setSelectedSpeakerId] = useState<
    number | undefined
  >(undefined);

  // --- Modal Eliminar ---
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [rowToDelete, setRowToDelete] = useState<Row | null>(null);
  const [deleting, setDeleting] = useState(false);

  // --- Modal Editar ---
  const [editOpen, setEditOpen] = useState(false);
  const [rowToEdit, setRowToEdit] = useState<ActivityDetail | null>(null);

  const columns = [
    { id: 1, label: 'Nombre', key: 'name' },
    {
      id: 2,
      label: 'Día',
      key: 'day',
      render: (value: unknown) => {
        const day = value as { title: string };
        return (
          <span className='text-slate-200 text-sm'>{day?.title ?? '—'}</span>
        );
      },
    },
    {
      id: 3,
      label: 'Inicio',
      key: 'start_date',
      render: (value: unknown) => {
        if (!value) return <span className='text-slate-500 text-xs'>—</span>;
        const time = (value as string).slice(0, 5);
        return <span className='text-slate-200 text-sm'>{time}</span>;
      },
    },
    {
      id: 4,
      label: 'Tipo',
      key: 'activity_type',
      render: (value: unknown) => {
        const type = value as { name: string };
        return (
          <span className='text-slate-200 text-sm'>{type?.name ?? '—'}</span>
        );
      },
    },
    {
      id: 5,
      label: 'Speaker',
      key: 'speaker',
      render: (value: unknown) => {
        const speaker = value as { name: string };
        return speaker ? (
          <div className='flex items-center gap-2'>
            <span className='text-slate-200 text-sm'>{speaker.name}</span>
          </div>
        ) : (
          <span className='text-slate-500 text-xs'>Sin speaker</span>
        );
      },
    },
    {
      id: 6,
      label: 'Duración',
      key: 'duration',
      render: (value: unknown) => {
        const minutes = value as number;
        const h = Math.floor(minutes / 60);
        const m = minutes % 60;
        const formatted =
          h > 0 ? `${h}h ${m > 0 ? `${m}min` : ''}`.trim() : `${m}min`;
        return <span className='text-slate-200 text-sm'>{formatted}</span>;
      },
    },
    { id: 7, label: 'Ubicación', key: 'location' },
    { id: 8, label: 'Capacidad', key: 'capacity' },
  ];

  // Re-fetch cuando cambian los filtros
  useEffect(() => {
    if (selectedDayId !== undefined) {
      fetchActivities({
        day_id: selectedDayId,
        activity_type_id: selectedActivityTypeId,
        speaker_id: selectedSpeakerId,
      });
    }
  }, [selectedDayId, selectedActivityTypeId, selectedSpeakerId]);

  const filtered = activities.filter((a) =>
    a.name.toLowerCase().includes(search.toLowerCase()),
  );

  // Handlers editar
  const handleEditRequest = (row: Row) => {
    const original = activities.find((a) => a.id === (row.id as number));
    if (original) {
      setRowToEdit(original);
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
      await removeActivity(rowToDelete.id as number);
      toast.success('Actividad eliminada correctamente.');
      setConfirmOpen(false);
      setRowToDelete(null);
    } catch {
      toast.error('Error al eliminar la actividad. Intenta nuevamente.');
    } finally {
      setDeleting(false);
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
        description='Gestión de Actividades'
        icon={<Zap className='h-5 w-5 text-black' />}
      />

      <div className='rounded-2xl border border-white/10 bg-[#1a1a1a] shadow-xl'>
        <div className='flex flex-col gap-3 border-b border-white/10 px-6 py-4 sm:flex-row sm:items-center sm:justify-between'>
          <div className='flex flex-wrap items-center gap-2'>
            <ActivityActionButtons
              rowToEdit={rowToEdit}
              editOpen={editOpen}
              onEditOpenChange={setEditOpen}
            />
            <ActivityFilters
              selectedDayId={selectedDayId}
              selectedActivityTypeId={selectedActivityTypeId}
              onDayChange={setSelectedDayId}
              onActivityTypeChange={setSelectedActivityTypeId}
              selectedSpeakerId={selectedSpeakerId}
              onSpeakerChange={setSelectedSpeakerId}
            />
          </div>
          <SearchPanel
            search={search}
            setSearch={setSearch}
            placeholder='Buscar actividades...'
          />
        </div>

        <TablePanel columns={columns} data={filtered}>
          {(row) => (
            <ActivityTableButtons
              row={row as ActivityType}
              onEdit={handleEditRequest}
              onDelete={handleDeleteRequest}
            />
          )}
        </TablePanel>

        <FooterPanel filtered={filtered.length} elements={activities.length} />
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
                Eliminar actividad
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

export default Activity;
