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
    async findAll(@Request() req) {
        const userId = req.user.userId;
        const measurements = await this.measurementService.findAll(+userId);
        return { measurements };
    }

    @Get(':id')
    async findOne(@Param('id') id: string) {
        const measurement = await this.measurementService.findOne(+id);
        return { measurement };
    }

    @Post()
    async create(@Body() createMeasurementDto: CreateMeasurementDto, @Request() req) {
        const userId = req.user.userId;
        const measurementWithUser = { ...createMeasurementDto, userId };
        const measurement = await this.measurementService.create(measurementWithUser);
        return { measurement }; 
    }

    @Patch(':id')
    async update(@Param('id') id: string, @Body() updateMeasurementDto: UpdateMeasurementDto) {
        const updatedMeasurement = await this.measurementService.update(+id, updateMeasurementDto);
        return { measurement: updatedMeasurement }; 
    }

    @Delete(':id')
    async remove(@Param('id') id: string) {
        await this.measurementService.remove(+id);
        return { message: 'Medição removida com sucesso.' }; 
    }
}
