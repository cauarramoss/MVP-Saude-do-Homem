import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './Entity/user.entity';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import * as bcrypt from 'bcryptjs';

@Injectable()
export class UsersService {
    constructor(@InjectRepository(User)
    private repositorio: Repository<User>,
) {}

    async create(data: CreateUserDto) {
        const hashed = await bcrypt.hash(data.password, 10);
        const user = this.repositorio.create({
            name: data.name,
            username: data.username,
            email: data.email,
            password: hashed,
            height: data.height,
            weight: data.weight,
            age: data.age,
        });
        return this.repositorio.save(user);
    }

    async findByEmail(email: string) {
    return this.repositorio.findOne({ where: { email} });
}

    async findAll() {
        return this.repositorio.find();
    }

    async findOne(id: number) {
        return this.repositorio.findOne({ where: { id } });
    }

    async update(id: number, data: UpdateUserDto) {
        const user = await this.findOne(id);
        if (!user) return null;
        if (data.password) {
            data.password = await bcrypt.hash(data.password, 10);
        }
        this.repositorio.merge(user, data);
        return this.repositorio.save(user);
    }

    async remove(id: number) {
        const user = await this.findOne(id);
        if (!user) return null;
        return this.repositorio.remove(user);
    }
}

