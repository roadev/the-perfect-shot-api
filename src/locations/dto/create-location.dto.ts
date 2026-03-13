import { IsString, IsNumber, Min, Max, IsOptional } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateLocationDto {
  @ApiProperty({
    description: 'Name of the location',
    example: 'Tatacoa Desert',
  })
  @IsString()
  name: string;

  @ApiProperty({
    description: 'Latitude of the location',
    example: 3.2333,
    minimum: -90,
    maximum: 90,
  })
  @IsNumber()
  @Min(-90)
  @Max(90)
  latitude: number;

  @ApiProperty({
    description: 'Longitude of the location',
    example: -75.1667,
    minimum: -180,
    maximum: 180,
  })
  @IsNumber()
  @Min(-180)
  @Max(180)
  longitude: number;

  @ApiProperty({
    description: 'Elevation in meters (optional)',
    example: 400,
    required: false,
  })
  @IsNumber()
  @IsOptional()
  elevation?: number;

  @ApiProperty({
    description: 'Bortle Scale for light pollution (1-9, lower is darker)',
    example: 2,
    minimum: 1,
    maximum: 9,
  })
  @IsNumber()
  @Min(1)
  @Max(9)
  bortleScale: number;
}
