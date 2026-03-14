import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';

@Injectable()
export class StorageService {
  private s3Client: S3Client;
  private bucket: string;

  constructor(private configService: ConfigService) {
    this.s3Client = new S3Client({
      endpoint: this.configService.get<string>('DO_SPACES_ENDPOINT')!,
      region: this.configService.get<string>('DO_SPACES_REGION')!,
      credentials: {
        accessKeyId: this.configService.get<string>('DO_SPACES_ACCESS_KEY_ID')!,
        secretAccessKey: this.configService.get<string>('DO_SPACES_SECRET_ACCESS_KEY')!,
      },
    });
    this.bucket = this.configService.get<string>('DO_SPACES_BUCKET')!;
  }

  async getPresignedUploadUrl(key: string, contentType: string): Promise<string> {
    const command = new PutObjectCommand({
      Bucket: this.bucket,
      Key: key,
      ContentType: contentType,
      ACL: 'public-read',
    });

    return getSignedUrl(this.s3Client, command, { expiresIn: 3600 });
  }

  getFileUrl(key: string): string {
    const endpoint = this.configService.get<string>('DO_SPACES_ENDPOINT')?.replace('https://', '') || 'nyc3.digitaloceanspaces.com';
    return `https://${this.bucket}.${endpoint}/${key}`;
  }
}
