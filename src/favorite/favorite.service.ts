import { Injectable } from '@nestjs/common';
import { CreateFavoriteDto, FavoriteDropdown } from './favorite.dto';
import { PrismaService } from 'src/utils/prisma.service';

@Injectable()
export class FavoriteService {
  constructor(private prismaService: PrismaService) {}
  async create(name: string) {
    const favorite_id = await this.prismaService.$transaction(
      async (prisma) => {
        const { favorite_id } = await prisma.favorite.create({
          data: {
            favorite_name: name,
          },
          select: {
            favorite_id: true,
          },
        });
        return favorite_id;
      },
    );
    return favorite_id;
  }

  async findAll(): Promise<FavoriteDropdown[]> {
    return (
      await this.prismaService.favorite.findMany({
        orderBy: { favorite_id: 'desc' },
      })
    ).map((x) => {
      return { id: x.favorite_id, value: x.favorite_name };
    });
  }
}
