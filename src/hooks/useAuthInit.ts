import { useEffect } from 'react';
import { useAuthStore } from '@/store/useAuthStore';
import { authService } from '@/services/authService';

export const useAuthInit = () => {
  useEffect(() => {
    const initAuth = async () => {
      const { authTokens, refreshToken, logout } = useAuthStore.getState();

      if (!authTokens) return;

      const isValid = authService.isTokenValid(authTokens.access);

      // ✅ si el access sigue válido → nada
      if (isValid) return;

      // 🔄 si expiró → intentar refresh
      const success = await refreshToken();

      if (!success) {
        logout();
      }
    };

    initAuth();

    // 🔥 detectar cuando el usuario vuelve a la pestaña
    const handleVisibilityChange = () => {
      if (document.visibilityState === 'visible') {
        initAuth();
      }
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);

    return () => {
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, []);
};
