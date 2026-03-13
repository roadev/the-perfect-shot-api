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
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth, ApiParam } from '@nestjs/swagger';
import { LocationsService } from './locations.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { CurrentUser } from '../common/decorators/current-user.decorator';
import { CreateLocationDto } from './dto/create-location.dto';
import { UpdateLocationDto } from './dto/update-location.dto';

@ApiTags('Locations')
@Controller('locations')
export class LocationsController {
  constructor(private locationsService: LocationsService) {}

  @ApiOperation({ summary: 'Get all curated locations' })
  @ApiResponse({ status: 200, description: 'Return all locations' })
  @Get()
  async findAll() {
    return this.locationsService.findAll();
  }

  @ApiOperation({ summary: 'Get a specific location by ID' })
  @ApiParam({ name: 'id', description: 'Location UUID' })
  @ApiResponse({ status: 200, description: 'Return the location' })
  @ApiResponse({ status: 404, description: 'Location not found' })
  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.locationsService.findOne(id);
  }

  @ApiOperation({ summary: 'Get location details with upcoming weather forecasts' })
  @ApiParam({ name: 'id', description: 'Location UUID' })
  @ApiResponse({ status: 200, description: 'Return the location with forecasts' })
  @ApiResponse({ status: 404, description: 'Location not found' })
  @Get(':id/forecast')
  async getLocationWithForecast(@Param('id') id: string) {
    return this.locationsService.getLocationWithForecast(id);
  }

  @ApiBearerAuth()
  @ApiOperation({ summary: 'Create a new location (Admin only)' })
  @ApiResponse({ status: 201, description: 'Location created successfully' })
  @ApiResponse({ status: 403, description: 'Forbidden - Admins only' })
  @Post()
  @UseGuards(JwtAuthGuard)
  async create(
    @Body() createLocationDto: CreateLocationDto,
    @CurrentUser('role') role: string,
  ) {
    return this.locationsService.create(createLocationDto, role);
  }

  @ApiBearerAuth()
  @ApiOperation({ summary: 'Update an existing location (Admin only)' })
  @ApiParam({ name: 'id', description: 'Location UUID' })
  @ApiResponse({ status: 200, description: 'Location updated successfully' })
  @ApiResponse({ status: 403, description: 'Forbidden - Admins only' })
  @ApiResponse({ status: 404, description: 'Location not found' })
  @Patch(':id')
  @UseGuards(JwtAuthGuard)
  async update(
    @Param('id') id: string,
    @Body() updateLocationDto: UpdateLocationDto,
    @CurrentUser('role') role: string,
  ) {
    return this.locationsService.update(id, updateLocationDto, role);
  }

  @ApiBearerAuth()
  @ApiOperation({ summary: 'Delete a location (Admin only)' })
  @ApiParam({ name: 'id', description: 'Location UUID' })
  @ApiResponse({ status: 200, description: 'Location deleted successfully' })
  @ApiResponse({ status: 403, description: 'Forbidden - Admins only' })
  @ApiResponse({ status: 404, description: 'Location not found' })
  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  async remove(
    @Param('id') id: string,
    @CurrentUser('role') role: string,
  ) {
    return this.locationsService.remove(id, role);
  }
}
