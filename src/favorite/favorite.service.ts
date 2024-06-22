import { Injectable } from '@nestjs/common';
import { CreateFavoriteDto, FavoriteDropdown } from './favorite.dto';
import { PrismaService } from 'src/utils/prisma.service';

@Injectable()
export class FavoriteService {
  constructor(private prismaService: PrismaService) {}
  create(createFavoriteDto: CreateFavoriteDto) {
    return 'This action adds a new favorite';
  }

  async findAll(): Promise<FavoriteDropdown[]> {
    return (await this.prismaService.favorite.findMany()).map((x) => {
      return { id: x.favorite_id, value: x.favorite_name };
    });
  }
}
