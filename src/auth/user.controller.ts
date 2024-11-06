// user.controller.ts
import { Controller, Get, Post, Body, Param, Patch, Delete, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { LoginDto } from './dto/login.dto';
import { JwtAuthGuard } from './jwt-auth.guard';

@Controller('users')
export class UserController {
    constructor(private readonly userService: UserService) {}

    @Post()
    async create(@Body() createUserDto: CreateUserDto) {
        const user = await this.userService.create(createUserDto);
        return { user };
    }

    @Post('login')
    async login(@Body() loginDto: LoginDto) {
        return this.userService.login(loginDto);
    }

    @UseGuards(JwtAuthGuard)
    @Get()
    async findAll() {
        const users = await this.userService.findAll();
        return { users };
    }

    @UseGuards(JwtAuthGuard)
    @Get(':id')
    async findOne(@Param('id') id: string) {
        const user = await this.userService.findOne(+id);
        return { user };
    }

    @UseGuards(JwtAuthGuard)
    @Patch(':id')
    async update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
        const updatedUser = await this.userService.update(+id, updateUserDto);
        return { user: updatedUser };
    }

    @UseGuards(JwtAuthGuard)
    @Delete(':id')
    async remove(@Param('id') id: string) {
        await this.userService.remove(+id);
        return { message: 'Usuário removido com sucesso.' };
    }
}
