import { Injectable, NotFoundException, ForbiddenException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreatePhotoDto } from './dto/create-photo.dto';
import { UpdatePhotoDto } from './dto/update-photo.dto';

@Injectable()
export class PhotosService {
  constructor(private prisma: PrismaService) {}

  async findAllByUser(userId: string) {
    return this.prisma.photo.findMany({
      where: { userId },
      include: { location: true },
      orderBy: { createdAt: 'desc' },
    });
  }

  async findById(id: string, userId: string) {
    const photo = await this.prisma.photo.findUnique({
      where: { id },
      include: { location: true },
    });

    if (!photo) {
      throw new NotFoundException('Photo not found');
    }

    if (photo.userId !== userId) {
      throw new ForbiddenException('You can only view your own photos');
    }

    return photo;
  }

  async create(userId: string, createPhotoDto: CreatePhotoDto) {
    return this.prisma.photo.create({
      data: {
        ...createPhotoDto,
        userId,
      },
      include: { location: true },
    });
  }

  async update(id: string, userId: string, updatePhotoDto: UpdatePhotoDto) {
    const photo = await this.prisma.photo.findUnique({ where: { id } });

    if (!photo) {
      throw new NotFoundException('Photo not found');
    }

    if (photo.userId !== userId) {
      throw new ForbiddenException('You can only update your own photos');
    }

    return this.prisma.photo.update({
      where: { id },
      data: updatePhotoDto,
      include: { location: true },
    });
  }

  async remove(id: string, userId: string) {
    const photo = await this.prisma.photo.findUnique({ where: { id } });

    if (!photo) {
      throw new NotFoundException('Photo not found');
    }

    if (photo.userId !== userId) {
      throw new ForbiddenException('You can only delete your own photos');
    }

    await this.prisma.photo.delete({ where: { id } });

    return { message: 'Photo deleted successfully' };
  }

  async findAllPublic() {
    return this.prisma.photo.findMany({
      take: 12,
      include: { 
        location: true,
        user: {
          select: {
            email: true,
          }
        }
      },
      orderBy: { createdAt: 'desc' },
    });
  }
}
