import { Controller, Post, Body, Get, Param, Put, Delete, UseGuards } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { plainToInstance } from 'class-transformer';
import { User } from './Entity/user.entity';
import { AuthGuard } from '@nestjs/passport';

@Controller('users')
export class UsersController {
    constructor(private usersService: UsersService) {}

    @Post()
    async create(@Body() Body: CreateUserDto){
        const user = await this.usersService.create(Body);
        return plainToInstance(User, user);
    }

    @Get()
    async getAll() {
        const users = await this.usersService.findAll();
        return plainToInstance(User, users);
    }

    @Get(':id')
    async getOne(@Param('id') id: string) {
        const user = await this.usersService.findOne(Number(id));
        return plainToInstance(User, user);
    }

    @Put(':id')
    @UseGuards(AuthGuard('jwt'))
    async update(@Param('id') id: string, @Body() body: UpdateUserDto) {
        const user = await this.usersService.update(Number(id), body);
        return plainToInstance(User, user);
    }

    @Delete(':id')
    @UseGuards(AuthGuard('jwt'))
    async delete(@Param('id') id: string) {
        return this.usersService.remove(Number(id));
    }
}