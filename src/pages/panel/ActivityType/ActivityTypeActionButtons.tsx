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
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Plus, CalendarDays, Type, Pencil } from 'lucide-react';
import { useActivityTypeStore } from '@/store/useActivityTypeStore';
import type { ActivityType } from '@/types/activityType.types';

import { toast } from 'sonner'; // 👈 agregar

// --- Tipos ---
type ActivityTypeForm = { name: string; logo: string };
type FormErrors = { name?: string; logo?: string };

// --- Formulario reutilizable (Crear y Editar comparten los mismos campos) ---
interface ActivityTypeFormFieldsProps {
  form: ActivityTypeForm;
  errors: FormErrors;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const ActivityTypeFormFields = ({
  form,
  errors,
  onChange,
}: ActivityTypeFormFieldsProps) => (
  <div className='flex flex-col gap-5 py-2'>
    <div className='flex flex-col gap-1.5'>
      <Label
        htmlFor='name'
        className='text-xs font-semibold uppercase tracking-wider text-slate-400 flex items-center gap-1.5'
      >
        <Type className='h-3 w-3' />
        Nombre
      </Label>
      <Input
        id='name'
        name='name'
        value={form.name}
        onChange={onChange}
        maxLength={50}
        className='bg-[#111] border-white/10 text-slate-200 placeholder:text-slate-600 focus-visible:ring-[#fbba0e] focus-visible:ring-offset-0'
      />
      {errors.name && <p className='text-xs text-red-400'>{errors.name}</p>}
    </div>

    <div className='flex flex-col gap-1.5'>
      <Label
        htmlFor='logo'
        className='text-xs font-semibold uppercase tracking-wider text-slate-400 flex items-center gap-1.5'
      >
        <Type className='h-3 w-3' />
        Logo
      </Label>
      <Input
        id='logo'
        name='logo'
        type='text'
        value={form.logo}
        onChange={onChange}
        className='bg-[#111] border-white/10 text-slate-200 placeholder:text-slate-600 focus-visible:ring-[#fbba0e] focus-visible:ring-offset-0 scheme-dark'
      />
      {errors.logo && <p className='text-xs text-red-400'>{errors.logo}</p>}
    </div>
  </div>
);

// --- Props: el padre (Days) controla el modal de editar ---
interface ActivityTypeActionButtonsProps {
  rowToEdit?: ActivityType | null;
  editOpen?: boolean;
  onEditOpenChange?: (val: boolean) => void;
}

const ActivityTypeActionButtons = ({
  rowToEdit = null,
  editOpen = false,
  onEditOpenChange,
}: ActivityTypeActionButtonsProps) => {
  const { createActivityType, updateActivityType } = useActivityTypeStore();

  // Modal Crear
  const [createOpen, setCreateOpen] = useState(false);
  const [createForm, setCreateForm] = useState<ActivityTypeForm>({
    name: '',
    logo: '',
  });
  const [createErrors, setCreateErrors] = useState<FormErrors>({});
  const [createLoading, setCreateLoading] = useState(false);

  // Modal Editar
  const [editForm, setEditForm] = useState<ActivityTypeForm>({
    name: '',
    logo: '',
  });
  const [editErrors, setEditErrors] = useState<FormErrors>({});
  const [editLoading, setEditLoading] = useState(false);

  // Al abrir el modal de editar, precarga los valores de la fila
  useEffect(() => {
    if (editOpen && rowToEdit) {
      setEditForm({
        name: rowToEdit.name,
        logo: rowToEdit.logo,
      });
      setEditErrors({});
    }
  }, [editOpen, rowToEdit]); // 👈 se ejecuta cada vez que se abre con una fila nueva

  // Simplifica handleEditOpenChange a solo propagar el cambio:
  const handleEditOpenChange = (val: boolean) => {
    onEditOpenChange?.(val);
  };

  // Validación compartida
  const validate = (
    form: ActivityTypeForm,
    setErrors: (e: FormErrors) => void,
  ) => {
    const errors: FormErrors = {};
    if (!form.name.trim()) errors.name = 'El Nombre es requerido.';
    if (!form.logo) errors.logo = 'La fecha es requerida.';
    setErrors(errors);
    return Object.keys(errors).length === 0;
  };

  // Handlers Crear
  const handleCreateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCreateForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    setCreateErrors((prev) => ({ ...prev, [e.target.name]: undefined }));
  };

  const handleCreateSubmit = async () => {
    if (!validate(createForm, setCreateErrors)) return;
    setCreateLoading(true);
    try {
      await createActivityType({
        name: createForm.name,
        logo: createForm.logo,
      });
      toast.success('Tipo de actividad creada correctamente.'); // 👈
      setCreateForm({ name: '', logo: '' });
      setCreateOpen(false);
    } catch {
      toast.error('Error al crear el tipo de actividad. Intenta nuevamente.'); // 👈
    } finally {
      setCreateLoading(false);
    }
  };

  const handleCreateOpenChange = (val: boolean) => {
    setCreateOpen(val);
    if (!val) {
      setCreateForm({ name: '', logo: '' });
      setCreateErrors({});
    }
  };

  // Handlers Editar
  const handleEditChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEditForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    setEditErrors((prev) => ({ ...prev, [e.target.name]: undefined }));
  };

  const handleEditSubmit = async () => {
    if (!rowToEdit) return;
    if (!validate(editForm, setEditErrors)) return;
    setEditLoading(true);
    try {
      await updateActivityType(rowToEdit.id, {
        name: editForm.name,
        logo: editForm.logo,
      });
      toast.success('Tipo de actividad actualizada correctamente.'); // 👈
      onEditOpenChange?.(false);
    } catch {
      toast.error(
        'Error al actualizar el tipo de actividad. Intenta nuevamente.',
      ); // 👈
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
        <DialogContent className='bg-[#1a1a1a] border border-white/10 text-slate-200 sm:max-w-md'>
          <DialogHeader>
            <div className='flex items-center gap-3 mb-1'>
              <div className='flex h-9 w-9 items-center justify-center rounded-lg bg-[#fbba0e] shadow shadow-[#fbba0e]/20'>
                <CalendarDays className='h-4 w-4 text-black' />
              </div>
              <DialogTitle className='text-slate-100 text-lg font-semibold'>
                Nuevo Tipo de Actividad
              </DialogTitle>
            </div>
            <p className='text-sm text-slate-500 pl-12'>
              Completa los campos para registrar un nuevo tipo de actividad.
            </p>
          </DialogHeader>

          <ActivityTypeFormFields
            form={createForm}
            errors={createErrors}
            onChange={handleCreateChange}
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
      <Dialog open={editOpen} onOpenChange={handleEditOpenChange}>
        <DialogContent className='bg-[#1a1a1a] border border-white/10 text-slate-200 sm:max-w-md'>
          <DialogHeader>
            <div className='flex items-center gap-3 mb-1'>
              <div className='flex h-9 w-9 items-center justify-center rounded-lg bg-white/5 border border-white/10'>
                <Pencil className='h-4 w-4 text-[#fbba0e]' />
              </div>
              <DialogTitle className='text-slate-100 text-lg font-semibold'>
                Editar
              </DialogTitle>
            </div>
            <p className='text-sm text-slate-500 pl-12'>
              Modifica los campos y guarda los cambios.
            </p>
          </DialogHeader>

          <ActivityTypeFormFields
            form={editForm}
            errors={editErrors}
            onChange={handleEditChange}
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

export default ActivityTypeActionButtons;
