import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Measurement } from './measurement/measurement.entity';
import { MeasurementModule } from './measurement/measurement.module';


@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: '1234',
      database: 'analyzer',
      entities: [Measurement],
      synchronize: true,
    }),
    MeasurementModule,
  ],
})
export class AppModule { }
