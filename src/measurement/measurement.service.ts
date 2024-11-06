import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Measurement } from './measurement.entity';
import { CreateMeasurementDto } from './dto/create-measurement.dto';
import { UpdateMeasurementDto } from './dto/update-measurement.dto';
import { User } from 'src/auth/user.entity';

@Injectable()
export class MeasurementService {
    constructor(
        @InjectRepository(Measurement)
        private measurementRepository: Repository<Measurement>,

        @InjectRepository(User)
        private userRepository: Repository<User>,
    ) { }

    async create(createMeasurementDto: CreateMeasurementDto): Promise<Measurement> {
        const { userId, ...measurementData } = createMeasurementDto;

        const user = await this.userRepository.findOneBy({ id: userId });
        if (!user) {
            throw new Error(`Usuário não encontrado.`);
        }

        const measurement = this.measurementRepository.create({
            ...measurementData,
            user,
        });

        return this.measurementRepository.save(measurement);
    }

    async findAll(userId: number): Promise<Measurement[]> {
        return this.measurementRepository.findBy({ user: { id: userId } });
    }

    async findOne(id: number): Promise<Measurement> {
        return this.measurementRepository.findOneBy({ id });
    }

    async update(id: number, updateMeasurementDto: UpdateMeasurementDto): Promise<Measurement> {
        await this.measurementRepository.update(id, updateMeasurementDto);
        return this.findOne(id);
    }

    async remove(id: number): Promise<void> {
        await this.measurementRepository.delete(id);
    }
}
