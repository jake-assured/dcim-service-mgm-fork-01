import { Injectable } from "@nestjs/common";
import type { PresignResult } from "./storage.service";

/**
 * Azure Blob provider is scaffolded for configuration parity.
 * For MVP we don't enable it by default; implement presigned uploads using SAS in Phase 2 if required.
 */
@Injectable()
export class AzureBlobStorageProvider {
  async presignUpload(filename: string, contentType: string): Promise<PresignResult> {
    throw new Error("Azure Blob presign not implemented in MVP. Set STORAGE_PROVIDER=s3 for now.");
  }
}
