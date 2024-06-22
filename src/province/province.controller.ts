import { Controller, Get, InternalServerErrorException } from '@nestjs/common';
import { ProvinceService } from './province.service';

@Controller('province')
export class ProvinceController {
  constructor(private readonly provinceService: ProvinceService) {}

  @Get('/dropdown')
  findAll() {
    try {
      return this.provinceService.findAll();
    } catch (ex) {
      throw new InternalServerErrorException('An unexpected error occurred');
    }
  }
}
