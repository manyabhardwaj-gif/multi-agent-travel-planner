import React from 'react';
import { ShieldAlert, CheckCircle, ArrowDownRight, Sparkles } from 'lucide-react';
import { formatCurrency } from '../utils/formatters';

export default function BudgetAlertBanner({ tripSummary, costBreakdown }) {
  if (!tripSummary?.rebalanced && !tripSummary?.rebalancingActions?.length) {
    return null;
  }

  const { targetBudget, totalCost, rebalancingActions } = tripSummary;

  return (
    <div className="rounded-2xl p-5 bg-gradient-to-r from-amber-950/40 via-purple-950/30 to-indigo-950/40 border border-amber-500/40 shadow-xl relative overflow-hidden">
      {/* Background glow */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-amber-500/10 rounded-full blur-3xl pointer-events-none"></div>

      <div className="flex items-start space-x-3.5 relative z-10">
        <div className="p-2.5 rounded-xl bg-amber-500/20 text-amber-400 shrink-0 border border-amber-500/30">
          <ShieldAlert className="w-5 h-5" />
        </div>

        <div className="flex-1">
          <div className="flex flex-wrap items-center justify-between gap-2 mb-1.5">
            <h4 className="text-sm font-bold text-amber-200 flex items-center gap-2 font-display">
              <span>Graceful Budget Reconciliation Applied</span>
              <span className="px-2 py-0.5 rounded-full text-[10px] font-semibold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                Resolved Under Budget
              </span>
            </h4>
            <div className="text-xs font-mono font-bold text-emerald-400 bg-slate-900/80 px-2.5 py-1 rounded-lg border border-slate-700">
              Final: {formatCurrency(totalCost)} / {formatCurrency(targetBudget)}
            </div>
          </div>

          <p className="text-xs text-slate-300 mb-3 leading-relaxed">
            Initial parallel agent proposals exceeded your target budget limit. The <strong>Itinerary Coordinator</strong> automatically executed smart multi-agent rebalancing to preserve your luxury experience while keeping expenditures strictly within your target.
          </p>

          {/* Rebalancing actions pill list */}
          <div className="space-y-1.5 bg-slate-950/60 rounded-xl p-3 border border-slate-800/80">
            <span className="text-[11px] font-semibold uppercase tracking-wider text-slate-400 block mb-1">
              Coordinator Actions Taken:
            </span>
            {rebalancingActions.map((action, idx) => (
              <div key={idx} className="flex items-center space-x-2 text-xs text-amber-200/90">
                <CheckCircle className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                <span>{action}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
