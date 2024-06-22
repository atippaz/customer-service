import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/utils/prisma.service';
import { ProvinceDropdown } from './province.dto';

@Injectable()
export class ProvinceService {
  constructor(private prismaService: PrismaService) {}
  async findAll(): Promise<ProvinceDropdown[]> {
    return (await this.prismaService.province.findMany()).map((x) => {
      return {
        id: x.province_id,
        value: x.province_name,
      };
    });
  }
}
