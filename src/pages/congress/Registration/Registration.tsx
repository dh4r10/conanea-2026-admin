// import { useState } from 'react';
// import { ChevronRight, ChevronLeft } from 'lucide-react';

// import type { FormData } from './registration.types';
// import { useValidationStore } from '@/store/useRegistrationStore';
// import universitiesData from './universidades.json';

// import StepZero from './steps/StepZero';
// import StepOne from './steps/StepOne';
// import StepTwo from './steps/StepTwo';
// import StepItem from './components/StepItem';
// import Confirmation from './components/Confirmation';

// const STEPS = ['Tipo', 'Datos', 'Pago', 'Confirmación'];

// interface RegistrationProps {
//   header: React.ReactNode;
//   footer: React.ReactNode;
// }

// const Registration = ({ header, footer }: RegistrationProps) => {
//   const { errors, isLoading, validate, clearErrors } = useValidationStore();

//   const [step, setStep] = useState(0);
//   const [submitted, setSubmitted] = useState(false);
//   const [openConfirmModal, setOpenConfirmModal] = useState(false);
//   const [form, setForm] = useState<FormData>({
//     participantType: 'nacional',
//     first_name: '',
//     paternal_surname: '',
//     maternal_surname: '',
//     identity_document: '',
//     birthdate: '',
//     cellphone: '',
//     email: '',
//     cod_university: '',
//     academic_cycle: '',
//     allergy: '',
//     disability: '',
//     archive: null,
//     payment_method: '',
//     vaucher: null,
//   });

//   const handleChange = (
//     e: React.ChangeEvent<
//       HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
//     >,
//   ) => {
//     setForm((f) => ({ ...f, [e.target.name]: e.target.value }));
//   };

//   const handleFile = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const file = e.target.files?.[0] ?? null;
//     setForm((f) => ({ ...f, [e.target.name]: file }));
//   };

//   const handleChangeSelect = (name: string, value: string | number) => {
//     setForm((prev) => ({ ...prev, [name]: value })); // ← setForm, no setData
//   };

//   const handleChangeDescription = (name: string, value: string) => {
//     setForm((prev) => ({ ...prev, [name]: value })); // ← setForm, no setData
//   };

//   const selectedUniversity = universitiesData.find(
//     (u) => u.id === Number(form.cod_university),
//   );

//   const handleNext = async () => {
//     if (step === 1) {
//       const formData = new FormData();
//       formData.append('first_name', form.first_name);
//       formData.append('paternal_surname', form.paternal_surname);
//       formData.append('maternal_surname', form.maternal_surname);
//       formData.append('identity_document', form.identity_document);
//       formData.append(
//         'document_type',
//         form.participantType === 'internacional' ? 'PASAPORTE' : 'DNI',
//       );
//       formData.append('email', form.email);
//       formData.append(
//         'cod_country',
//         String(selectedUniversity?.cod_country ?? 1),
//       );
//       formData.append('cod_university', String(form.cod_university));
//       formData.append('academic_cycle', form.academic_cycle);
//       formData.append('birthdate', form.birthdate);
//       if (form.archive) formData.append('archive', form.archive);
//       formData.append('allergy', form.allergy);
//       formData.append('disability', form.disability);

//       const isValid = await validate(formData);
//       if (!isValid) return;
//       clearErrors();
//     }

//     setStep((s) => s + 1);
//   };

//   const canNext = () => {
//     if (step === 0) return !!form.participantType;
//     if (step === 1)
//       return !!(
//         form.first_name &&
//         form.paternal_surname &&
//         form.maternal_surname &&
//         form.identity_document &&
//         form.cellphone &&
//         form.email &&
//         form.cod_university
//       );
//     if (step === 2) return !!(form.payment_method && form.vaucher);
//     return true;
//   };

//   // ── CONFIRMACIÓN ──────────────────────────────────────────────
//   if (submitted) {
//     return (
//       <Confirmation
//         nombres={form.first_name}
//         apellidos={form.paternal_surname + ' ' + form.maternal_surname}
//         correo={form.email}
//         universidad={form.cod_university}
//         participantType={form.participantType}
//         metodoPago={form.payment_method}
//       />
//     );
//   }

