import { IsDateString, IsString, IsOptional } from 'class-validator';

export class UpdateShootPlanDto {
  @IsDateString()
  @IsOptional()
  targetDate?: string;

  @IsString()
  @IsOptional()
  notes?: string;
}
