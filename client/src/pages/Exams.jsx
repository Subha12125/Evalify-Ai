import React from 'react';
import { useNavigate } from 'react-router-dom';

const Exams = () => {
  const navigate = useNavigate();

  const exams = [
    { id: 1, name: 'Advanced Algorithms Final', batch: 'CS-2024-A', date: '2024-04-20', status: 'Grading Complete' },
    { id: 2, name: 'Neural Networks Intro', batch: 'AI-Lab-1', date: '2024-04-18', status: 'In Progress' },
    { id: 3, name: 'Data Structures Midterm', batch: 'CS-2023-B', date: '2023-11-15', status: 'Archived' },
  ];

  return (
    <div className="min-h-full">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-6 mb-12">
        <div>
          <h1 className="text-3xl sm:text-4xl font-extrabold font-headline text-on-surface tracking-tight mb-2">Examination Materials</h1>
          <p className="text-on-surface-variant text-sm sm:text-base">Manage and review your laboratory and lecture exam papers.</p>
        </div>
        <button 
          onClick={() => navigate('/create-exam')}
          className="flex items-center gap-2 px-6 py-3 rounded-xl bg-primary text-on-primary font-bold shadow-lg shadow-primary/20 hover:opacity-90 active:scale-95 transition-all"
        >
          <span className="material-symbols-outlined">add</span>
          New Exam
        </button>
      </div>

      <div className="bg-white rounded-2xl atmospheric-shadow overflow-hidden border border-outline-variant/10">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-surface-container-low/50 text-[10px] font-bold uppercase tracking-widest text-outline">
                <th className="px-8 py-4">Examination Title</th>
                <th className="px-8 py-4">Academic Batch</th>
                <th className="px-8 py-4">Created Date</th>
                <th className="px-8 py-4">Status</th>
                <th className="px-8 py-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-outline-variant/10">
              {exams.map((exam) => (
                <tr 
                  key={exam.id} 
                  className="hover:bg-surface-container-low transition-colors cursor-pointer group"
                  onClick={() => navigate(`/exams/${exam.id}`)}
                >
                  <td className="px-8 py-6">
                    <div className="flex items-center gap-4">
                      <div className="p-2 bg-primary/5 rounded-lg text-primary">
                        <span className="material-symbols-outlined">description</span>
                      </div>
                      <span className="font-bold text-on-surface font-headline">{exam.name}</span>
                    </div>
                  </td>
                  <td className="px-8 py-6 text-sm text-on-surface-variant font-medium">{exam.batch}</td>
                  <td className="px-8 py-6 text-sm text-outline font-medium">{exam.date}</td>
                  <td className="px-8 py-6">
                    <span className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                      exam.status === 'Grading Complete' ? 'bg-green-100 text-green-700' : 
                      exam.status === 'In Progress' ? 'bg-amber-100 text-amber-700' : 'bg-slate-100 text-slate-600'
                    }`}>
                      {exam.status}
                    </span>
                  </td>
                  <td className="px-8 py-6 text-right">
                    <button className="p-2 hover:bg-white rounded-lg text-outline hover:text-primary transition-colors">
                      <span className="material-symbols-outlined">more_vert</span>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Exams;
