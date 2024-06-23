import {
  Controller,
  Get,
  Post,
  Body,
  InternalServerErrorException,
  Logger,
} from '@nestjs/common';
import { FavoriteService } from './favorite.service';
import { CreateFavoriteDto } from './favorite.dto';

@Controller('favorite')
export class FavoriteController {
  constructor(private readonly favoriteService: FavoriteService) {}

  @Post('/create')
  async create(@Body() payload: { name: string }) {
    try {
      Logger.log(payload);
      const res = await this.favoriteService.create(payload.name);
      Logger.log(res);
      return res;
    } catch (ex) {
      Logger.error(ex);
      throw new InternalServerErrorException('An unexpected error occurred');
    }
  }

  @Get('/dropdown')
  async findAll() {
    try {
      Logger.log('/getdropdown');
      const res = await this.favoriteService.findAll();
      Logger.log(res);
      return res;
    } catch (ex) {
      Logger.error(ex);
      throw new InternalServerErrorException('An unexpected error occurred');
    }
  }
}
