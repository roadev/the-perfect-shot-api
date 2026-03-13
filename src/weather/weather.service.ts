import { Injectable, Logger } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { Cron, CronExpression } from '@nestjs/schedule';
import { PrismaService } from '../prisma/prisma.service';
import { firstValueFrom } from 'rxjs';

@Injectable()
export class WeatherService {
  private readonly logger = new Logger(WeatherService.name);

  constructor(
    private readonly httpService: HttpService,
    private readonly prisma: PrismaService,
  ) {}

  async fetchForecastForLocation(latitude: number, longitude: number) {
    const url = `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&hourly=cloud_cover,visibility&forecast_days=5`;
    const { data } = await firstValueFrom(this.httpService.get(url));
    return data;
  }

  @Cron(CronExpression.EVERY_6_HOURS)
  async syncAllLocationForecasts() {
    this.logger.log('Starting sync for all location forecasts...');
    const locations = await this.prisma.location.findMany();

    for (const location of locations) {
      try {
        const forecastData = await this.fetchForecastForLocation(
          location.latitude,
          location.longitude,
        );

        const { hourly } = forecastData;
        const forecasts = hourly.time.map((time: string, index: number) => ({
          date: new Date(time),
          cloudCover: hourly.cloud_cover[index],
          visibility: hourly.visibility[index],
          locationId: location.id,
        }));

        // Upsert data using a transaction
        await this.prisma.$transaction(
          forecasts.map((f: any) => {
            // Calculate a simple sky score: 100 - cloud cover
            // We factor in Bortle scale (1-9) where 1 is best
            const bortleImpact = (location.bortleScale - 1) * 5;
            let skyScore = 100 - f.cloudCover - bortleImpact;
            skyScore = Math.max(0, Math.round(skyScore));
            
            return this.prisma.weatherForecast.upsert({
              where: {
                locationId_date: {
                  locationId: f.locationId,
                  date: f.date,
                },
              },
              update: {
                cloudCover: f.cloudCover,
                skyScore: skyScore,
              },
              create: {
                locationId: f.locationId,
                date: f.date,
                cloudCover: f.cloudCover,
                skyScore: skyScore,
              },
            });
          }),
        );

        this.logger.log(`Synced forecasts for location: ${location.name}`);
      } catch (error) {
        this.logger.error(
          `Failed to sync forecast for location ${location.id}: ${error.message}`,
        );
      }
    }
    this.logger.log('Finished sync for all location forecasts.');
  }
}
