import { create } from 'zustand';

export const useQuotaStore = create((set) => ({
  used: 0,
  limit: 3,
  remaining: 3,
  plan: 'free',
  subscribed: false,
  expiresAt: null,
  loaded: false,

  setQuota: (data) => set({
    used: data.used ?? 0,
    limit: data.limit ?? 3,
    remaining: data.remaining ?? 3,
    plan: data.plan ?? 'free',
    subscribed: data.subscribed ?? false,
    expiresAt: data.expiresAt ?? null,
    loaded: true,
  }),

  decrementRemaining: () => set((state) => ({
    used: state.used + 1,
    remaining: Math.max(0, state.remaining - 1),
  })),
}));
