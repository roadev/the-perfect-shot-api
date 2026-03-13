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

  async findById(id: string) {
    const location = await this.prisma.location.findUnique({
      where: { id },
    });

    if (!location) {
      throw new NotFoundException('Location not found');
    }

    return location;
  }

  async create(createLocationDto: CreateLocationDto, userRole: string) {
    if (userRole !== 'ADMIN') {
      throw new ForbiddenException('Only admins can create locations');
    }

    return this.prisma.location.create({
      data: createLocationDto,
    });
  }

  async update(id: string, updateLocationDto: UpdateLocationDto, userRole: string) {
    if (userRole !== 'ADMIN') {
      throw new ForbiddenException('Only admins can update locations');
    }

    const location = await this.prisma.location.update({
      where: { id },
      data: updateLocationDto,
    });

    return location;
  }

  async remove(id: string, userRole: string) {
    if (userRole !== 'ADMIN') {
      throw new ForbiddenException('Only admins can delete locations');
    }

    await this.prisma.location.delete({
      where: { id },
    });

    return { message: 'Location deleted successfully' };
  }
}
