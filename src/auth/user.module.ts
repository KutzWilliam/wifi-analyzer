import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { User } from './user.entity';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from './jwt.strategy';

@Module({
  imports: [
    TypeOrmModule.forFeature([User]),
    JwtModule.register({
      secret: 'TteowRR6SQxA1xhsDWabxlxnUmuI2ZrekrwOuAUOiwI4qbUzFvJwop9ScMS8xLTv',
      signOptions: { expiresIn: '30m' },
    }),
  ],
  controllers: [UserController],
  providers: [UserService, JwtStrategy],
  exports: [JwtModule, JwtStrategy],
})
export class UserModule {}