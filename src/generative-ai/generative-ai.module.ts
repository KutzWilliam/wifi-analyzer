import { Module } from '@nestjs/common';
import { GenerativeAiController } from './generative-ai.controller';
import { GenerativeAiService } from './generative-ai.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Measurement } from 'src/measurement/measurement.entity';
import { User } from 'src/auth/user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Measurement, User])],
  controllers: [GenerativeAiController],
  providers: [GenerativeAiService]
})
export class GenerativeAiModule {}
