import { Injectable, NotFoundException, ForbiddenException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateLocationDto } from './dto/create-location.dto';
import { UpdateLocationDto } from './dto/update-location.dto';

@Injectable()
export class LocationsService {
  constructor(private prisma: PrismaService) {}

  async findAll() {
    return this.prisma.location.findMany({
      orderBy: { name: 'asc' },
    });
  }

  async findOne(id: string) {
    const location = await this.prisma.location.findUnique({
      where: { id },
    });

    if (!location) {
      throw new NotFoundException('Location not found');
    }

    return location;
  }

  async getLocationWithForecast(id: string) {
    const location = await this.prisma.location.findUnique({
      where: { id },
      include: {
        forecasts: {
          where: {
            date: {
              gte: new Date(),
            },
          },
          orderBy: {
            date: 'asc',
          },
          take: 48, // Next 48 hours is a good default
        },
      },
    });

    if (!location) {
      throw new NotFoundException('Location not found');
    }

    return location;
  }

  async create(createLocationDto: CreateLocationDto, userRole: string = 'ADMIN') {
    // Note: In a real scenario, this would be handled by a Guard
    if (userRole !== 'ADMIN') {
      throw new ForbiddenException('Only admins can create locations');
    }

    return this.prisma.location.create({
      data: createLocationDto,
    });
  }

  async update(id: string, updateLocationDto: UpdateLocationDto, userRole: string = 'ADMIN') {
    if (userRole !== 'ADMIN') {
      throw new ForbiddenException('Only admins can update locations');
    }

    await this.findOne(id); // Ensure it exists

    return this.prisma.location.update({
      where: { id },
      data: updateLocationDto,
    });
  }

  async remove(id: string, userRole: string = 'ADMIN') {
    if (userRole !== 'ADMIN') {
      throw new ForbiddenException('Only admins can delete locations');
    }

    await this.findOne(id); // Ensure it exists

    return this.prisma.location.delete({
      where: { id },
    });
  }
}
