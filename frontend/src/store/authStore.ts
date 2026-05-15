'use client';

import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import api from '@/lib/api';
import { setToken, clearToken } from '@/lib/auth';
import type { ApiEnvelope, LoginResponse, UserPublic } from '@/types/api.types';

interface AuthState {
  user: UserPublic | null;
  token: string | null;
  isAuthenticated: boolean;
  _hasHydrated: boolean;
  setHydrated: (v: boolean) => void;
  login: (email: string, password: string) => Promise<void>;
  register: (email: string, password: string, fullName: string) => Promise<void>;
  logout: () => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      token: null,
      isAuthenticated: false,
      _hasHydrated: false,
      setHydrated: (v) => set({ _hasHydrated: v }),
      login: async (email, password) => {
        const { data } = await api.post<ApiEnvelope<LoginResponse>>('/auth/login', {
          email,
          password,
        });
        const { token, user } = data.data;
        setToken(token);
        set({ user, token, isAuthenticated: true });
      },
      register: async (email, password, fullName) => {
        await api.post<ApiEnvelope<{ user: UserPublic }>>('/auth/register', {
          email,
          password,
          fullName,
        });
      },
      logout: () => {
        clearToken();
        set({ user: null, token: null, isAuthenticated: false });
      },
    }),
    {
      name: 'ra-auth',
      partialize: (s) => ({ user: s.user, token: s.token, isAuthenticated: s.isAuthenticated }),
    }
  )
);
