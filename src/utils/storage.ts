
/**
 * Storage utility functions for interacting with MinIO/S3
 */

import { STORAGE_BASE_URL, UPLOAD_CONFIG } from '@/config/backend';

// Get the current environment
const env = process.env.NODE_ENV || 'development';

/**
 * Generate a signed URL for accessing content from storage
 * 
 * @param filepath Path to the file in storage
 * @param expiresIn Expiration time in seconds (default: 1 hour)
 * @returns URL to access the file
 */
export const getFileUrl = (filepath: string): string => {
  // In a real implementation, this would generate a signed URL
  // For now, we're just concatenating the paths
  const baseUrl = STORAGE_BASE_URL[env as keyof typeof STORAGE_BASE_URL];
  const bucket = UPLOAD_CONFIG.storageBucket;
  
  // For development without actual MinIO, return direct URLs for testing
  if (filepath.startsWith('http')) {
    return filepath;
  }
  
  return `${baseUrl}/${bucket}/${filepath}`;
};

/**
 * Validate a file before upload
 * 
 * @param file File to validate
 * @param type Type of file (audio, image, project)
 * @returns Object containing validation result and any error message
 */
export const validateFile = (file: File, type: 'audio' | 'image' | 'project') => {
  // Check file size
  if (file.size > UPLOAD_CONFIG.maxSizeInBytes) {
    return {
      valid: false,
      error: `File size exceeds the maximum limit of ${UPLOAD_CONFIG.maxSizeInBytes / (1024 * 1024)}MB`
    };
  }
  
  // Check file extension
  const extension = file.name.substring(file.name.lastIndexOf('.')).toLowerCase();
  
  let allowedFormats: string[] = [];
  switch (type) {
    case 'audio':
      allowedFormats = UPLOAD_CONFIG.allowedAudioFormats;
      break;
    case 'image':
      allowedFormats = UPLOAD_CONFIG.allowedImageFormats;
      break;
    case 'project':
      allowedFormats = UPLOAD_CONFIG.allowedProjectFormats;
      break;
    default:
      return { valid: false, error: 'Invalid file type' };
  }
  
  if (!allowedFormats.includes(extension)) {
    return {
      valid: false,
      error: `File type not supported. Allowed formats: ${allowedFormats.join(', ')}`
    };
  }
  
  return { valid: true, error: null };
};

/**
 * Format file size for display
 * 
 * @param bytes File size in bytes
 * @returns Formatted file size string
 */
export const formatFileSize = (bytes: number): string => {
  if (bytes < 1024) {
    return `${bytes} B`;
  } else if (bytes < 1024 * 1024) {
    return `${(bytes / 1024).toFixed(1)} KB`;
  } else {
    return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
  }
};
