import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ScheduleModule } from '@nestjs/schedule';
import { PrismaModule } from './prisma/prisma.module';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { LocationsModule } from './locations/locations.module';
import { PhotosModule } from './photos/photos.module';
import { ShootPlansModule } from './shoot-plans/shoot-plans.module';
import { WeatherForecastsModule } from './weather-forecasts/weather-forecasts.module';
import { CelestialEventsModule } from './celestial-events/celestial-events.module';
import { WeatherModule } from './weather/weather.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    ScheduleModule.forRoot(),
    PrismaModule,
    AuthModule,
    UsersModule,
    LocationsModule,
    PhotosModule,
    ShootPlansModule,
    WeatherForecastsModule,
    CelestialEventsModule,
    WeatherModule,
  ],
})
export class AppModule {}
