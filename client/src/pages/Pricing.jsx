import React from 'react';

const Pricing = () => {
  const plans = [
    { name: 'Starter', price: '₹4,999', period: '/month', features: ['100 Exams', 'Basic AI', 'Email Support'] },
    { name: 'Professional', price: '₹14,999', period: '/month', features: ['500 Exams', 'Advanced AI', 'Priority Support'], tag: 'Popular' },
    { name: 'Institution', price: 'Custom', period: '', features: ['Unlimited Exams', 'Custom AI Training', 'Dedicated Manager'] },
  ];

  return (
    <div className="min-h-full py-12">
      <div className="text-center mb-16">
        <h1 className="text-4xl font-black font-headline mb-4">Indian Market Pricing</h1>
        <p className="text-on-surface-variant font-medium">Simple, local billing for institutions.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto px-4">
        {plans.map((plan) => (
          <div key={plan.name} className={`bg-white p-8 rounded-3xl atmospheric-shadow border border-outline-variant/10 relative transition-all hover:scale-105 ${plan.tag ? 'ring-2 ring-primary' : ''}`}>
            {plan.tag && <span className="absolute -top-4 left-1/2 -translate-x-1/2 bg-primary text-on-primary px-4 py-1 rounded-full text-xs font-bold">{plan.tag}</span>}
            <h3 className="text-xl font-bold font-headline mb-4">{plan.name}</h3>
            <div className="mb-8">
              <span className="text-4xl font-black">{plan.price}</span>
              <span className="text-outline-variant font-bold text-sm">{plan.period}</span>
            </div>
            <ul className="space-y-4 mb-10">
              {plan.features.map((f) => (
                <li key={f} className="flex items-center gap-3 text-sm font-medium text-on-surface-variant">
                  <span className="material-symbols-outlined text-primary text-lg">check_circle</span>
                  {f}
                </li>
              ))}
            </ul>
            <button className={`w-full py-4 rounded-xl font-bold transition-all ${plan.tag ? 'bg-primary text-on-primary shadow-lg shadow-primary/20' : 'bg-surface-container-high text-on-surface hover:bg-primary hover:text-white'}`}>
              Select Plan
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Pricing;
