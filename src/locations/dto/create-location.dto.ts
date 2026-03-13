import { IsString, IsNumber, Min, Max, IsOptional } from 'class-validator';

export class CreateLocationDto {
  @IsString()
  name: string;

  @IsNumber()
  latitude: number;

  @IsNumber()
  longitude: number;

  @IsNumber()
  @IsOptional()
  elevation?: number;

  @IsNumber()
  @Min(1)
  @Max(9)
  bortleScale: number;
}
