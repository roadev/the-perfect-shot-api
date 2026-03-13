import { Module } from '@nestjs/common';
import { CelestialEventsService } from './celestial-events.service';
import { CelestialEventsController } from './celestial-events.controller';
import { AuthModule } from '../auth/auth.module';

@Module({
  imports: [AuthModule],
  providers: [CelestialEventsService],
  controllers: [CelestialEventsController],
  exports: [CelestialEventsService],
})
export class CelestialEventsModule {}
