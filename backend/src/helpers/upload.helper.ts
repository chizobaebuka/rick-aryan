/** Multer / S3 upload helpers — wire when file storage is configured */
export const placeholderUploadUrl = (filename: string): string =>
  `/uploads/${encodeURIComponent(filename)}`;
