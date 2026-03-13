import { Module } from '@nestjs/common';
import { WeatherForecastsService } from './weather-forecasts.service';
import { WeatherForecastsController } from './weather-forecasts.controller';
import { AuthModule } from '../auth/auth.module';

@Module({
  imports: [AuthModule],
  providers: [WeatherForecastsService],
  controllers: [WeatherForecastsController],
  exports: [WeatherForecastsService],
})
export class WeatherForecastsModule {}
