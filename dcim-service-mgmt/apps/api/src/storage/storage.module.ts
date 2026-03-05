import { Global, Module } from "@nestjs/common";
import { StorageService } from "./storage.service";
import { S3StorageProvider } from "./s3.provider";
import { AzureBlobStorageProvider } from "./azure.provider";

@Global()
@Module({
  providers: [StorageService, S3StorageProvider, AzureBlobStorageProvider],
  exports: [StorageService]
})
export class StorageModule {}
