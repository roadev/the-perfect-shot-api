import {
  Controller,
  Get,
  Post,
  Patch,
  Delete,
  Body,
  Param,
  UseGuards,
} from '@nestjs/common';
import { ShootPlansService } from './shoot-plans.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { CurrentUser } from '../common/decorators/current-user.decorator';
import { CreateShootPlanDto } from './dto/create-shoot-plan.dto';
import { UpdateShootPlanDto } from './dto/update-shoot-plan.dto';

@Controller('shoot-plans')
@UseGuards(JwtAuthGuard)
export class ShootPlansController {
  constructor(private shootPlansService: ShootPlansService) {}

  @Get()
  async findAll(@CurrentUser('id') userId: string) {
    return this.shootPlansService.findAllByUser(userId);
  }

  @Get(':id')
  async findById(
    @Param('id') id: string,
    @CurrentUser('id') userId: string,
  ) {
    return this.shootPlansService.findById(id, userId);
  }

  @Post()
  async create(
    @Body() createShootPlanDto: CreateShootPlanDto,
    @CurrentUser('id') userId: string,
  ) {
    return this.shootPlansService.create(userId, createShootPlanDto);
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateShootPlanDto: UpdateShootPlanDto,
    @CurrentUser('id') userId: string,
  ) {
    return this.shootPlansService.update(id, userId, updateShootPlanDto);
  }

  @Delete(':id')
  async remove(
    @Param('id') id: string,
    @CurrentUser('id') userId: string,
  ) {
    return this.shootPlansService.remove(id, userId);
  }
}
