import { useActivityTypeStore } from '@/store/useActivityTypeStore';
import { useDayStore } from '@/store/useDayStore';

import type { Speaker } from '@/types/speaker.types';
import type { ActivityForm, FormErrors } from './activity.types';
import FormSelect from '../components/InputController/FormSelect';
import FormInput from '../components/InputController/FormInput';

// --- Formulario reutilizable ---
interface ActivityFormFieldsProps {
  form: ActivityForm;
  errors: FormErrors;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onSelectChange: (name: keyof ActivityForm, value: string) => void;
  speakers: Speaker[]; //
}

const ActivityFormFields = ({
  form,
  errors,
  onChange,
  onSelectChange,
  speakers, // 👈
}: ActivityFormFieldsProps) => {
  const { days } = useDayStore();
  const { activityTypes } = useActivityTypeStore();

  return (
    <div className='flex flex-col gap-5 py-2'>
      {/* Nombre */}
      <FormInput
        id='name'
        label='Nombre'
        value={form.name}
        onChange={onChange}
        error={errors.name}
        type='text'
      />

      {/* Días */}
      <FormSelect
        label='Día'
        value={form.day}
        onValueChange={(val) => onSelectChange('day', val)}
        options={days.map((d) => ({
          label: d.title,
          value: d.id.toString(),
        }))}
        error={errors.day}
      />

      {/* Tipos de actividad */}
      <FormSelect
        label='Tipo de actividad'
        value={form.activity_type}
        onValueChange={(val) => onSelectChange('activity_type', val)}
        options={activityTypes.map((at) => ({
          label: at.name,
          value: at.id.toString(),
        }))}
        error={errors.activity_type}
      />

      {/* Speakers */}
      <FormSelect
        label='Speaker'
        value={form.speaker}
        onValueChange={(val) => onSelectChange('speaker', val)}
        options={speakers.map((s) => ({
          label: s.name,
          value: s.id.toString(),
        }))}
        error={errors.speaker}
      />

      {/* Fecha inicio + Duración */}
      <div className='grid grid-cols-2 gap-3'>
        <FormInput
          id='start_date'
          label='Hora'
          value={form.start_date}
          onChange={onChange}
          error={errors.start_date}
          type='time'
        />

        <FormInput
          id='duration'
          label='Duración'
          value={form.duration}
          onChange={onChange}
          error={errors.duration}
          type='number'
          min={1}
        />
      </div>

      {/* Ubicación + Capacidad */}
      <div className='grid grid-cols-2 gap-3'>
        <FormInput
          id='location'
          label='location'
          value={form.location}
          onChange={onChange}
          error={errors.location}
        />

        <FormInput
          id='capacity'
          label='Capacidad'
          value={form.capacity}
          onChange={onChange}
          error={errors.capacity}
          type='number'
          min={1}
        />
      </div>
    </div>
  );
};

export default ActivityFormFields;
