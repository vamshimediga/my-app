export interface FileUploadResponseDto {

  id: number;

  fileName: string;

  storedFileName: string;

  filePath: string;

  contentType: string;

  fileSize: number;

  uploadedOn: Date;
}


