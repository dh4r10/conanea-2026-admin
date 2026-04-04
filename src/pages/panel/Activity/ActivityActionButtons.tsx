import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogClose,
} from '@/components/ui/dialog';
import { Plus, Activity, Pencil } from 'lucide-react';
import { useActivityStore } from '@/store/useActivityStore';
import { useDayStore } from '@/store/useDayStore';
import { useActivityTypeStore } from '@/store/useActivityTypeStore';
import { useSpeakerStore } from '@/store/useSpeakerStore';
import type { ActivityDetail, Activities } from '@/types/activities.types';
import { toast } from 'sonner';
import type { ActivityForm, FormErrors } from './activity.types';
import ActivityFormFields from './ActivityFormFields';

// --- Empty form ---
const emptyForm: ActivityForm = {
  name: '',
  order: '1',
  start_date: '',
  duration: '',
  location: '',
  capacity: '0',
  day: '',
  activity_type: '',
  speaker: '',
};

// --- Props ---
interface ActivityActionButtonsProps {
  rowToEdit?: ActivityDetail | null;
  editOpen?: boolean;
  onEditOpenChange?: (val: boolean) => void;
}

const ActivityActionButtons = ({
  rowToEdit = null,
  editOpen = false,
  onEditOpenChange,
}: ActivityActionButtonsProps) => {
  const { createActivity, updateActivity } = useActivityStore();
  const { fetchDays } = useDayStore();
  const { fetchActivityTypes } = useActivityTypeStore();
  const { speakers, fetchSpeakers } = useSpeakerStore(); // 👈

  // Modal Crear
  const [createOpen, setCreateOpen] = useState(false);
  const [createForm, setCreateForm] = useState<ActivityForm>(emptyForm);
  const [createErrors, setCreateErrors] = useState<FormErrors>({});
  const [createLoading, setCreateLoading] = useState(false);

  // Modal Editar
  const [editForm, setEditForm] = useState<ActivityForm>(emptyForm);
  const [editErrors, setEditErrors] = useState<FormErrors>({});
  const [editLoading, setEditLoading] = useState(false);

  useEffect(() => {
    fetchDays();
    fetchActivityTypes();
    fetchSpeakers(); // 👈
  }, []);

  // Precarga el formulario de editar
  useEffect(() => {
    if (editOpen && rowToEdit) {
      setEditForm({
        name: rowToEdit.name,
        order: rowToEdit.order.toString(),
        start_date: rowToEdit.start_date?.slice(0, 16) ?? '',
        duration: rowToEdit.duration.toString(),
        location: rowToEdit.location,
        capacity: rowToEdit.capacity.toString(),
        day: rowToEdit.day.id.toString(), // 👈 .id porque ahora es objeto
        activity_type: rowToEdit.activity_type.id.toString(), // 👈 .id
        speaker: rowToEdit.speaker.id.toString(), // 👈 .id
      });
      setEditErrors({});
    }
  }, [editOpen, rowToEdit]);

  // Validación compartida
  const validate = (form: ActivityForm, setErrors: (e: FormErrors) => void) => {
    const errors: FormErrors = {};
    if (!form.name.trim()) errors.name = 'El nombre es requerido.';
    if (!form.day) errors.day = 'El día es requerido.';
    if (!form.activity_type) errors.activity_type = 'El tipo es requerido.';
    if (!form.start_date)
      errors.start_date = 'La fecha de inicio es requerida.';
    if (!form.duration) errors.duration = 'La duración es requerida.';
    if (!form.location.trim()) errors.location = 'La ubicación es requerida.';
    if (!form.capacity) errors.capacity = 'La capacidad es requerida.';
    if (!form.order) errors.order = 'El orden es requerido.';
    setErrors(errors);
    if (!form.speaker) errors.speaker = 'El speaker es requerido.';
    return Object.keys(errors).length === 0;
  };

  type ActivityPayload = Omit<Activities, 'id' | 'is_active'>;

  const formToPayload = (form: ActivityForm): ActivityPayload => ({
    name: form.name,
    order: Number(form.order),
    start_date: form.start_date,
    duration: Number(form.duration),
    location: form.location,
    capacity: Number(form.capacity),
    day: Number(form.day),
    activity_type: Number(form.activity_type),
    speaker: Number(form.speaker),
  });

  // Handlers Crear
  const handleCreateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCreateForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    setCreateErrors((prev) => ({ ...prev, [e.target.name]: undefined }));
  };

  const handleCreateSelectChange = (
    name: keyof ActivityForm,
    value: string,
  ) => {
    setCreateForm((prev) => ({ ...prev, [name]: value }));
    setCreateErrors((prev) => ({ ...prev, [name]: undefined }));
  };

  const handleCreateSubmit = async () => {
    if (!validate(createForm, setCreateErrors)) return;
    setCreateLoading(true);
    try {
      await createActivity(formToPayload(createForm));
      toast.success('Actividad creada correctamente.');
      setCreateForm(emptyForm);
      setCreateOpen(false);
    } catch {
      toast.error('Error al crear la actividad. Intenta nuevamente.');
    } finally {
      setCreateLoading(false);
    }
  };

  const handleCreateOpenChange = (val: boolean) => {
    setCreateOpen(val);
    if (!val) {
      setCreateForm(emptyForm);
      setCreateErrors({});
    }
  };

  // Handlers Editar
  const handleEditChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEditForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    setEditErrors((prev) => ({ ...prev, [e.target.name]: undefined }));
  };

  const handleEditSelectChange = (name: keyof ActivityForm, value: string) => {
    setEditForm((prev) => ({ ...prev, [name]: value }));
    setEditErrors((prev) => ({ ...prev, [name]: undefined }));
  };

  const handleEditSubmit = async () => {
    if (!rowToEdit) return;
    if (!validate(editForm, setEditErrors)) return;
    setEditLoading(true);
    try {
      await updateActivity(rowToEdit.id, formToPayload(editForm));
      toast.success('Actividad actualizada correctamente.');
      onEditOpenChange?.(false);
    } catch {
      toast.error('Error al actualizar la actividad. Intenta nuevamente.');
    } finally {
      setEditLoading(false);
    }
  };

  return (
    <div className='flex flex-wrap gap-2'>
      {/* Botón Nuevo */}
      <Button
        size='sm'
        className='gap-1.5 bg-[#fbba0e] text-black font-semibold hover:bg-[#fbba0e]/90 transition'
        onClick={() => setCreateOpen(true)}
      >
        <Plus className='h-4 w-4' />
        Nuevo
      </Button>

      {/* ── Modal Crear ── */}
      <Dialog open={createOpen} onOpenChange={handleCreateOpenChange}>
        <DialogContent className='bg-[#1a1a1a] border border-white/10 text-slate-200 sm:max-w-md max-h-[90vh] overflow-y-auto'>
          <DialogHeader>
            <div className='flex items-center gap-3 mb-1'>
              <div className='flex h-9 w-9 items-center justify-center rounded-lg bg-[#fbba0e] shadow shadow-[#fbba0e]/20'>
                <Activity className='h-4 w-4 text-black' />
              </div>
              <DialogTitle className='text-slate-100 text-lg font-semibold'>
                Nueva Actividad
              </DialogTitle>
            </div>
            <p className='text-sm text-slate-500 pl-12'>
              Completa los campos para registrar una nueva actividad.
            </p>
          </DialogHeader>

          <ActivityFormFields
            form={createForm}
            errors={createErrors}
            onChange={handleCreateChange}
            onSelectChange={handleCreateSelectChange}
            speakers={speakers} // 👈
          />

          <DialogFooter className='gap-2 pt-2'>
            <DialogClose asChild>
              <Button
                variant='outline'
                size='sm'
                className='border-white/10 bg-transparent text-slate-400 hover:bg-white/5 hover:text-white transition'
              >
                Cancelar
              </Button>
            </DialogClose>
            <Button
              size='sm'
              className='bg-[#fbba0e] text-black font-semibold hover:bg-[#fbba0e]/90 transition min-w-24'
              onClick={handleCreateSubmit}
              disabled={createLoading}
            >
              {createLoading ? 'Guardando...' : 'Guardar'}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* ── Modal Editar ── */}
      <Dialog open={editOpen} onOpenChange={(val) => onEditOpenChange?.(val)}>
        <DialogContent className='bg-[#1a1a1a] border border-white/10 text-slate-200 sm:max-w-md max-h-[90vh] overflow-y-auto'>
          <DialogHeader>
            <div className='flex items-center gap-3 mb-1'>
              <div className='flex h-9 w-9 items-center justify-center rounded-lg bg-white/5 border border-white/10'>
                <Pencil className='h-4 w-4 text-[#fbba0e]' />
              </div>
              <DialogTitle className='text-slate-100 text-lg font-semibold'>
                Editar Actividad
              </DialogTitle>
            </div>
            <p className='text-sm text-slate-500 pl-12'>
              Modifica los campos y guarda los cambios.
            </p>
          </DialogHeader>

          <ActivityFormFields
            form={editForm}
            errors={editErrors}
            onChange={handleEditChange}
            onSelectChange={handleEditSelectChange}
            speakers={speakers} // 👈
          />

          <DialogFooter className='gap-2 pt-2'>
            <Button
              variant='outline'
              size='sm'
              className='border-white/10 bg-transparent text-slate-400 hover:bg-white/5 hover:text-white transition'
              onClick={() => onEditOpenChange?.(false)}
              disabled={editLoading}
            >
              Cancelar
            </Button>
            <Button
              size='sm'
              className='bg-[#fbba0e] text-black font-semibold hover:bg-[#fbba0e]/90 transition min-w-24'
              onClick={handleEditSubmit}
              disabled={editLoading}
            >
              {editLoading ? 'Guardando...' : 'Guardar cambios'}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default ActivityActionButtons;
