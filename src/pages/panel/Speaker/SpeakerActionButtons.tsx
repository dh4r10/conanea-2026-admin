import { useState } from 'react';

import { Plus, Mic2 } from 'lucide-react';

import { Button } from '@/components/ui/button';
import ModalForm from '../components/modals/ModalForm';

import { useSpeakerStore } from '@/store/useSpeakerStore';
import { type SpeakerForm, type FormErrors, emptyForm } from './speaker.types';

import { fields } from './fields';
import { validate } from '@/utils/validations';

import { toast } from 'sonner'; // 👈 agregar

const buildFormData = (form: SpeakerForm): FormData => {
  const fd = new FormData();
  fd.append('name', form.name);
  fd.append('title', form.title);
  fd.append('bio', form.bio);
  if (form.photo) fd.append('photo', form.photo);
  return fd;
};

const ActivityTypeActionButtons = () => {
  const { createSpeaker } = useSpeakerStore();

  // Modal Crear
  const [createOpen, setCreateOpen] = useState(false);

  const [createForm, setCreateForm] = useState<SpeakerForm>(emptyForm);

  const [createErrors, setCreateErrors] = useState<FormErrors>({});

  const [createLoading, setCreateLoading] = useState(false);

  // Handlers Crear
  const handleCreateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCreateForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    setCreateErrors((prev) => ({ ...prev, [e.target.name]: undefined }));
  };

  const handleCreateSubmit = async () => {
    if (!validate(createForm, fields, setCreateErrors)) return;
    setCreateLoading(true);
    try {
      await createSpeaker(buildFormData(createForm));
      toast.success('Speaker creado correctamente.'); // 👈
      setCreateForm(emptyForm);
      setCreateOpen(false);
    } catch {
      toast.error('Error al crear el speaker. Intenta nuevamente.'); // 👈
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

  const handleEditFile = (id: string, file: File | null) => {
    setCreateForm((prev) => ({ ...prev, [id]: file }));
    setCreateErrors((prev) => ({ ...prev, [id]: undefined }));
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
      <ModalForm
        mode='create'
        open={createOpen}
        onOpenChange={handleCreateOpenChange}
        fields={fields}
        onFile={handleEditFile}
        form={createForm}
        errors={createErrors}
        onChange={handleCreateChange}
        onSubmit={handleCreateSubmit}
        loading={createLoading}
        title='Nuevo Speaker'
        description='Completa los campos.'
        icon={<Mic2 className='h-4 w-4 text-black' />}
      />
    </div>
  );
};

export default ActivityTypeActionButtons;
