import { Controller, Post, Get, Patch, Delete, Body, Param, UseGuards } from '@nestjs/common';
import { NutritionService } from './nutrition.service';
import { CreateNutritionDto } from './dto/create-nutrition.dto';
import { UpdateNutritionDto } from './dto/update-nutrition.dto';
import { AuthGuard } from '@nestjs/passport';

@Controller('nutrition')
export class NutritionController {
  constructor(private service: NutritionService) {}

  @Post()
  @UseGuards(AuthGuard('jwt'))
  create(@Body() body: CreateNutritionDto) {
    return this.service.create(body);
  }

  @Get()
  findAll() {
    return this.service.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.service.findOne(Number(id));
  }

  @Patch(':id')
  @UseGuards(AuthGuard('jwt'))
  update(@Param('id') id: string, @Body() body: UpdateNutritionDto) {
    return this.service.update(Number(id), body);
  }

  @Delete(':id')
  @UseGuards(AuthGuard('jwt'))
  delete(@Param('id') id: string) {
    return this.service.remove(Number(id));
  }
}
