import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MeasurementController } from './measurement.controller';
import { MeasurementService } from './measurement.service';
import { Measurement } from './measurement.entity';

@Module({
    imports: [TypeOrmModule.forFeature([Measurement])],
    controllers: [MeasurementController],
    providers: [MeasurementService],
})
export class MeasurementModule { }
