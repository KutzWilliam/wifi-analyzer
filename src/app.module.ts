import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Measurement } from './measurement/measurement.entity';
import { MeasurementModule } from './measurement/measurement.module';
import { User } from './auth/user.entity';
import { UserModule } from './auth/user.module';


@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: '1234',
      database: 'analyzer',
      entities: [Measurement, User],
      synchronize: true,
    }),
    MeasurementModule,
    UserModule
  ],
})
export class AppModule { }
