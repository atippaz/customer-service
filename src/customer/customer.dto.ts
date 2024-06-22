import { PartialType } from '@nestjs/mapped-types';
export class CreateCustomerDto {
  customerName: string;
  customerAge: number;
  customerFavorite: number;
  customerProvince: number;
}

export class UpdateCustomerDto extends PartialType(CreateCustomerDto) {}

export class FindAllUserDto {
  readonly page?: number;
  readonly limit?: number;
  readonly search?: string;
  readonly fav?: number[];
  readonly province?: number[];
  readonly age?: {
    min: number;
    max: number;
  };
}
export class CustomerDisplayResult {
  customerName: string;
  customerId: number;
  customerAge: number;
  customerFav: string;
  customerFavId: number;
  customerProvinceId: number;
  customerProvince: string;
}

export class ResultUserAll {
  currentPage: number;
  total: number;
  totalPage: number;
  data: CustomerDisplayResult[];
}
export interface Customer {
  customerName: string;
  customerId: number;
  customerAge: number;
  customerFav: number;
  customerProvince: number;
}
