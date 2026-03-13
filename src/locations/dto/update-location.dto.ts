import { IsString, IsNumber, Min, Max, IsOptional } from 'class-validator';

export class UpdateLocationDto {
  @IsString()
  @IsOptional()
  name?: string;

  @IsNumber()
  @IsOptional()
  latitude?: number;

  @IsNumber()
  @IsOptional()
  longitude?: number;

  @IsNumber()
  @IsOptional()
  elevation?: number;

  @IsNumber()
  @Min(1)
  @Max(9)
  @IsOptional()
  bortleScale?: number;
}
