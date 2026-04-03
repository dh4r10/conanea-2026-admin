import { useAuthStore } from '@/store/useAuthStore';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const { login, isLoading } = useAuthStore();
  const navigate = useNavigate();

  const [form, setForm] = useState({ username: '', password: '' });
  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.SubmitEvent) => {
    e.preventDefault();
    const success = await login(form.username, form.password);
    if (success) {
      navigate('/');
    } else {
      // Toast.error('Credenciales incorrectas');
      alert('Credenciales incorrectas');
    }
  };

  return (
    <div className='min-h-screen bg-[#0a0a0a] flex items-center justify-center px-4'>
      {/* Background grid */}
      <div
        className='fixed inset-0 opacity-[0.04]'
        style={{
          backgroundImage:
            'linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)',
          backgroundSize: '48px 48px',
        }}
      />

      {/* Glow */}
      <div className='fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full bg-[#fbba0e] opacity-[0.04] blur-[120px] pointer-events-none' />

      <div className='relative w-full max-w-sm'>
        {/* Card */}
        <div className='bg-[#111] border border-white/[0.07] rounded-2xl p-8 shadow-2xl'>
          {/* Title */}
          <div className='mb-8'>
            <div className='flex items-center gap-2 mb-4'>
              <div className='w-4 h-px bg-[#fbba0e]' />
              <span className='text-[10px] font-bold tracking-[0.25em] uppercase text-[#fbba0e]'>
                Panel CONAEA2026
              </span>
            </div>
            <img
              src='/img/sigepo_sin_fondo.png'
              alt='Logo SIGEPO'
              className='w-40'
            />
            <p className='text-sm text-white/30 mt-4'>
              Sistema de Gestión de Páginas Organizativas
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className='flex flex-col gap-4'>
            {/* Username */}
            <div className='flex flex-col gap-1.5'>
              <label className='text-[11px] font-bold uppercase tracking-widest text-white/90'>
                Usuario
              </label>
              <input
                type='text'
                name='username'
                value={form.username}
                onChange={handleChange}
                placeholder='---------'
                autoComplete='username'
                required
                className='w-full bg-white/5 border border-white/5 rounded-xl px-4 py-3 text-sm text-white placeholder:text-white/20 focus:outline-none focus:border-[#fbba0e]/50 focus:ring-1 focus:ring-[#fbba0e]/30 transition-all'
              />
            </div>

            {/* Password */}
            <div className='flex flex-col gap-1.5'>
              <label className='text-[11px] font-bold uppercase tracking-widest text-white/90'>
                Contraseña
              </label>
              <div className='relative'>
                <input
                  type={showPassword ? 'text' : 'password'}
                  name='password'
                  value={form.password}
                  onChange={handleChange}
                  placeholder='••••••••'
                  autoComplete='current-password'
                  required
                  className='w-full bg-white/5 border border-white/8 rounded-xl px-4 py-3 pr-11 text-sm text-white placeholder:text-white/20 focus:outline-none focus:border-[#fbba0e]/50 focus:ring-1 focus:ring-[#fbba0e]/30 transition-all'
                />
                <button
                  type='button'
                  onClick={() => setShowPassword((p) => !p)}
                  className='absolute right-3 top-1/2 -translate-y-1/2 text-white/30 hover:text-white/60 transition-colors'
                >
                  {showPassword ? (
                    <svg
                      className='w-4 h-4'
                      fill='none'
                      viewBox='0 0 24 24'
                      stroke='currentColor'
                      strokeWidth={2}
                    >
                      <path
                        strokeLinecap='round'
                        strokeLinejoin='round'
                        d='M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 4.411m0 0L21 21'
                      />
                    </svg>
                  ) : (
                    <svg
                      className='w-4 h-4'
                      fill='none'
                      viewBox='0 0 24 24'
                      stroke='currentColor'
                      strokeWidth={2}
                    >
                      <path
                        strokeLinecap='round'
                        strokeLinejoin='round'
                        d='M15 12a3 3 0 11-6 0 3 3 0 016 0z'
                      />
                      <path
                        strokeLinecap='round'
                        strokeLinejoin='round'
                        d='M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z'
                      />
                    </svg>
                  )}
                </button>
              </div>
            </div>

            {/* Submit */}
            <button
              type='submit'
              disabled={isLoading || !form.username || !form.password}
              className={[
                'mt-2 w-full py-3 rounded-xl text-sm font-bold tracking-wide transition-all cursor-pointer',
                form.username && form.password && !isLoading
                  ? 'bg-[#fbba0e] text-[#0a0a0a] hover:bg-[#fdc830] shadow-lg shadow-[#fbba0e]/20'
                  : 'bg-white/5 text-white/20 cursor-not-allowed',
              ].join(' ')}
            >
              {isLoading ? (
                <span className='flex items-center justify-center gap-2'>
                  <svg
                    className='w-4 h-4 animate-spin'
                    fill='none'
                    viewBox='0 0 24 24'
                  >
                    <circle
                      className='opacity-25'
                      cx='12'
                      cy='12'
                      r='10'
                      stroke='currentColor'
                      strokeWidth='4'
                    />
                    <path
                      className='opacity-75'
                      fill='currentColor'
                      d='M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z'
                    />
                  </svg>
                  Verificando…
                </span>
              ) : (
                'Ingresar'
              )}
            </button>
          </form>
        </div>

        {/* Footer */}
        <p className='text-center text-[11px] text-white/50 mt-6'>
          XXXII CONAEA · Tarapoto 2026
        </p>
      </div>
    </div>
  );
};

export default Login;
