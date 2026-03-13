import { IsString, IsOptional, IsUUID } from 'class-validator';

export class CreatePhotoDto {
  @IsString()
  imageUrl: string;

  @IsString()
  @IsOptional()
  celestialTarget?: string;

  @IsOptional()
  cameraMetadata?: Record<string, any>;

  @IsUUID()
  locationId: string;
}
