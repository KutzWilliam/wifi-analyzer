import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Measurement } from './measurement.entity';
import { CreateMeasurementDto } from './dto/create-measurement.dto';
import { UpdateMeasurementDto } from './dto/update-measurement.dto';

@Injectable()
export class MeasurementService {
    constructor(
        @InjectRepository(Measurement)
        private measurementRepository: Repository<Measurement>,
    ) { }

    async findAll(): Promise<Measurement[]> {
        return this.measurementRepository.find();
    }

    async findOne(id: number): Promise<Measurement> {
        return this.measurementRepository.findOneBy({ id });
    }

    async create(createMeasurementDto: CreateMeasurementDto): Promise<Measurement> {
        const measurement = this.measurementRepository.create(createMeasurementDto);
        return this.measurementRepository.save(measurement);
    }

    async update(id: number, updateMeasurementDto: UpdateMeasurementDto): Promise<Measurement> {
        await this.measurementRepository.update(id, updateMeasurementDto);
        return this.findOne(id);
    }

    async remove(id: number): Promise<void> {
        await this.measurementRepository.delete(id);
    }
}
