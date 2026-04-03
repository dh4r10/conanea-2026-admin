import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { authService } from '@/services/authService';
import type { JwtPayload, AuthTokens } from '@/types/auth.types';

let refreshTimeout: ReturnType<typeof setTimeout> | null = null;

const scheduleTokenRefresh = (
  access: string,
  refreshTokenFn: () => Promise<boolean>,
) => {
  try {
    const { exp } = JSON.parse(atob(access.split('.')[1]));

    const now = Date.now() / 1000;
    const timeLeft = exp - now;
    const OFFSET = 30; // segundos

    // 🔥 refrescar 10s antes (o la mitad si es corto)

    const refreshTime = timeLeft > OFFSET ? timeLeft - OFFSET : timeLeft * 0.5;

    if (refreshTimeout) clearTimeout(refreshTimeout);

    refreshTimeout = setTimeout(async () => {
      const success = await refreshTokenFn();

      if (success) {
        const newAccess = useAuthStore.getState().authTokens?.access;
        if (newAccess) {
          scheduleTokenRefresh(newAccess, refreshTokenFn);
        }
      }
    }, refreshTime * 1000);
  } catch (err) {
    console.error('Error scheduling refresh', err);
  }
};

interface AuthState {
  user: JwtPayload | null;
  authTokens: AuthTokens | null;
  isLoading: boolean;

  login: (username: string, password: string) => Promise<boolean>;
  logout: () => void;
  refreshToken: () => Promise<boolean>;
  isAuthenticated: () => boolean;

  setAuth: (tokens: AuthTokens, user: JwtPayload) => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      user: null,
      authTokens: null,
      isLoading: false,

      setAuth: (tokens, user) => {
        set({ authTokens: tokens, user });
      },

      login: async (username, password) => {
        set({ isLoading: true });

        try {
          const { tokens, user } = await authService.login(username, password);

          set({ authTokens: tokens, user, isLoading: false });

          // 🔥 iniciar auto refresh
          scheduleTokenRefresh(tokens.access, get().refreshToken);

          return true;
        } catch {
          set({ isLoading: false });
          return false;
        }
      },

      logout: () => {
        if (refreshTimeout) clearTimeout(refreshTimeout);
        set({ authTokens: null, user: null });
      },

      refreshToken: async () => {
        const { authTokens, setAuth } = get();

        if (!authTokens?.refresh) return false;

        try {
          const { tokens, user } = await authService.refreshToken(
            authTokens.refresh,
          );

          setAuth(tokens, user);

          // 🔁 reprogramar refresh
          scheduleTokenRefresh(tokens.access, get().refreshToken);

          return true;
        } catch {
          get().logout();
          return false;
        }
      },

      isAuthenticated: () => {
        const { authTokens } = get();

        if (!authTokens?.access) return false;

        return authService.isTokenValid(authTokens.access);
      },
    }),
    {
      name: 'auth',
      partialize: (state) => ({
        authTokens: state.authTokens,
        user: state.user,
      }),
    },
  ),
);
