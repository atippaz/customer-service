import {
  Controller,
  Get,
  Post,
  Body,
  InternalServerErrorException,
} from '@nestjs/common';
import { FavoriteService } from './favorite.service';
import { CreateFavoriteDto } from './favorite.dto';

@Controller('favorite')
export class FavoriteController {
  constructor(private readonly favoriteService: FavoriteService) {}

  @Post('/create')
  async create(@Body() payload: { name: string }) {
    try {
      return await this.favoriteService.create(payload.name);
    } catch (ex) {
      throw new InternalServerErrorException('An unexpected error occurred');
    }
  }

  @Get('/dropdown')
  findAll() {
    try {
      return this.favoriteService.findAll();
    } catch (ex) {
      throw new InternalServerErrorException('An unexpected error occurred');
    }
  }
}
