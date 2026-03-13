import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { ScheduleModule } from '@nestjs/schedule';
import { WeatherService } from './weather.service';
import { PrismaModule } from '../prisma/prisma.module';

@Module({
  imports: [
    HttpModule,
    ScheduleModule,
    PrismaModule,
  ],
  providers: [WeatherService],
  exports: [WeatherService],
})
export class WeatherModule {}
