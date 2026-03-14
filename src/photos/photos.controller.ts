import {
  Controller,
  Get,
  Post,
  Patch,
  Delete,
  Body,
  Param,
  Query,
  UseGuards,
} from '@nestjs/common';
import { PhotosService } from './photos.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { CurrentUser } from '../common/decorators/current-user.decorator';
import { CreatePhotoDto } from './dto/create-photo.dto';
import { UpdatePhotoDto } from './dto/update-photo.dto';

@Controller('photos')
export class PhotosController {
  constructor(private photosService: PhotosService) {}

  @Get()
  @UseGuards(JwtAuthGuard)
  async findAll(@CurrentUser('id') userId: string) {
    return this.photosService.findAllByUser(userId);
  }

  @Get('upload-url')
  @UseGuards(JwtAuthGuard)
  async getUploadUrl(
    @CurrentUser('id') userId: string,
    @Query('fileName') fileName: string,
    @Query('contentType') contentType: string,
  ) {
    return this.photosService.getUploadUrl(userId, fileName, contentType);
  }

  @Get('public')
  async findAllPublic() {
    return this.photosService.findAllPublic();
  }

  @Get(':id')
  @UseGuards(JwtAuthGuard)
  async findById(
    @Param('id') id: string,
    @CurrentUser('id') userId: string,
  ) {
    return this.photosService.findById(id, userId);
  }

  @Post()
  @UseGuards(JwtAuthGuard)
  async create(
    @Body() createPhotoDto: CreatePhotoDto,
    @CurrentUser('id') userId: string,
  ) {
    return this.photosService.create(userId, createPhotoDto);
  }

  @Patch(':id')
  @UseGuards(JwtAuthGuard)
  async update(
    @Param('id') id: string,
    @Body() updatePhotoDto: UpdatePhotoDto,
    @CurrentUser('id') userId: string,
  ) {
    return this.photosService.update(id, userId, updatePhotoDto);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  async remove(
    @Param('id') id: string,
    @CurrentUser('id') userId: string,
  ) {
    return this.photosService.remove(id, userId);
  }
}
