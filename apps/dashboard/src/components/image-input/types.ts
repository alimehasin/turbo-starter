export interface UploadingFile {
  file: File;
  id: string;
  uploadStatus: 'uploading' | 'done' | 'error';
}
