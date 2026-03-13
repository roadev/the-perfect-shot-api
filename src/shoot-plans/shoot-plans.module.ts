import { Module } from '@nestjs/common';
import { ShootPlansService } from './shoot-plans.service';
import { ShootPlansController } from './shoot-plans.controller';
import { AuthModule } from '../auth/auth.module';

@Module({
  imports: [AuthModule],
  providers: [ShootPlansService],
  controllers: [ShootPlansController],
  exports: [ShootPlansService],
})
export class ShootPlansModule {}