//   // ── FORM ──────────────────────────────────────────────────────
//   return (
//     <>
//       {header}

//       <div className='min-h-screen bg-gray-50 pt-24 pb-8 px-4'>
//         <div className='max-w-2xl mx-auto'>
//           {/* Header */}
//           <div className='mb-8'>
//             <div className='flex items-center gap-3 mb-2'>
//               <div className='w-6 h-px bg-[#fbba0e]' />
//               <p className='text-xs font-bold tracking-[0.2em] uppercase text-[#fbba0e]'>
//                 XXXII CONAEA · Tarapoto 2026
//               </p>
//             </div>
//             <h1 className='text-3xl font-black text-gray-900'>Inscripción</h1>
//             <p className='text-gray-400 text-sm mt-1'>
//               31/Agosto — 04/Septiembre · UNSM, Tarapoto
//             </p>
//           </div>

//           {/* Steps */}
//           <div className='flex items-center justify-center gap-0 mb-8'>
//             {STEPS.map((s, i) => (
//               <StepItem
//                 key={s}
//                 label={s}
//                 index={i}
//                 current={step}
//                 total={STEPS.length}
//               />
//             ))}
//           </div>

//           <div className='bg-white rounded-3xl shadow-sm border border-gray-100 p-6 sm:p-8'>
//             {/* ── STEP 0: Tipo ─────────────────────────────── */}
//             {step === 0 && (
//               <StepZero
//                 selected={form.participantType}
//                 onSelect={(t) => setForm((f) => ({ ...f, participantType: t }))}
//               />
//             )}

//             {/* ── STEP 1: Datos ────────────────────────────── */}
//             {step === 1 && (
//               <StepOne
//                 participantType={form.participantType}
//                 data={{
//                   first_name: form.first_name,
//                   paternal_surname: form.paternal_surname,
//                   maternal_surname: form.maternal_surname,
//                   identity_document: form.identity_document,
//                   birthdate: form.birthdate,
//                   cellphone: form.cellphone,
//                   email: form.email,
//                   cod_university: form.cod_university,
//                   academic_cycle: form.academic_cycle,
//                   allergy: form.allergy,
//                   disability: form.disability,
//                   archive: form.archive,
//                 }}
//                 onChange={handleChange}
//                 onFile={handleFile}
//                 onChangeSelect={handleChangeSelect}
//                 onChangeDescription={handleChangeDescription}
//                 errors={errors}
//               />
//             )}

//             {/* ── STEP 2: Pago ─────────────────────────────── */}
//             {step === 2 && (
//               <StepTwo
//                 participantType={form.participantType}
//                 metodoPago={form.payment_method}
//                 comprobante={form.vaucher}
//                 nombres={form.first_name}
//                 apellidos={form.paternal_surname + ' ' + form.maternal_surname}
//                 correo={form.email}
//                 universidad={form.cod_university}
//                 onMetodoPago={(m) =>
//                   setForm((f) => ({ ...f, payment_method: m }))
//                 }
//                 onFile={handleFile}
//                 showModal={openConfirmModal}
//                 onCloseModal={() => setOpenConfirmModal(false)}
//                 onConfirm={() => {
//                   setOpenConfirmModal(false);
//                   setSubmitted(true);
//                 }}
//               />
//             )}

//             {/* Navigation */}
//             <div className='flex items-center justify-between mt-8 pt-5 border-t border-gray-100'>
//               {step > 0 ? (
//                 <button
//                   onClick={() => setStep((s) => s - 1)}
//                   className='flex items-center gap-2 text-sm font-bold text-gray-500 hover:text-gray-700 transition-colors cursor-pointer'
//                 >
//                   <ChevronLeft className='w-4 h-4' /> Anterior
//                 </button>
//               ) : (
//                 <div />
//               )}

