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
import { LocationsService } from './locations.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { CurrentUser } from '../common/decorators/current-user.decorator';
import { CreateLocationDto } from './dto/create-location.dto';
import { UpdateLocationDto } from './dto/update-location.dto';

@Controller('locations')
export class LocationsController {
  constructor(private locationsService: LocationsService) {}

  @Get()
  async findAll() {
    return this.locationsService.findAll();
  }

  @Get(':id')
  async findById(@Param('id') id: string) {
    return this.locationsService.findById(id);
  }

  @Post()
  @UseGuards(JwtAuthGuard)
  async create(
    @Body() createLocationDto: CreateLocationDto,
    @CurrentUser('role') role: string,
  ) {
    return this.locationsService.create(createLocationDto, role);
  }

  @Patch(':id')
  @UseGuards(JwtAuthGuard)
  async update(
    @Param('id') id: string,
    @Body() updateLocationDto: UpdateLocationDto,
    @CurrentUser('role') role: string,
  ) {
    return this.locationsService.update(id, updateLocationDto, role);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  async remove(
    @Param('id') id: string,
    @CurrentUser('role') role: string,
  ) {
    return this.locationsService.remove(id, role);
  }
}
