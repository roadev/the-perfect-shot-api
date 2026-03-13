import { Injectable, NotFoundException, ForbiddenException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateCelestialEventDto } from './dto/create-celestial-event.dto';

@Injectable()
export class CelestialEventsService {
  constructor(private prisma: PrismaService) {}

  async findAll() {
    return this.prisma.celestialEvent.findMany({
      orderBy: { peakDate: 'asc' },
    });
  }

  async findById(id: string) {
    const event = await this.prisma.celestialEvent.findUnique({
      where: { id },
    });

    if (!event) {
      throw new NotFoundException('Celestial event not found');
    }

    return event;
  }

  async findUpcoming(days: number = 30) {
    const now = new Date();
    const endDate = new Date();
    endDate.setDate(endDate.getDate() + days);

    return this.prisma.celestialEvent.findMany({
      where: {
        endDate: { gte: now },
        startDate: { lte: endDate },
      },
      orderBy: { peakDate: 'asc' },
    });
  }

  async create(createCelestialEventDto: CreateCelestialEventDto, userRole: string) {
    if (userRole !== 'ADMIN') {
      throw new ForbiddenException('Only admins can create celestial events');
    }

    return this.prisma.celestialEvent.create({
      data: createCelestialEventDto,
    });
  }
}
