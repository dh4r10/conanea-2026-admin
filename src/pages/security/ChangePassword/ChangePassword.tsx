import { useState } from 'react';
import { Lock } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { toast, Toaster } from 'sonner';
import { authService } from '@/services/authService';
import InputController from '@/pages/panel/components/InputController';
import { useNavigate } from 'react-router-dom';

const ChangePassword = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    current_password: '',
    new_password: '',
    confirm_password: '',
  });
  const [errors, setErrors] = useState<Partial<typeof form>>({});
  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    setErrors((prev) => ({ ...prev, [e.target.name]: undefined }));
  };

  const validate = () => {
    const newErrors: Partial<typeof form> = {};
    if (!form.current_password.trim())
      newErrors.current_password = 'La contraseña actual es requerida.';
    if (!form.new_password.trim())
      newErrors.new_password = 'La nueva contraseña es requerida.';
    if (form.new_password !== form.confirm_password)
      newErrors.confirm_password = 'Las contraseñas no coinciden.';
    if (form.current_password === form.new_password)
      newErrors.new_password =
        'La nueva contraseña debe ser diferente a la actual.';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async () => {
    if (!validate()) return;
    setLoading(true);
    try {
      await authService.changePassword(
        form.current_password,
        form.new_password,
      );
      toast.success('Contraseña actualizada correctamente.');
      setForm({ current_password: '', new_password: '', confirm_password: '' });
      navigate('/');
    } catch {
      toast.error('La contraseña actual es incorrecta.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className='max-w-md mx-auto mt-10'>
        <div className='rounded-2xl border border-white/10 bg-[#1a1a1a] shadow-xl p-6 flex flex-col gap-6'>
          <div className='flex items-center gap-3'>
            <div className='flex h-9 w-9 items-center justify-center rounded-lg bg-[#fbba0e]'>
              <Lock className='h-4 w-4 text-black' />
            </div>
            <div>
              <h2 className='text-slate-100 text-lg font-semibold'>
                Cambiar contraseña
              </h2>
              <p className='text-sm text-slate-500'>
                Ingresa tu contraseña actual y la nueva.
              </p>
            </div>
          </div>

          <div className='flex flex-col gap-5'>
            <InputController
              kind='input'
              id='current_password'
              label='Contraseña actual'
              type='password'
              value={form.current_password}
              onChange={handleChange}
              error={errors.current_password}
            />
            <InputController
              kind='input'
              id='new_password'
              label='Nueva contraseña'
              type='password'
              value={form.new_password}
              onChange={handleChange}
              error={errors.new_password}
            />
            <InputController
              kind='input'
              id='confirm_password'
              label='Confirmar contraseña'
              type='password'
              value={form.confirm_password}
              onChange={handleChange}
              error={errors.confirm_password}
            />
          </div>

          <Button
            className='bg-[#fbba0e] text-black font-semibold hover:bg-[#fbba0e]/90 transition w-full'
            onClick={handleSubmit}
            disabled={loading}
          >
            {loading ? 'Guardando...' : 'Cambiar contraseña'}
          </Button>
        </div>
      </div>

      <Toaster position='bottom-right' richColors theme='dark' />
    </>
  );
};

export default ChangePassword;
