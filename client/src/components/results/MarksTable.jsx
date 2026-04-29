import React from 'react';
import StatusBadge from '../evaluation/StatusBadge';

const MarksTable = ({ data, onRowClick }) => {
  return (
    <div className="w-full overflow-x-auto no-scrollbar">
      <table className="w-full border-collapse text-left min-w-[800px]">
        <thead>
          <tr className="border-b border-outline-variant/10 text-[10px] font-black uppercase tracking-widest text-outline">
            <th className="px-4 py-4 font-black">Student Name</th>
            <th className="px-4 py-4 font-black">Roll Number</th>
            <th className="px-4 py-4 font-black text-center">Score</th>
            <th className="px-4 py-4 font-black text-center">Accuracy</th>
            <th className="px-4 py-4 font-black">Status</th>
            <th className="px-4 py-4 font-black text-right">Action</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-outline-variant/5">
          {data.map((row) => (
            <tr 
              key={row.id} 
              className="group hover:bg-surface-container-low transition-colors cursor-pointer"
              onClick={() => onRowClick?.(row)}
            >
              <td className="px-4 py-5">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center text-primary font-black text-[10px]">
                    {row.name.split(' ').map(n => n[0]).join('')}
                  </div>
                  <span className="text-sm font-bold text-on-surface">{row.name}</span>
                </div>
              </td>
              <td className="px-4 py-5">
                <span className="text-xs font-medium text-on-surface-variant font-mono">{row.rollNo}</span>
              </td>
              <td className="px-4 py-5 text-center">
                <span className="text-sm font-black text-on-surface">{row.score}</span>
                <span className="text-[10px] text-outline ml-1">/{row.totalMarks}</span>
              </td>
              <td className="px-4 py-5 text-center">
                <div className="flex items-center justify-center gap-2">
                  <div className="w-12 h-1.5 bg-surface-container-high rounded-full overflow-hidden">
                    <div className="h-full bg-primary" style={{ width: `${row.accuracy}%` }} />
                  </div>
                  <span className="text-[10px] font-bold text-on-surface-variant">{row.accuracy}%</span>
                </div>
              </td>
              <td className="px-4 py-5">
                <StatusBadge status={row.status} />
              </td>
              <td className="px-4 py-5 text-right">
                <button className="p-2 rounded-lg hover:bg-surface-container-high text-outline group-hover:text-primary transition-all">
                  <span className="material-symbols-outlined text-lg">arrow_forward</span>
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default MarksTable;
