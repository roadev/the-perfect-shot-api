import { IsDateString, IsString, IsOptional, IsUUID } from 'class-validator';

export class CreateShootPlanDto {
  @IsDateString()
  targetDate: string;

  @IsString()
  @IsOptional()
  notes?: string;

  @IsUUID()
  locationId: string;
}
