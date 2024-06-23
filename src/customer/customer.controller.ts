import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  InternalServerErrorException,
  Res,
  Logger,
} from '@nestjs/common';
import { type Response } from 'express';
import { CustomerService } from './customer.service';
import * as Excel from 'exceljs';
import {
  CreateCustomerDto,
  FindAllUserDto,
  UpdateCustomerDto,
} from './customer.dto';

@Controller('customer')
export class CustomerController {
  constructor(private readonly customerService: CustomerService) {}

  @Post('/create')
  async create(@Body() createCustomerDto: CreateCustomerDto) {
    try {
      Logger.log(createCustomerDto);
      const res = await this.customerService.create(createCustomerDto);
      Logger.log(res);
      return res;
    } catch (ex) {
      Logger.error(ex);
      throw new InternalServerErrorException('An unexpected error occurred');
    }
  }

  @Post('/getalluser')
  async findAll(@Body() query: FindAllUserDto, @Res() res: Response) {
    try {
      Logger.log(query);
      const result = await this.customerService.findAll(query);
      Logger.log(result);
      return res.status(200).json(result);
    } catch (ex) {
      Logger.error(ex);
      throw new InternalServerErrorException('An unexpected error occurred');
    }
  }

  @Post('/getexcel')
  async excel(@Body() query: FindAllUserDto, @Res() res: Response) {
    try {
      Logger.log('getExcel', query);
      const response = await this.customerService.findAll(query);
      const data = response.data.map((x) => {
        return {
          ชื่อ: x.customerName,
          อายุ: x.customerAge,
          สิ่งที่ชื่นชอบ: x.customerFavorite,
          ที่อยู่: x.customerProvince,
        };
      });
      const workbook = new Excel.Workbook();
      const columns = data.length <= 0 ? [] : Object.keys(data[0]);
      const dataRows = data.map((x) => Object.values(x));
      const border: Partial<Excel.Border> = {
        style: 'thin',
        color: { argb: 'FF000000' },
      };
      const worksheet = workbook.addWorksheet('customer data');
      const allBorder = {
        bottom: border,
        top: border,
        left: border,
        right: border,
      };
      let rowNo = 0;
      const currentRow: Excel.Row = worksheet.getRow(++rowNo);
      currentRow.height = 25;
      columns.forEach((col: string, index: number) => {
        const cell: Excel.Cell = currentRow.getCell(index + 1 + 1);
        cell.value = col;
        cell.font = { size: 16, bold: true };
        cell.border = allBorder;
        cell.alignment = { vertical: 'top' };
      });
      dataRows.forEach((data: string[]) => {
        const dataRow: Excel.Row = worksheet.getRow(++rowNo);
        dataRow.height = 25;
        data.forEach((cellData: string, index: number) => {
          const cell: Excel.Cell = dataRow.getCell(index + 1 + 1);
          cell.value = `${cellData}`.trim();
          cell.font = { size: 16 };
          cell.border = allBorder;
          cell.alignment = { vertical: 'top', horizontal: 'left' };
        });
      });
      worksheet.properties.defaultColWidth = 20;
      worksheet.getColumn(1).width = 3.5;
      worksheet.views = [{ showGridLines: false }];
      const filename = 'customer_data.xlsx';
      res.setHeader(
        'Content-Disposition',
        `attachment; filename="${filename}"`,
      );
      res.contentType(
        'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
      );
      await workbook.xlsx.write(res);
      res.end();
    } catch (ex) {
      Logger.error(ex);
      throw new InternalServerErrorException('An unexpected error occurred');
    }
  }

  @Get('/getuser/:id')
  async findOne(@Param('id') id: string) {
    try {
      Logger.log(id);
      const res = await this.customerService.findOne(+id);
      Logger.log(res);
      return res;
    } catch (ex) {
      Logger.error(ex);
      throw new InternalServerErrorException('An unexpected error occurred');
    }
  }

  @Patch('/update/:id')
  async update(
    @Param('id') id: string,
    @Body() updateCustomerDto: UpdateCustomerDto,
  ) {
    try {
      Logger.log(id, updateCustomerDto);
      const res = await this.customerService.update(+id, updateCustomerDto);
      Logger.log(res);
      return res;
    } catch (ex) {
      Logger.error(ex);
      throw new InternalServerErrorException('An unexpected error occurred');
    }
  }

  @Delete('/delete/:id')
  async remove(@Param('id') id: string) {
    try {
      Logger.log(id);
      const res = await this.customerService.remove(+id);
      Logger.log(res);
      return res;
    } catch (ex) {
      Logger.error(ex);
      throw new InternalServerErrorException('An unexpected error occurred');
    }
  }
}
