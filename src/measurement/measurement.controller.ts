// measurement.controller.ts
import { Controller, Get, Post, Body, Param, Patch, Delete, UseGuards, Request } from '@nestjs/common';
import { MeasurementService } from './measurement.service';
import { CreateMeasurementDto } from './dto/create-measurement.dto';
import { UpdateMeasurementDto } from './dto/update-measurement.dto';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';

@Controller('measurements')
@UseGuards(JwtAuthGuard) 
export class MeasurementController {
    constructor(private readonly measurementService: MeasurementService) {}

    @Get()
    async findAll() {
        return this.measurementService.findAll();
    }

    @Get(':id')
    async findOne(@Param('id') id: string) {
        return this.measurementService.findOne(+id);
    }

    @Post()
    async create(@Body() createMeasurementDto: CreateMeasurementDto, @Request() req) {
        const userId = req.user.userId;

        const measurementWithUser = { ...createMeasurementDto, userId };
        return this.measurementService.create(measurementWithUser);
    }

    @Patch(':id')
    async update(@Param('id') id: string, @Body() updateMeasurementDto: UpdateMeasurementDto) {
        return this.measurementService.update(+id, updateMeasurementDto);
    }

    @Delete(':id')
    async remove(@Param('id') id: string) {
        return this.measurementService.remove(+id);
    }
}
