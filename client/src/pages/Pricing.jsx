import React, { useState } from 'react';
import { useToast } from '../context/ToastContext';
import { useQuota } from '../hooks/useQuota';

const Pricing = () => {
  const [annual, setAnnual] = useState(false);
  const { addToast } = useToast();
  const { plan, subscribed, applyPromo } = useQuota();

  // Promo code state
  const [promoCode, setPromoCode] = useState('');
  const [promoLoading, setPromoLoading] = useState(false);
  const [promoResult, setPromoResult] = useState(null); // { success, message }

  const handlePlanSelect = (planName) => {
    addToast(`Redirecting to checkout for ${planName} plan...`, 'info');
  };

  const handleDemo = () => {
    addToast('Opening demo scheduling calendar...', 'info');
  };

  const handleApplyPromo = async () => {
    if (!promoCode.trim()) {
      addToast('Enter a promo code', 'error');
      return;
    }

    setPromoLoading(true);
    setPromoResult(null);
    try {
      const result = await applyPromo(promoCode.trim());
      if (result.success) {
        setPromoResult({ success: true, message: result.message });
        addToast(result.message, 'success');
        setPromoCode('');
      } else {
        setPromoResult({ success: false, message: result.error || 'Failed' });
        addToast(result.error || 'Invalid promo code', 'error');
      }
    } catch (err) {
      const msg = err.response?.data?.error || 'Failed to apply code';
      setPromoResult({ success: false, message: msg });
      addToast(msg, 'error');
    } finally {
      setPromoLoading(false);
    }
  };

  const plans = [
    {
      name: 'Starter',
      desc: 'For individual faculty members',
      price: annual ? '₹3,999' : '₹4,999',
      period: '/month',
      save: annual ? 'Save ₹12,000/yr' : null,
      features: ['100 Exams/month', 'Basic AI Grading', 'PDF Export', 'Email Support', '5GB Storage'],
      cta: 'Start Free Trial',
    },
    {
      name: 'Professional',
      desc: 'For departments & teams',
      price: annual ? '₹11,999' : '₹14,999',
      period: '/month',
      save: annual ? 'Save ₹36,000/yr' : null,
      features: ['500 Exams/month', 'Advanced AI + Rubric Engine', 'Batch Grading', 'Priority Support', '50GB Storage', 'Analytics Dashboard', 'API Access'],
      tag: 'Most Popular',
      cta: 'Get Started',
    },
    {
      name: 'Institution',
      desc: 'For universities & colleges',
      price: 'Custom',
      period: '',
      features: ['Unlimited Exams', 'Custom AI Model Training', 'SSO & LMS Integration', 'Dedicated Account Manager', 'Unlimited Storage', 'SLA Guarantee', 'On-Premise Option'],
      cta: 'Contact Sales',
    },
  ];

  return (
    <div className="min-h-full py-6 sm:py-12">
      {/* Header */}
      <div className="text-center mb-12">
        <span className="px-3 py-1 bg-primary/10 text-primary text-[10px] font-bold tracking-widest uppercase rounded-full">Pricing</span>
        <h1 className="text-3xl sm:text-4xl font-black font-headline mt-4 mb-3">Simple, Transparent Pricing</h1>
        <p className="text-on-surface-variant font-medium text-sm max-w-md mx-auto">All prices in Indian Rupees (₹). GST @18% applicable on all plans.</p>

        {/* Free tier info */}
        <div className="mt-4 inline-flex items-center gap-2 px-4 py-2 bg-emerald-50 border border-emerald-200 rounded-full">
          <span className="material-symbols-outlined text-emerald-600 text-sm" style={{ fontVariationSettings: "'FILL' 1" }}>redeem</span>
          <span className="text-xs font-bold text-emerald-700">Every user gets 3 free evaluations daily — no card needed!</span>
        </div>

        {/* Toggle */}
        <div className="flex items-center justify-center gap-4 mt-8">
          <span className={`text-sm font-bold ${!annual ? 'text-on-surface' : 'text-outline'}`}>Monthly</span>
          <button
            onClick={() => setAnnual(!annual)}
            className={`toggle-switch relative w-14 h-7 rounded-full transition-colors flex-shrink-0 ${annual ? 'bg-primary' : 'bg-surface-container-highest'}`}
          >
            <div className={`absolute top-1 w-5 h-5 rounded-full bg-white shadow-md transition-transform ${annual ? 'left-8' : 'left-1'}`} />
          </button>
          <span className={`text-sm font-bold ${annual ? 'text-on-surface' : 'text-outline'}`}>Annual</span>
          {annual && <span className="text-[10px] font-bold text-emerald-600 bg-emerald-50 px-2 py-1 rounded">Save 20%</span>}
        </div>
      </div>

      {/* Plans Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
        {plans.map((plan) => (
          <div
            key={plan.name}
            className={`bg-white p-6 sm:p-8 rounded-2xl atmospheric-shadow border relative flex flex-col transition-all hover:-translate-y-1 ${plan.tag ? 'border-primary ring-1 ring-primary/20' : 'border-outline-variant/10'}`}
          >
            {plan.tag && (
              <span className="absolute -top-3 left-1/2 -translate-x-1/2 bg-primary text-on-primary px-4 py-1 rounded-full text-[10px] font-bold tracking-wider uppercase shadow-lg shadow-primary/20">
                {plan.tag}
              </span>
            )}

            <div className="mb-6">
              <h3 className="text-lg font-bold font-headline mb-1">{plan.name}</h3>
              <p className="text-xs text-on-surface-variant">{plan.desc}</p>
            </div>

            <div className="mb-6">
              <div className="flex items-baseline gap-1">
                <span className="text-4xl font-black font-headline">{plan.price}</span>
                <span className="text-outline font-bold text-sm">{plan.period}</span>
              </div>
              {plan.save && <p className="text-[10px] font-bold text-emerald-600 mt-1">{plan.save}</p>}
            </div>

            <ul className="space-y-3 mb-8 flex-1">
              {plan.features.map((f) => (
                <li key={f} className="flex items-start gap-3 text-sm text-on-surface-variant">
                  <span className="material-symbols-outlined text-primary text-base mt-0.5" style={{ fontVariationSettings: "'FILL' 1" }}>check_circle</span>
                  <span>{f}</span>
                </li>
              ))}
            </ul>

            <button
              onClick={() => handlePlanSelect(plan.name)}
              className={`w-full py-3.5 rounded-xl font-bold text-sm transition-all active:scale-95 ${plan.tag ? 'bg-primary text-on-primary shadow-lg shadow-primary/20 hover:opacity-90' : 'bg-surface-container-high text-on-surface hover:bg-primary hover:text-white'}`}
            >
              {plan.cta}
            </button>
          </div>
        ))}
      </div>

      {/* ====== PROMO CODE SECTION ====== */}
      <div className="max-w-lg mx-auto mt-16">
        <div className="bg-white rounded-2xl p-6 sm:p-8 atmospheric-shadow border border-outline-variant/10 relative overflow-hidden">
          {/* Decorative glow */}
          <div className="absolute -right-10 -top-10 w-40 h-40 bg-secondary/5 rounded-full blur-3xl pointer-events-none" />

          <div className="relative z-10">
            <div className="flex items-center gap-2 mb-4">
              <span className="material-symbols-outlined text-secondary" style={{ fontVariationSettings: "'FILL' 1" }}>confirmation_number</span>
              <h3 className="font-headline font-bold text-base">Have a Promo Code?</h3>
            </div>
            <p className="text-xs text-on-surface-variant mb-5">Enter your promo code to unlock a premium plan instantly.</p>

            <div className="flex gap-3">
              <input
                type="text"
                value={promoCode}
                onChange={(e) => setPromoCode(e.target.value.toUpperCase())}
                onKeyDown={(e) => e.key === 'Enter' && handleApplyPromo()}
                placeholder="e.g. OPENFREE"
                className="flex-1 px-4 py-3 bg-surface-container-high/50 rounded-xl text-sm font-bold text-on-surface placeholder:text-outline border-none focus:ring-2 focus:ring-secondary/40 transition-all tracking-widest uppercase"
                disabled={promoLoading}
                maxLength={20}
              />
              <button
                onClick={handleApplyPromo}
                disabled={promoLoading || !promoCode.trim()}
                className={`px-6 py-3 rounded-xl font-bold text-sm transition-all flex items-center gap-2 flex-shrink-0 ${
                  promoLoading || !promoCode.trim()
                    ? 'bg-surface-container-high text-outline pointer-events-none'
                    : 'bg-secondary text-white hover:opacity-90 active:scale-95 shadow-lg shadow-secondary/20'
                }`}
              >
                {promoLoading ? (
                  <span className="material-symbols-outlined text-sm animate-spin">progress_activity</span>
                ) : (
                  <span className="material-symbols-outlined text-sm">redeem</span>
                )}
                Apply
              </button>
            </div>

            {/* Result message */}
            {promoResult && (
              <div className={`mt-4 flex items-center gap-2 px-4 py-3 rounded-xl text-xs font-bold ${
                promoResult.success
                  ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                  : 'bg-red-50 text-red-700 border border-red-200'
              }`}>
                <span className="material-symbols-outlined text-sm" style={{ fontVariationSettings: "'FILL' 1" }}>
                  {promoResult.success ? 'check_circle' : 'error'}
                </span>
                {promoResult.message}
              </div>
            )}

            {/* Current plan indicator */}
            {subscribed && (
              <div className="mt-4 flex items-center gap-2 px-4 py-3 bg-primary/5 rounded-xl border border-primary/10">
                <span className="material-symbols-outlined text-primary text-sm" style={{ fontVariationSettings: "'FILL' 1" }}>verified</span>
                <span className="text-xs font-bold text-primary uppercase tracking-wider">Active Plan: {plan}</span>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* FAQ */}
      <div className="max-w-2xl mx-auto mt-20">
        <h2 className="text-2xl font-bold font-headline text-center mb-10">Frequently Asked Questions</h2>
        <div className="space-y-4">
          {[
            { q: 'How many free evaluations do I get?', a: 'Every user gets 3 free evaluations per day. No credit card or signup fees required.' },
            { q: 'Is GST included in the pricing?', a: 'No, GST @18% is applicable on all plans and will be added at checkout.' },
            { q: 'Can I switch plans anytime?', a: 'Yes. Upgrade or downgrade anytime. Pro-rata adjustments are applied automatically.' },
            { q: 'Do you offer a free trial?', a: 'Yes, the Starter plan comes with a 14-day free trial. No credit card required.' },
            { q: 'What payment methods do you accept?', a: 'We accept UPI, Net Banking, Credit/Debit Cards, and wire transfers for Institution plans.' },
          ].map((item) => (
            <details key={item.q} className="bg-white rounded-xl atmospheric-shadow border border-outline-variant/10 group">
              <summary className="px-6 py-5 cursor-pointer font-bold text-sm text-on-surface flex justify-between items-center list-none">
                {item.q}
                <span className="material-symbols-outlined text-outline group-open:rotate-180 transition-transform">expand_more</span>
              </summary>
              <div className="px-6 pb-5 text-sm text-on-surface-variant leading-relaxed">{item.a}</div>
            </details>
          ))}
        </div>
      </div>

      {/* Enterprise CTA */}
      <div className="max-w-3xl mx-auto mt-16 bg-gradient-to-br from-primary to-primary-container rounded-2xl p-8 sm:p-12 text-center text-white relative overflow-hidden">
        <div className="absolute -right-10 -top-10 w-40 h-40 bg-white/5 rounded-full blur-2xl"></div>
        <h3 className="text-2xl font-black font-headline mb-3 relative z-10">Need a Custom Solution?</h3>
        <p className="text-white/80 text-sm mb-6 max-w-md mx-auto relative z-10">Get a tailored plan for your institution with dedicated support and custom AI model training.</p>
        <button onClick={handleDemo} className="px-8 py-3 bg-white text-primary font-bold rounded-xl hover:opacity-90 active:scale-95 transition-all shadow-xl relative z-10">
          Schedule a Demo
        </button>
      </div>
    </div>
  );
};

export default Pricing;
