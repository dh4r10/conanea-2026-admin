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
import { useDayStore } from '@/store/useDayStore';
import type { Day } from '@/types/day.types';

import { toast } from 'sonner'; // 👈 agregar

// --- Tipos ---
type DayForm = { title: string; date: string };
type FormErrors = { title?: string; date?: string };

// --- Formulario reutilizable (Crear y Editar comparten los mismos campos) ---
interface DayFormFieldsProps {
  form: DayForm;
  errors: FormErrors;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const DayFormFields = ({ form, errors, onChange }: DayFormFieldsProps) => (
  <div className='flex flex-col gap-5 py-2'>
    <div className='flex flex-col gap-1.5'>
      <Label
        htmlFor='title'
        className='text-xs font-semibold uppercase tracking-wider text-slate-400 flex items-center gap-1.5'
      >
        <Type className='h-3 w-3' />
        Título
      </Label>
      <Input
        id='title'
        name='title'
        value={form.title}
        onChange={onChange}
        placeholder='Ej: Día de Bienvenida'
        maxLength={50}
        className='bg-[#111] border-white/10 text-slate-200 placeholder:text-slate-600 focus-visible:ring-[#fbba0e] focus-visible:ring-offset-0'
      />
      {errors.title && <p className='text-xs text-red-400'>{errors.title}</p>}
    </div>

    <div className='flex flex-col gap-1.5'>
      <Label
        htmlFor='date'
        className='text-xs font-semibold uppercase tracking-wider text-slate-400 flex items-center gap-1.5'
      >
        <CalendarDays className='h-3 w-3' />
        Fecha
      </Label>
      <Input
        id='date'
        name='date'
        type='date'
        value={form.date}
        onChange={onChange}
        className='bg-[#111] border-white/10 text-slate-200 placeholder:text-slate-600 focus-visible:ring-[#fbba0e] focus-visible:ring-offset-0 scheme-dark'
      />
      {errors.date && <p className='text-xs text-red-400'>{errors.date}</p>}
    </div>
  </div>
);

// --- Props: el padre (Days) controla el modal de editar ---
interface DaysActionButtonsProps {
  rowToEdit?: Day | null;
  editOpen?: boolean;
  onEditOpenChange?: (val: boolean) => void;
}

const DaysActionButtons = ({
  rowToEdit = null,
  editOpen = false,
  onEditOpenChange,
}: DaysActionButtonsProps) => {
  const { createDay, updateDay } = useDayStore();

  // Modal Crear
  const [createOpen, setCreateOpen] = useState(false);
  const [createForm, setCreateForm] = useState<DayForm>({
    title: '',
    date: '',
  });
  const [createErrors, setCreateErrors] = useState<FormErrors>({});
  const [createLoading, setCreateLoading] = useState(false);

  // Modal Editar
  const [editForm, setEditForm] = useState<DayForm>({ title: '', date: '' });
  const [editErrors, setEditErrors] = useState<FormErrors>({});
  const [editLoading, setEditLoading] = useState(false);

  // Al abrir el modal de editar, precarga los valores de la fila
  useEffect(() => {
    if (editOpen && rowToEdit) {
      setEditForm({
        title: rowToEdit.title,
        date: rowToEdit.date?.split('T')[0] ?? '',
      });
      setEditErrors({});
    }
  }, [editOpen, rowToEdit]); // 👈 se ejecuta cada vez que se abre con una fila nueva

  // Simplifica handleEditOpenChange a solo propagar el cambio:
  const handleEditOpenChange = (val: boolean) => {
    onEditOpenChange?.(val);
  };

  // Validación compartida
  const validate = (form: DayForm, setErrors: (e: FormErrors) => void) => {
    const errors: FormErrors = {};
    if (!form.title.trim()) errors.title = 'El título es requerido.';
    if (!form.date) errors.date = 'La fecha es requerida.';
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
      await createDay({
        title: createForm.title,
        date: createForm.date,
      });
      toast.success('Día creado correctamente.'); // 👈
      setCreateForm({ title: '', date: '' });
      setCreateOpen(false);
    } catch {
      toast.error('Error al crear el día. Intenta nuevamente.'); // 👈
    } finally {
      setCreateLoading(false);
    }
  };

  const handleCreateOpenChange = (val: boolean) => {
    setCreateOpen(val);
    if (!val) {
      setCreateForm({ title: '', date: '' });
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
      await updateDay(rowToEdit.id, {
        title: editForm.title,
        date: editForm.date,
      });
      toast.success('Día actualizado correctamente.'); // 👈
      onEditOpenChange?.(false);
    } catch {
      toast.error('Error al actualizar el día. Intenta nuevamente.'); // 👈
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
                Nuevo Día
              </DialogTitle>
            </div>
            <p className='text-sm text-slate-500 pl-12'>
              Completa los campos para registrar un nuevo día en el cronograma.
            </p>
          </DialogHeader>

          <DayFormFields
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
                Editar Día
              </DialogTitle>
            </div>
            <p className='text-sm text-slate-500 pl-12'>
              Modifica los campos y guarda los cambios.
            </p>
          </DialogHeader>

          <DayFormFields
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

export default DaysActionButtons;
