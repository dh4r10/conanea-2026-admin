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
import { useSpeakerStore } from '@/store/useSpeakerStore';
import type { Speaker } from '@/types/speaker.types';
import { toast } from 'sonner';
import FormFile from '../components/InputController/FormFile';

// --- Tipos ---
type SpeakerForm = {
  name: string;
  title: string;
  bio: string;
  photo: File | null; // 👈 siempre File | null, nunca string
};

type FormErrors = {
  name?: string;
  title?: string;
  bio?: string;
  photo?: string;
};

// --- Formulario reutilizable ---
interface SpeakerFormFieldsProps {
  form: SpeakerForm;
  errors: FormErrors;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onFile: (name: string, file: File | null) => void;
  currentPhoto?: string; // 👈 URL de la foto actual (solo en editar)
}

const SpeakerFormFields = ({
  form,
  errors,
  onChange,
  onFile, // 👈 recibido correctamente
  currentPhoto,
}: SpeakerFormFieldsProps) => {
  return (
    <div className='flex flex-col gap-5 py-2'>
      {/* Lateral izquierdo — foto */}
      {currentPhoto && (
        <div className='flex flex-col items-center gap-2 shrink-0'>
          <div className='w-24 h-24 rounded-xl overflow-hidden border border-white/10'>
            <img
              src={currentPhoto}
              alt='Foto actual'
              className='w-full h-full object-cover object-top'
            />
          </div>

          {/* Botón cambiar foto */}
          <label
            htmlFor='photo'
            className='text-[10px] font-semibold text-slate-400 hover:text-[#fbba0e] transition-colors cursor-pointer uppercase tracking-wider text-center'
          >
            Cambiar foto
          </label>

          {/* Input oculto — el label lo activa */}
          <input
            id='photo'
            name='photo'
            type='file'
            accept='image/*'
            className='hidden'
            onChange={(e) => {
              const file = e.target.files?.[0] ?? null;
              onFile('photo', file);
            }}
          />
          {form.photo && (
            <p className='text-[10px] text-green-400 text-center leading-tight'>
              ✓ {form.photo.name}
            </p>
          )}
          {errors.photo && (
            <p className='text-[10px] text-red-400 text-center'>
              {errors.photo}
            </p>
          )}
        </div>
      )}

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
          htmlFor='title'
          className='text-xs font-semibold uppercase tracking-wider text-slate-400 flex items-center gap-1.5'
        >
          <Type className='h-3 w-3' />
          Título
        </Label>
        <Input
          id='title'
          name='title'
          type='text'
          value={form.title}
          onChange={onChange}
          className='bg-[#111] border-white/10 text-slate-200 placeholder:text-slate-600 focus-visible:ring-[#fbba0e] focus-visible:ring-offset-0'
        />
        {errors.title && <p className='text-xs text-red-400'>{errors.title}</p>}
      </div>

      <div className='flex flex-col gap-1.5'>
        <Label
          htmlFor='bio'
          className='text-xs font-semibold uppercase tracking-wider text-slate-400 flex items-center gap-1.5'
        >
          <Type className='h-3 w-3' />
          Biografía
        </Label>
        <Input
          id='bio'
          name='bio'
          type='text'
          value={form.bio}
          onChange={onChange}
          className='bg-[#111] border-white/10 text-slate-200 placeholder:text-slate-600 focus-visible:ring-[#fbba0e] focus-visible:ring-offset-0'
        />
        {errors.bio && <p className='text-xs text-red-400'>{errors.bio}</p>}
      </div>

      {/* Input foto solo si NO hay foto previa (modal crear) */}
      {!currentPhoto && (
        <FormFile
          value={form.photo}
          onChange={(file) => onFile('photo', file)}
          error={errors.photo}
        />
      )}
    </div>
  );
};

// --- Construcción de FormData ---
const buildFormData = (form: SpeakerForm): FormData => {
  const fd = new FormData();
  fd.append('name', form.name);
  fd.append('title', form.title);
  fd.append('bio', form.bio);
  if (form.photo) fd.append('photo', form.photo);
  return fd;
};

// --- Estado inicial vacío ---
const emptyForm: SpeakerForm = { name: '', title: '', bio: '', photo: null };

// --- Props ---
interface SpeakerActionButtonsProps {
  rowToEdit?: Speaker | null;
  editOpen?: boolean;
  onEditOpenChange?: (val: boolean) => void;
}

