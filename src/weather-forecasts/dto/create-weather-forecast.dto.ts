import { IsDateString, IsNumber, Min, Max, IsOptional, IsUUID } from 'class-validator';

export class CreateWeatherForecastDto {
  @IsDateString()
  date: string;

  @IsNumber()
  @Min(0)
  @Max(100)
  cloudCover: number;

  @IsNumber()
  @IsOptional()
  seeing?: number;

  @IsUUID()
  locationId: string;
}
