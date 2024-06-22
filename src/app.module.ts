import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { CustomerModule } from './customer/customer.module';
import { ProvinceModule } from './province/province.module';
import { FavoriteModule } from './favorite/favorite.module';

@Module({
  imports: [CustomerModule, ProvinceModule, FavoriteModule],
  controllers: [AppController],
  providers: [],
})
export class AppModule {}