const SpeakerActionButtons = ({
  rowToEdit = null,
  editOpen = false,
  onEditOpenChange,
}: SpeakerActionButtonsProps) => {
  const { createSpeaker, updateSpeaker } = useSpeakerStore();

  // Modal Crear
  const [createOpen, setCreateOpen] = useState(false);
  const [createForm, setCreateForm] = useState<SpeakerForm>(emptyForm);
  const [createErrors, setCreateErrors] = useState<FormErrors>({});
  const [createLoading, setCreateLoading] = useState(false);

  // Modal Editar
  const [editForm, setEditForm] = useState<SpeakerForm>(emptyForm);
  const [editErrors, setEditErrors] = useState<FormErrors>({});
  const [editLoading, setEditLoading] = useState(false);

  // Precarga valores al abrir el modal de editar
  useEffect(() => {
    if (editOpen && rowToEdit) {
      setEditForm({
        name: rowToEdit.name,
        title: rowToEdit.title,
        bio: rowToEdit.bio,
        photo: null, // 👈 no se puede precargar un File desde una URL
      });
      setEditErrors({});
    }
  }, [editOpen, rowToEdit]);

  const handleEditOpenChange = (val: boolean) => {
    onEditOpenChange?.(val);
  };

  // Validación compartida
  const validate = (form: SpeakerForm, setErrors: (e: FormErrors) => void) => {
    const errors: FormErrors = {};
    if (!form.name.trim()) errors.name = 'El nombre es requerido.';
    if (!form.title.trim()) errors.title = 'El título es requerido.';
    if (!form.bio.trim()) errors.bio = 'La biografía es requerida.';
    setErrors(errors);
    if (!form.photo) errors.photo = 'La foto es requerida.';
    setErrors(errors);
    return Object.keys(errors).length === 0;
  };

  // --- Handlers Crear ---
  const handleCreateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCreateForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    setCreateErrors((prev) => ({ ...prev, [e.target.name]: undefined }));
  };

  const handleCreateFile = (name: string, file: File | null) => {
    setCreateForm((prev) => ({ ...prev, [name]: file }));
    setCreateErrors((prev) => ({ ...prev, [name]: undefined }));
  };

  const handleCreateSubmit = async () => {
    if (!validate(createForm, setCreateErrors)) return;
    setCreateLoading(true);
    try {
      await createSpeaker(buildFormData(createForm));
      toast.success('Speaker creado correctamente.');
      setCreateForm(emptyForm);
      setCreateOpen(false);
    } catch {
      toast.error('Error al crear el speaker. Intenta nuevamente.');
      setCreateErrors({ name: 'Error al crear. Intenta nuevamente.' });
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

  // --- Handlers Editar ---
  const handleEditChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEditForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    setEditErrors((prev) => ({ ...prev, [e.target.name]: undefined }));
  };

  const handleEditFile = (name: string, file: File | null) => {
    setEditForm((prev) => ({ ...prev, [name]: file }));
    setEditErrors((prev) => ({ ...prev, [name]: undefined }));
  };

  const handleEditSubmit = async () => {
    if (!rowToEdit) return;
    if (!validate(editForm, setEditErrors)) return;
    setEditLoading(true);
    try {
      await updateSpeaker(rowToEdit.id, buildFormData(editForm));
      toast.success('Speaker actualizado correctamente.');
      onEditOpenChange?.(false);
    } catch {
      toast.error('Error al actualizar el speaker. Intenta nuevamente.');
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
                Nuevo Speaker
              </DialogTitle>
            </div>
            <p className='text-sm text-slate-500 pl-12'>
              Completa los campos para registrar un nuevo speaker.
            </p>
          </DialogHeader>

          <SpeakerFormFields
            form={createForm}
            errors={createErrors}
            onChange={handleCreateChange}
            onFile={handleCreateFile} // 👈
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
                Editar Speaker
              </DialogTitle>
            </div>
            <p className='text-sm text-slate-500 pl-12'>
              Modifica los campos y guarda los cambios.
            </p>
          </DialogHeader>

          <SpeakerFormFields
            form={editForm}
            errors={editErrors}
            onChange={handleEditChange}
            onFile={handleEditFile}
            currentPhoto={rowToEdit?.photo} // 👈 pasa la URL actual
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

export default SpeakerActionButtons;
