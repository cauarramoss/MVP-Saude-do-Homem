import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Nutrition } from './Entity/nutrition.entity';
import { Repository } from 'typeorm';
import { CreateNutritionDto } from './dto/create-nutrition.dto';
import { UpdateNutritionDto } from './dto/update-nutrition.dto';

@Injectable()
export class NutritionService {
    constructor( 
        @InjectRepository(Nutrition)
        private readonly nutritionRepository: Repository<Nutrition>,
    ) {}

    create(data: CreateNutritionDto) {
        const item = this.nutritionRepository.create(data);
        return this.nutritionRepository.save(item);
    }

    findAll(){
        return this.nutritionRepository.find();
    }

    async findOne(id: number) {
        const item = await this.nutritionRepository.findOne({
            where: { id },
        });
        if (!item) {
            throw new NotFoundException(`Nutrition #${id} not found`);
        }
        return item;
    }

    async update(id: number, data: UpdateNutritionDto) {
        const item = await this.findOne(id);
        this.nutritionRepository.merge(item, data);
        return this.nutritionRepository.save(item);
    }

    async remove(id: number) {
        const item = await this.findOne(id);
        return this.nutritionRepository.remove(item);
    }
}
