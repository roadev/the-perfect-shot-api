import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Query,
  UseGuards,
} from '@nestjs/common';
import { CelestialEventsService } from './celestial-events.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { CurrentUser } from '../common/decorators/current-user.decorator';
import { CreateCelestialEventDto } from './dto/create-celestial-event.dto';

@Controller('celestial-events')
export class CelestialEventsController {
  constructor(private celestialEventsService: CelestialEventsService) {}

  @Get()
  async findAll(@Query('days') days?: string) {
    if (days) {
      return this.celestialEventsService.findUpcoming(parseInt(days, 10));
    }
    return this.celestialEventsService.findAll();
  }

  @Get(':id')
  async findById(@Param('id') id: string) {
    return this.celestialEventsService.findById(id);
  }

  @Post()
  @UseGuards(JwtAuthGuard)
  async create(
    @Body() createCelestialEventDto: CreateCelestialEventDto,
    @CurrentUser('role') role: string,
  ) {
    return this.celestialEventsService.create(createCelestialEventDto, role);
  }
}