//               {step < STEPS.length - 1 && (
//                 <button
//                   onClick={() =>
//                     step === 2 ? setOpenConfirmModal(true) : handleNext()
//                   }
//                   disabled={!canNext() || isLoading}
//                   className={[
//                     'flex items-center gap-2 font-bold text-sm px-6 py-2.5 rounded-xl transition-all cursor-pointer',
//                     canNext() && !isLoading
//                       ? 'bg-green-600 hover:bg-green-700 text-white shadow-sm'
//                       : 'bg-gray-100 text-gray-300 cursor-not-allowed',
//                   ].join(' ')}
//                 >
//                   {isLoading ? 'Validando…' : 'Siguiente'}
//                   {!isLoading && <ChevronRight className='w-4 h-4' />}
//                 </button>
//               )}
//             </div>
//           </div>

//           <p className='text-center text-xs text-gray-400 mt-6'>
//             ¿Tienes dudas? Contáctanos al{' '}
//             <a
//               href={`https://wa.me/51942316018?text=${encodeURIComponent('[INSCRIPCIÓN] Hola Marcelo Quiñones, buen día. Necesito ayuda para la inscripción del CONAEA 2026 :)')}`}
//               target='_blank'
//               rel='noreferrer'
//               className='font-bold text-green-600 hover:underline'
//             >
//               942 316 018
//             </a>
//             {' - '}
//             <a
//               href={`https://wa.me/51927579113?text=${encodeURIComponent('[INSCRIPCIÓN] Hola Arni Cordova, buen día. Necesito ayuda para la inscripción del CONAEA 2026 :)')}`}
//               target='_blank'
//               rel='noreferrer'
//               className='font-bold text-green-600 hover:underline'
//             >
//               927 579 113
//             </a>
//             {' - '}
//             <a
//               href={`https://wa.me/51942316018?text=${encodeURIComponent('[INSCRIPCIÓN] Hola Euler Padilla, buen día.  Necesito ayuda para la inscripción del CONAEA 2026 :)')}`}
//               target='_blank'
//               rel='noreferrer'
//               className='font-bold text-green-600 hover:underline'
//             >
//               942 316 018
//             </a>
//           </p>
//         </div>
//       </div>

//       {footer}
//     </>
//   );
// };

// export default Registration;

import React from 'react';

import {
  Calendar,
  Users,
  Globe,
  MapPin,
  Clock,
  ChevronRight,
} from 'lucide-react';

interface RegistrationProps {
  header: React.ReactNode;
  footer: React.ReactNode;
}

const phases = [
  {
    id: '01',
    name: '1ra Preventa',
    start: '5 de abril',
    end: '5 de mayo',
    status: 'upcoming',
    tiers: [
      { label: 'Nacional', spots: 180, price: 'S/ 480', flag: '🇵🇪' },
      { label: 'Local UNSM', spots: 30, price: 'S/ 100', flag: '🏫' },
      { label: 'Internacional', spots: 10, price: '$ 146', flag: '🌎' },
    ],
  },
  {
    id: '02',
    name: '2da Preventa',
    start: '15 de mayo',
    end: '15 de junio',
    status: 'upcoming',
    tiers: [
      { label: 'Nacional', spots: 400, price: 'S/ 500', flag: '🇵🇪' },
      { label: 'Local UNSM', spots: 50, price: 'S/ 120', flag: '🏫' },
      { label: 'Internacional', spots: 20, price: '$ 152', flag: '🌎' },
    ],
  },
  {
    id: '03',
    name: 'Venta Final',
    start: '25 de junio',
    end: '25 de julio',
    status: 'upcoming',
    tiers: [
      { label: 'Nacional', spots: 400, price: 'S/ 530', flag: '🇵🇪' },
      { label: 'Local UNSM', spots: 70, price: 'S/ 150', flag: '🏫' },
      { label: 'Internacional', spots: null, price: null, flag: '🌎' },
    ],
  },
];

