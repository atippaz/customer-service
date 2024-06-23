import {
  Controller,
  Get,
  InternalServerErrorException,
  Logger,
} from '@nestjs/common';
import { ProvinceService } from './province.service';

@Controller('province')
export class ProvinceController {
  constructor(private readonly provinceService: ProvinceService) {}

  @Get('/dropdown')
  async findAll() {
    try {
      Logger.log('/getdropdown');
      const res = await this.provinceService.findAll();
      Logger.log(res);
      return res;
    } catch (ex) {
      Logger.error(ex);
      throw new InternalServerErrorException('An unexpected error occurred');
    }
  }
}
