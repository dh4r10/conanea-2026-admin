import { mainFields, studentFields, TARIFA_LABELS, TARIFAS } from '../data';
import type { ParticipantType } from '../registration.types';
import type { StepOneData } from './steps.types';

import InputController from '../components/InputController';
import FileUpload from '../components/FileUpload';

interface StepOneProps {
  participantType: ParticipantType;
  data: StepOneData;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onChangeSelect: (name: string, value: string | number) => void;
  onChangeDescription: (name: string, value: string) => void;
  onFile: (e: React.ChangeEvent<HTMLInputElement>) => void;
  errors?: Record<string, string[] | undefined>;
}

const StepOne = ({
  participantType,
  data,
  onChange,
  onChangeSelect,
  onChangeDescription,
  onFile,
  errors,
}: StepOneProps) => {
  return (
    <div>
      <h2 className='text-xl font-black text-gray-900 mb-1'>
        Datos personales
      </h2>
      <p className='text-sm text-gray-400 mb-6'>
        Tipo:{' '}
        <span className='font-bold text-green-700'>
          {TARIFA_LABELS[participantType]}
        </span>
        {' · '}Monto:{' '}
        <span className='font-bold text-green-700'>
          {TARIFAS[participantType].moneda} {TARIFAS[participantType].monto}.00
        </span>
      </p>

      <div className='grid grid-cols-1 sm:grid-cols-2 gap-4'>
        {mainFields.map((field) => (
          <div
            key={field.name}
            className={field.colSpan ? 'sm:col-span-2' : ''}
          >
            <InputController
              inputType={field.inputType}
              label={
                field.name === 'identity_document'
                  ? participantType === 'internacional'
                    ? 'Pasaporte'
                    : 'DNI'
                  : field.label
              }
              name={field.name}
              value={data[field.name] as string}
              onChange={onChange}
              onChangeSearch={(val) => onChangeSelect(field.name, val)}
              onChangeSelect={(e) => onChangeSelect(field.name, e.target.value)}
              selectValue={data[field.name] as string | number}
              placeholder={field.placeholder}
              required={field.required}
              icon={field.icon}
              options={field.options}
              error={errors?.[field.name]?.[0]}
            />
          </div>
        ))}
      </div>

      <div className='grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4'>
        {studentFields.map((field) => (
          <div
            key={field.name}
            className={field.colSpan ? 'sm:col-span-2' : ''}
          >
            <InputController
              inputType={field.inputType}
              label={field.label}
              name={field.name}
              value={data[field.name] as string}
              onChange={onChange}
              onChangeSelect={(e) => onChangeSelect(field.name, e.target.value)}
              selectValue={data[field.name] as string | number}
              descriptionValue={data[field.name] as string}
              onChangeDescription={(val) =>
                onChangeDescription(field.name, val)
              }
              placeholder={field.placeholder}
              checkLabel={field.checkLabel}
              required={field.required}
              icon={field.icon}
              options={field.options}
              error={errors?.[field.name]?.[0]}
            />
          </div>
        ))}

        <div className='sm:col-span-2'>
          <FileUpload
            label='Ficha de matrícula'
            name='archive'
            file={data.archive}
            onChange={onFile}
            accept='.pdf'
            required
          />
          {errors?.archive?.[0] && (
            <p className='text-xs text-red-400 pt-2'>{errors.archive[0]}</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default StepOne;
