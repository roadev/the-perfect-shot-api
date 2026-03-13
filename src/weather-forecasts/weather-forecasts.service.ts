import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateWeatherForecastDto } from './dto/create-weather-forecast.dto';

@Injectable()
export class WeatherForecastsService {
  constructor(private prisma: PrismaService) {}

  async findByLocation(locationId: string, startDate?: Date, endDate?: Date) {
    const location = await this.prisma.location.findUnique({
      where: { id: locationId },
    });

    if (!location) {
      throw new NotFoundException('Location not found');
    }

    const where: any = { locationId };

    if (startDate && endDate) {
      where.date = {
        gte: startDate,
        lte: endDate,
      };
    }

    return this.prisma.weatherForecast.findMany({
      where,
      orderBy: { date: 'asc' },
    });
  }

  async findBestTimes(locationId: string, days: number = 7) {
    const location = await this.prisma.location.findUnique({
      where: { id: locationId },
    });

    if (!location) {
      throw new NotFoundException('Location not found');
    }

    const startDate = new Date();
    const endDate = new Date();
    endDate.setDate(endDate.getDate() + days);

    const forecasts = await this.prisma.weatherForecast.findMany({
      where: {
        locationId,
        date: {
          gte: startDate,
          lte: endDate,
        },
        skyScore: {
          gte: 70,
        },
      },
      orderBy: [{ skyScore: 'desc' }, { cloudCover: 'asc' }],
      take: 10,
    });

    return forecasts;
  }

  async create(createWeatherForecastDto: CreateWeatherForecastDto) {
    const { date, locationId, cloudCover, seeing } = createWeatherForecastDto;

    // Calculate sky score based on cloud cover, seeing, and Bortle scale
    const location = await this.prisma.location.findUnique({
      where: { id: locationId },
    });

    if (!location) {
      throw new NotFoundException('Location not found');
    }

    // Simple sky score calculation
    // Lower cloud cover = higher score
    // Lower Bortle scale (darker) = higher score
    // Better seeing = higher score
    let skyScore = 100 - cloudCover;

    // Bortle scale impact (1-9, lower is darker)
    const bortleImpact = (location.bortleScale - 1) * 5;
    skyScore -= bortleImpact;

    // Seeing impact (1-5 scale, lower is better)
    if (seeing) {
      const seeingImpact = (seeing - 1) * 10;
      skyScore -= seeingImpact;
    }

    skyScore = Math.max(0, Math.min(100, skyScore));

    return this.prisma.weatherForecast.create({
      data: {
        date: new Date(date),
        locationId,
        cloudCover,
        seeing,
        skyScore: Math.round(skyScore),
      },
    });
  }
}
