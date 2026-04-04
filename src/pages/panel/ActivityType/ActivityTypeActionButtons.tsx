import { useState } from 'react';

import { Plus, Brackets } from 'lucide-react';

import { Button } from '@/components/ui/button';
import ModalForm from '../components/modals/ModalForm';

import { useActivityTypeStore } from '@/store/useActivityTypeStore';
import type { ActivityTypeForm, FormErrors } from './activityType.types';

import { fields } from './fields';
import { validate } from '@/utils/validations';

import { toast } from 'sonner'; // 👈 agregar

const ActivityTypeActionButtons = () => {
  const { createActivityType } = useActivityTypeStore();

  // Modal Crear
  const [createOpen, setCreateOpen] = useState(false);

  const [createForm, setCreateForm] = useState<ActivityTypeForm>({
    name: '',
    logo: '',
  });

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
        form={createForm}
        errors={createErrors}
        onChange={handleCreateChange}
        onSubmit={handleCreateSubmit}
        loading={createLoading}
        title='Nuevo Tipo'
        description='Completa los campos.'
        icon={<Brackets className='h-4 w-4 text-black' />}
      />
    </div>
  );
};

export default ActivityTypeActionButtons;
