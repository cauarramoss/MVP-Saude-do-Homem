import { IsString, IsNumber, Min } from 'class-validator';

export class CreateNutritionDto {
  @IsString()
  name: string;

  @IsString()
  servingSize: string;

  @IsNumber()
  @Min(0)
  calories: number;

  @IsNumber()
  @Min(0)
  protein: number;

  @IsNumber()
  @Min(0)
  carbs: number;

  @IsNumber()
  @Min(0)
  fat: number;

  @IsNumber()
  @Min(0)
  fiber: number;

  @IsNumber()
  @Min(0)
  sugar: number;

  @IsNumber()
  @Min(0)
  sodium: number;
}