import { Injectable, NotFoundException, ForbiddenException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateShootPlanDto } from './dto/create-shoot-plan.dto';
import { UpdateShootPlanDto } from './dto/update-shoot-plan.dto';

@Injectable()
export class ShootPlansService {
  constructor(private prisma: PrismaService) {}

  async findAllByUser(userId: string) {
    return this.prisma.shootPlan.findMany({
      where: { userId },
      include: { location: true },
      orderBy: { targetDate: 'asc' },
    });
  }

  async findById(id: string, userId: string) {
    const shootPlan = await this.prisma.shootPlan.findUnique({
      where: { id },
      include: { location: true },
    });

    if (!shootPlan) {
      throw new NotFoundException('Shoot plan not found');
    }

    if (shootPlan.userId !== userId) {
      throw new ForbiddenException('You can only view your own shoot plans');
    }

    return shootPlan;
  }

  async create(userId: string, createShootPlanDto: CreateShootPlanDto) {
    return this.prisma.shootPlan.create({
      data: {
        ...createShootPlanDto,
        userId,
      },
      include: { location: true },
    });
  }

  async update(id: string, userId: string, updateShootPlanDto: UpdateShootPlanDto) {
    const shootPlan = await this.prisma.shootPlan.findUnique({ where: { id } });

    if (!shootPlan) {
      throw new NotFoundException('Shoot plan not found');
    }

    if (shootPlan.userId !== userId) {
      throw new ForbiddenException('You can only update your own shoot plans');
    }

    return this.prisma.shootPlan.update({
      where: { id },
      data: updateShootPlanDto,
      include: { location: true },
    });
  }

  async remove(id: string, userId: string) {
    const shootPlan = await this.prisma.shootPlan.findUnique({ where: { id } });

    if (!shootPlan) {
      throw new NotFoundException('Shoot plan not found');
    }

    if (shootPlan.userId !== userId) {
      throw new ForbiddenException('You can only delete your own shoot plans');
    }

    await this.prisma.shootPlan.delete({ where: { id } });

    return { message: 'Shoot plan deleted successfully' };
  }
}
