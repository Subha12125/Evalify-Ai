import React from 'react';
import Button from '../ui/Button';

const ExportButton = ({ onExport, loading = false }) => {
  return (
    <div className="flex gap-2">
      <Button 
        variant="outline" 
        size="sm" 
        icon="download" 
        onClick={() => onExport('csv')}
        loading={loading}
      >
        CSV
      </Button>
      <Button 
        variant="outline" 
        size="sm" 
        icon="description" 
        onClick={() => onExport('pdf')}
        loading={loading}
      >
        PDF
      </Button>
    </div>
  );
};

export default ExportButton;
