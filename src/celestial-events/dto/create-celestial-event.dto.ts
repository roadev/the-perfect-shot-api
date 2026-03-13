import { IsString, IsDateString } from 'class-validator';

export class CreateCelestialEventDto {
  @IsString()
  name: string;

  @IsDateString()
  startDate: string;

  @IsDateString()
  peakDate: string;

  @IsDateString()
  endDate: string;
}
