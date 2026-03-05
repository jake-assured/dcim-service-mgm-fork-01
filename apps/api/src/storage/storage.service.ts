import { Injectable } from "@nestjs/common";
import { S3StorageProvider } from "./s3.provider";
import { AzureBlobStorageProvider } from "./azure.provider";

export type PresignResult = { uploadUrl: string; objectKey: string; publicUrl?: string };

@Injectable()
export class StorageService {
  constructor(private s3: S3StorageProvider, private azure: AzureBlobStorageProvider) {}

  private provider() {
    const p = (process.env.STORAGE_PROVIDER || "s3").toLowerCase();
    return p === "azure" ? "azure" : "s3";
  }

  async presignUpload(filename: string, contentType: string): Promise<PresignResult> {
    if (this.provider() === "azure") {
      return this.azure.presignUpload(filename, contentType);
    }
    return this.s3.presignUpload(filename, contentType);
  }
}
