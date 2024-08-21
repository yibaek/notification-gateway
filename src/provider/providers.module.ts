import { Module } from '@nestjs/common';
import { PubsubModule } from './queue/domain/pubsub/pubsub.module';

@Module({
  imports: [PubsubModule],
  providers: [],
  exports: [PubsubModule],
})
export class ProvidersModule {}
