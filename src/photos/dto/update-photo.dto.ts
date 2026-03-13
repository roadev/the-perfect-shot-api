import { IsString, IsOptional } from 'class-validator';

export class UpdatePhotoDto {
  @IsString()
  @IsOptional()
  imageUrl?: string;

  @IsString()
  @IsOptional()
  celestialTarget?: string;

  @IsOptional()
  cameraMetadata?: Record<string, any>;
}