const Registration = ({ header, footer }: RegistrationProps) => {
  return (
    <>
      {header}

      <main className='min-h-screen bg-white'>
        {/* ── Hero ── */}
        <div className='relative bg-[#0a1a0f] overflow-hidden'>
          <div
            className='absolute inset-0 opacity-10'
            style={{
              backgroundImage: `radial-gradient(circle at 10% 60%, #4ade80 0%, transparent 50%),
                                radial-gradient(circle at 90% 20%, #fbba0e 0%, transparent 40%),
                                radial-gradient(circle at 50% 100%, #166534 0%, transparent 50%)`,
            }}
          />

          <div className='relative px-4 sm:px-6 lg:px-8 xl:px-20 pt-24 sm:pt-28 lg:pt-32 pb-16 sm:pb-20'>
            <div className='flex flex-col lg:flex-row lg:items-center lg:justify-between gap-8 sm:gap-10'>
              {/* Texto */}
              <div>
                <div className='flex items-center gap-3 mb-4'>
                  <div className='w-8 h-px bg-[#fbba0e]' />
                  <p className='text-xs font-bold tracking-[0.3em] uppercase text-[#fbba0e]'>
                    CONAEA 2026 · Inscripciones
                  </p>
                </div>

                <h1 className='text-3xl sm:text-5xl lg:text-7xl font-black text-white leading-tight mb-4'>
                  Próximamente
                  <br />
                  <span
                    className='text-transparent'
                    style={{ WebkitTextStroke: '2px #4ade80' }}
                  >
                    disponible
                  </span>
                </h1>

                <p className='text-green-300/70 text-sm sm:text-base lg:text-lg max-w-lg leading-relaxed mb-6 sm:mb-8'>
                  Las inscripciones para el XXXII Congreso Nacional de
                  Estudiantes de Agronomía abrirán muy pronto. Revisa las fechas
                  y precios por etapa a continuación.
                </p>

                <div className='flex flex-wrap gap-2 sm:gap-3'>
                  <div className='inline-flex items-center gap-2 bg-white/5 border border-white/10 rounded-full px-3 sm:px-4 py-2 text-xs sm:text-sm text-white/70'>
                    <Calendar className='w-4 h-4 text-[#fbba0e]' />
                    31 Ago — 4 Sep, 2026
                  </div>
                  <div className='inline-flex items-center gap-2 bg-white/5 border border-white/10 rounded-full px-3 sm:px-4 py-2 text-xs sm:text-sm text-white/70'>
                    <MapPin className='w-4 h-4 text-green-400' />
                    UNSM · Tarapoto
                  </div>
                  <div className='inline-flex items-center gap-2 bg-white/5 border border-white/10 rounded-full px-3 sm:px-4 py-2 text-xs sm:text-sm text-white/70'>
                    <Users className='w-4 h-4 text-green-400' />
                    Cupos limitados
                  </div>
                </div>
              </div>

              {/* Badge */}
              <div className='shrink-0 hidden xl:flex flex-col items-center justify-center w-48 h-48 rounded-full border-2 border-[#fbba0e]/30 relative'>
                <div className='absolute inset-3 rounded-full border border-[#fbba0e]/20' />
                <div className='absolute inset-6 rounded-full bg-[#fbba0e]/5' />
                <Clock className='w-8 h-8 text-[#fbba0e] mb-2 relative' />
                <p className='text-white font-black text-lg relative'>MUY</p>
                <p className='text-[#fbba0e] font-black text-lg relative'>
                  PRONTO
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* ── Etapas ── */}
        <div className='px-4 sm:px-6 lg:px-8 xl:px-20 py-16 sm:py-20'>
          <div className='mb-10 sm:mb-12 flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4'>
            <div>
              <div className='flex items-center gap-3 mb-3'>
                <div className='w-8 h-px bg-[#fbba0e]' />
                <p className='text-xs font-bold tracking-[0.3em] uppercase text-[#fbba0e]'>
                  Etapas de inscripción
                </p>
              </div>
              <h2 className='text-2xl sm:text-3xl lg:text-4xl font-black text-gray-900 leading-tight'>
                Precios y fechas
              </h2>
              <div className='w-12 h-1 bg-[#fbba0e] rounded-full mt-4' />
            </div>

            <p className='text-gray-400 text-xs sm:text-sm max-w-xs sm:text-right leading-relaxed'>
              Los precios varían según la etapa. Te recomendamos inscribirte en
              preventa para asegurar tu cupo.
            </p>
          </div>

          <div className='flex flex-col gap-6'>
            {phases.map((phase, phaseIdx) => (
              <div
                key={phase.id}
                className='rounded-2xl border border-gray-100 overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-300'
              >
                {/* Header */}
                <div
                  className={[
                    'flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 px-5 sm:px-6 py-4 sm:py-5',
                    phaseIdx === 0
                      ? 'bg-[#fbba0e]/5 border-b border-[#fbba0e]/20'
                      : 'bg-gray-50 border-b border-gray-100',
                  ].join(' ')}
                >
                  <div className='flex items-center gap-4'>
                    <span
                      className={[
                        'text-3xl sm:text-4xl font-black',
                        phaseIdx === 0 ? 'text-[#fbba0e]' : 'text-gray-200',
                      ].join(' ')}
                    >
                      {phase.id}
                    </span>

                    <div>
                      <h3 className='text-base sm:text-lg font-black text-gray-900'>
                        {phase.name}
                      </h3>
                      <div className='flex items-center gap-1.5 text-gray-400 text-xs mt-0.5'>
                        <Clock className='w-3 h-3' />
                        <span>{phase.start}</span>
                        <ChevronRight className='w-3 h-3' />
                        <span>{phase.end}</span>
                      </div>
                    </div>
                  </div>

                  <span className='inline-flex w-fit items-center gap-1.5 bg-amber-50 text-amber-600 border border-amber-200 text-xs font-bold px-3 py-1.5 rounded-full uppercase'>
                    <span className='w-1.5 h-1.5 rounded-full bg-amber-400' />
                    Próximamente
                  </span>
                </div>

                {/* Tiers */}
                <div className='grid grid-cols-1 md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-gray-100 bg-white'>
                  {phase.tiers.map((tier) => (
                    <div
                      key={tier.label}
                      className='flex flex-col sm:flex-row md:flex-col items-start sm:items-center md:items-start justify-between md:justify-start gap-2 px-5 sm:px-6 py-4 sm:py-5'
                    >
                      <div className='flex items-center gap-2'>
                        <span className='text-lg'>{tier.flag}</span>
                        <div>
                          <p className='text-xs font-bold text-gray-400 uppercase'>
                            {tier.label}
                          </p>
                          {tier.spots && (
                            <div className='flex items-center gap-1 mt-0.5'>
                              <Users className='w-3 h-3 text-green-500' />
                              <span className='text-xs text-gray-400'>
                                {tier.spots} cupos
                              </span>
                            </div>
                          )}
                        </div>
                      </div>

                      {tier.price ? (
                        <p
                          className={[
                            'text-xl sm:text-2xl md:text-3xl font-black',
                            phaseIdx === 0 ? 'text-[#fbba0e]' : 'text-gray-800',
                          ].join(' ')}
                        >
                          {tier.price}
                        </p>
                      ) : (
                        <p className='text-sm text-gray-300 italic'>
                          Por definir
                        </p>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>

          {/* Nota */}
          <div className='mt-8 sm:mt-10 rounded-2xl bg-green-50 border border-green-100 px-5 sm:px-6 py-4 sm:py-5 flex flex-col sm:flex-row items-start sm:items-center gap-3 sm:gap-4'>
            <div className='w-10 h-10 shrink-0 rounded-xl bg-green-100 flex items-center justify-center'>
              <Globe className='w-5 h-5 text-green-600' />
            </div>
            <div>
              <p className='text-sm font-bold text-gray-800 mb-0.5'>
                ¿Eres estudiante internacional?
              </p>
              <p className='text-sm text-gray-500 leading-relaxed'>
                Los precios en <span className='font-semibold'>$</span> aplican
                para participantes fuera del Perú. Escríbenos a{' '}
                <a
                  href='mailto:clave.fca.unsm@gmail.com'
                  className='text-green-600 font-semibold'
                >
                  clave.fca.unsm@gmail.com
                </a>
              </p>
            </div>
          </div>
        </div>
      </main>

      {footer}
    </>
  );
};

export default Registration;
