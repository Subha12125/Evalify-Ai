import React from 'react';
import Modal from '../ui/Modal';
import Button from '../ui/Button';
import Input from '../ui/Input';

const FeedbackSheet = ({ isOpen, onClose, studentName, onSubmit }) => {
  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={`Feedback for ${studentName}`}
      footer={
        <>
          <Button variant="ghost" onClick={onClose}>Cancel</Button>
          <Button variant="primary" onClick={() => onSubmit()}>Submit Feedback</Button>
        </>
      }
    >
      <div className="space-y-6">
        <div className="p-4 bg-primary/5 rounded-2xl border border-primary/10">
          <p className="text-xs text-primary font-bold uppercase tracking-widest mb-2">AI Summary</p>
          <p className="text-sm text-on-surface-variant italic">"Student shows excellent grasp of core concepts but needs to work on mathematical derivation steps in Section B."</p>
        </div>
        
        <div className="space-y-2">
          <label className="text-[10px] font-black uppercase tracking-widest text-outline ml-1">Professor's Comments</label>
          <textarea 
            className="w-full h-32 p-4 bg-surface-container-high/50 rounded-2xl border-none focus:ring-2 focus:ring-primary/30 text-sm text-on-surface placeholder:text-outline/60 transition-all resize-none"
            placeholder="Enter your observations here..."
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Input label="Correction Marks" type="number" defaultValue="0" />
          <div className="space-y-2">
            <label className="text-[10px] font-black uppercase tracking-widest text-outline ml-1">Flag for Review</label>
            <div className="flex items-center gap-3 h-[48px] px-4 bg-surface-container-high/50 rounded-xl">
              <input type="checkbox" className="w-5 h-5 rounded border-outline-variant text-primary focus:ring-primary" />
              <span className="text-sm font-medium text-on-surface-variant">Request Department Review</span>
            </div>
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default FeedbackSheet;
