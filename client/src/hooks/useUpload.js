import { useState, useCallback } from 'react';

export const useUpload = () => {
  const [files, setFiles] = useState([]);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);

  const addFiles = useCallback((newFiles) => {
    const validFiles = Array.from(newFiles).filter(file => file.type === 'application/pdf');
    setFiles(prev => [...prev, ...validFiles]);
  }, []);

  const removeFile = useCallback((index) => {
    setFiles(prev => prev.filter((_, i) => i !== index));
  }, []);

  const clearFiles = useCallback(() => {
    setFiles([]);
    setUploadProgress(0);
  }, []);

  return {
    files,
    isUploading,
    uploadProgress,
    addFiles,
    removeFile,
    clearFiles,
    setFiles,
    setIsUploading,
    setUploadProgress
  };
};
