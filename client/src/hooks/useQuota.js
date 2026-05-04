import { useCallback } from 'react';
import { useQuotaStore } from '../store/quotaStore';
import { quotaService } from '../services/quota.service';

export const useQuota = () => {
  const setQuota = useQuotaStore((s) => s.setQuota);
  const used = useQuotaStore((s) => s.used);
  const limit = useQuotaStore((s) => s.limit);
  const remaining = useQuotaStore((s) => s.remaining);
  const plan = useQuotaStore((s) => s.plan);
  const subscribed = useQuotaStore((s) => s.subscribed);
  const expiresAt = useQuotaStore((s) => s.expiresAt);
  const loaded = useQuotaStore((s) => s.loaded);
  const decrementRemaining = useQuotaStore((s) => s.decrementRemaining);

  const fetchQuota = useCallback(async () => {
    try {
      const data = await quotaService.getQuota();
      setQuota(data);
      return data;
    } catch {
      return null;
    }
  }, [setQuota]);

  const applyPromo = useCallback(async (code) => {
    const data = await quotaService.applyPromo(code);
    if (data.success) {
      await fetchQuota();
    }
    return data;
  }, [fetchQuota]);

  return {
    used,
    limit,
    remaining,
    plan,
    subscribed,
    expiresAt,
    loaded,
    decrementRemaining,
    fetchQuota,
    applyPromo,
  };
};
