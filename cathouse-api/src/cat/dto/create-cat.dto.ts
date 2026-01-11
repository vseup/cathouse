import { IsString, IsNumber, IsEnum, IsOptional, Min } from 'class-validator';
import { CatType } from '../../generated/prisma/enums';

export class CreateCatDto {
  @IsString()
  name: string;

  @IsEnum(CatType)
  type: CatType;

  @IsNumber()
  @Min(0)
  donation: number;

  @IsOptional()
  @IsString()
  donor?: string;
}
