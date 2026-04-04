import { useEffect, useState } from 'react';
import { Zap } from 'lucide-react';
import { useActivityStore } from '@/store/useActivityStore';
import type { ActivityDetail, Activities } from '@/types/activities.types';
import HeaderPanel from '../components/HeaderPanel';
import TablePanel from '../components/TablePanel';
import FooterPanel from '../components/FooterPanel';
import SearchPanel from '../components/SearchPanel';
import ActivityActionButtons from './ActivityActionButtons';
import ActivityFilters from './ActivityFilters';
import ActivityTableButtons from './ActivityTableButtons';

import LoadingControl from '@/components/LoadingControl';
import ModalDelete from '../components/modals/ModalDelete';

import { Toaster } from 'sonner';
import { toast } from 'sonner';

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
              row={row as Activities}
              onEdit={handleEditRequest}
              onDelete={handleDeleteRequest}
            />
          )}
        </TablePanel>

        <FooterPanel filtered={filtered.length} elements={activities.length} />
      </div>

      {/* Modal Eliminar */}
      <ModalDelete
        open={confirmOpen}
        onClose={handleDeleteCancel}
        onConfirm={handleDeleteConfirm}
        loading={deleting}
        title='Eliminar actividad'
        description={rowToDelete?.name as string}
      />

      <Toaster position='bottom-right' richColors theme='dark' />
    </>
  );
};

export default Activity;
