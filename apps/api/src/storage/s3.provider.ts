import { Injectable } from "@nestjs/common";
import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import { v4 as uuidv4 } from "uuid";
import type { PresignResult } from "./storage.service";

@Injectable()
export class S3StorageProvider {
  private client: S3Client;
  private bucket: string;
  private endpoint?: string;

  constructor() {
    this.bucket = process.env.S3_BUCKET || "dcms-attachments";
    this.endpoint = process.env.S3_ENDPOINT;

    this.client = new S3Client({
      region: process.env.S3_REGION || "eu-west-2",
      endpoint: this.endpoint,
      forcePathStyle: (process.env.S3_FORCE_PATH_STYLE || "false") === "true",
      credentials: {
        accessKeyId: process.env.S3_ACCESS_KEY || "",
        secretAccessKey: process.env.S3_SECRET_KEY || ""
      }
    });
  }

  async presignUpload(filename: string, contentType: string): Promise<PresignResult> {
    const objectKey = `${uuidv4()}-${filename}`;
    const cmd = new PutObjectCommand({
      Bucket: this.bucket,
      Key: objectKey,
      ContentType: contentType
    });
    const uploadUrl = await getSignedUrl(this.client, cmd, { expiresIn: 60 * 5 });

    const publicUrl = this.endpoint
      ? `${this.endpoint.replace(/\/$/, "")}/${this.bucket}/${objectKey}`
      : undefined;

    return { uploadUrl, objectKey, publicUrl };
  }
}
