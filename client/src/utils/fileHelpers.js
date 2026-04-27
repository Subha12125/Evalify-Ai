export const getFileExtension = (filename) => {
  return filename.slice((filename.lastIndexOf(".") - 1 >>> 0) + 2);
};

export const formatFileSize = (bytes) => {
  if (bytes === 0) return '0 Bytes';
  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
};

export const isPdf = (file) => {
  return file.type === 'application/pdf' || getFileExtension(file.name).toLowerCase() === 'pdf';
};

export const validateFiles = (files, maxSizeMB = 10) => {
  const maxSizeBytes = maxSizeMB * 1024 * 1024;
  const errors = [];
  
  Array.from(files).forEach(file => {
    if (!isPdf(file)) {
      errors.push(`${file.name} is not a PDF file.`);
    }
    if (file.size > maxSizeBytes) {
      errors.push(`${file.name} exceeds the ${maxSizeMB}MB limit.`);
    }
  });
  
  return {
    isValid: errors.length === 0,
    errors
  };
};
