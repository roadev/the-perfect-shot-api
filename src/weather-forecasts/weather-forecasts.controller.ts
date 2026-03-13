import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Query,
  UseGuards,
} from '@nestjs/common';
import { WeatherForecastsService } from './weather-forecasts.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { CreateWeatherForecastDto } from './dto/create-weather-forecast.dto';

@Controller('locations/:locationId/forecasts')
export class WeatherForecastsController {
  constructor(private weatherForecastsService: WeatherForecastsService) {}

  @Get()
  async findAll(
    @Param('locationId') locationId: string,
    @Query('startDate') startDate?: string,
    @Query('endDate') endDate?: string,
  ) {
    return this.weatherForecastsService.findByLocation(
      locationId,
      startDate ? new Date(startDate) : undefined,
      endDate ? new Date(endDate) : undefined,
    );
  }

  @Get('best')
  async findBestTimes(
    @Param('locationId') locationId: string,
    @Query('days') days?: string,
  ) {
    return this.weatherForecastsService.findBestTimes(
      locationId,
      days ? parseInt(days, 10) : 7,
    );
  }

  @Post()
  @UseGuards(JwtAuthGuard)
  async create(
    @Param('locationId') locationId: string,
    @Body() createWeatherForecastDto: CreateWeatherForecastDto,
  ) {
    return this.weatherForecastsService.create({
      ...createWeatherForecastDto,
      locationId,
    });
  }
}
