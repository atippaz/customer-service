import { IsNotEmpty } from 'class-validator';

export class CreateFavoriteDto {
  @IsNotEmpty()
  favoriteName: string;
}
export interface FavoriteDropdown {
  id: number;
  value: string;
}
