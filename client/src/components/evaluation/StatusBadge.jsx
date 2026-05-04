import React from 'react';

const StatusBadge = ({ status }) => {
  const styles = {
    pending: 'bg-surface-container-highest text-on-surface-variant border-outline-variant/20',
    evaluating: 'bg-primary/10 text-primary border-primary/20 animate-pulse',
    completed: 'bg-success/10 text-success border-success/20',
    failed: 'bg-error/10 text-error border-error/20',
    reviewed: 'bg-secondary/10 text-secondary border-secondary/20',
  };

  const icons = {
    pending: 'schedule',
    evaluating: 'auto_awesome',
    completed: 'check_circle',
    failed: 'error',
    reviewed: 'visibility',
  };

  const label = status?.charAt(0).toUpperCase() + status?.slice(1) || 'Unknown';

  return (
    <div className={`
      inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest border
      ${styles[status] || styles.pending}
    `}>
      <span className="material-symbols-outlined text-sm" style={{ fontVariationSettings: status === 'evaluating' ? "'FILL' 1" : "" }}>
        {icons[status] || 'help'}
      </span>
      {label}
    </div>
  );
};

export default StatusBadge;
