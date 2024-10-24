import { Controller, Get, Post, Body, Param, Patch, Delete } from '@nestjs/common';
import { MeasurementService } from './measurement.service';
import { CreateMeasurementDto } from './dto/create-measurement.dto';
import { UpdateMeasurementDto } from './dto/update-measurement.dto';

@Controller('measurements')
export class MeasurementController {
    constructor(private readonly measurementService: MeasurementService) { }

    @Get()
    async findAll() {
        return this.measurementService.findAll();
    }

    @Get(':id')
    async findOne(@Param('id') id: string) {
        return this.measurementService.findOne(+id);
    }

    @Post()
    async create(@Body() createMeasurementDto: CreateMeasurementDto) {
        return this.measurementService.create(createMeasurementDto);
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
