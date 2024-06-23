import { BadRequestException, Injectable } from '@nestjs/common';
import {
  CreateCustomerDto,
  Customer,
  FindAllUserDto,
  ResultUserAll,
  UpdateCustomerDto,
} from './customer.dto';
import { PrismaService } from 'src/utils/prisma.service';

@Injectable()
export class CustomerService {
  constructor(private prismaService: PrismaService) {}
  async create(createCustomerDto: CreateCustomerDto) {
    createCustomerDto.customerAge = +createCustomerDto.customerAge;
    if (createCustomerDto.customerAge <= 0) throw new BadRequestException();
    const newUserId = await this.prismaService.$transaction(async (prisma) => {
      const { customer_id } = await prisma.customer.create({
        data: {
          customer_age: createCustomerDto.customerAge,
          customer_name: createCustomerDto.customerName,
          customer_favorite: createCustomerDto.customerFavorite,
          customer_province: createCustomerDto.customerProvince,
        },
        select: {
          customer_id: true,
        },
      });
      return customer_id;
    });
    return newUserId;
  }

  async findAll(query: FindAllUserDto): Promise<ResultUserAll> {
    const page = query.page;
    const limit = query.limit;
    const skip = (page - 1) * limit;

    const whereConditions = {
      ...(query.fav &&
        query.fav.length && { customer_favorite: { in: query.fav } }),
      ...(query.province &&
        query.province.length && { customer_province: { in: query.province } }),
      ...(query.search && { customer_name: { contains: query.search } }),
      ...(query.age && {
        AND: [
          {
            ...(query.age.min && {
              customer_age: {
                gte: query.age.min,
              },
            }),
          },
          {
            ...(query.age.max && {
              customer_age: {
                lte: query.age.max,
              },
            }),
          },
        ],
      }),
    };
    const [total, customers] = await Promise.all([
      this.prismaService.customer.count({ where: whereConditions }),
      this.prismaService.customer.findMany({
        orderBy: {
          customer_id: 'desc',
        },
        where: whereConditions,
        skip,
        ...(limit && { take: limit }),
        include: {
          favorite: true,
          province: true,
        },
      }),
    ]);
    const totalPage = !limit ? page : Math.ceil(total / limit);
    const currentPage = page > totalPage ? totalPage : page;
    return {
      currentPage: currentPage,
      data: customers.map((x) => {
        return {
          customerAge: x.customer_age,
          customerFavorite: x.favorite.favorite_name,
          customerId: x.customer_id,
          customerName: x.customer_name,
          customerProvince: x.province.province_name,
          customerFavoriteId: x.favorite.favorite_id,
          customerProvinceId: x.province.province_id,
        };
      }),
      total,
      totalPage,
    };
  }

  async findOne(id: number): Promise<Customer> {
    const res = await this.prismaService.customer.findFirstOrThrow({
      where: { customer_id: id },
    });
    return {
      customerAge: res.customer_age,
      customerFavorite: res.customer_favorite,
      customerId: res.customer_id,
      customerName: res.customer_name,
      customerProvince: res.customer_province,
    };
  }

  async update(id: number, updateCustomerDto: UpdateCustomerDto) {
    updateCustomerDto.customerAge = +updateCustomerDto.customerAge;
    if (updateCustomerDto.customerAge <= 0) throw new BadRequestException();
    const customer_id = await this.prismaService.$transaction(
      async (prisma) => {
        const { customer_id } = await prisma.customer.update({
          where: {
            customer_id: id,
          },
          data: {
            ...(updateCustomerDto.customerAge && {
              customer_age: updateCustomerDto.customerAge,
            }),
            ...(updateCustomerDto.customerFavorite && {
              customer_favorite: updateCustomerDto.customerFavorite,
            }),
            ...(updateCustomerDto.customerProvince && {
              customer_province: updateCustomerDto.customerProvince,
            }),
            ...(updateCustomerDto.customerName && {
              customer_name: updateCustomerDto.customerName,
            }),
          },
          select: {
            customer_id: true,
          },
        });
        return customer_id;
      },
    );
    return customer_id;
  }

  async remove(id: number) {
    const res = await this.prismaService.customer.delete({
      where: { customer_id: id },
    });
    console.log(res);
    return true;
  }
}
