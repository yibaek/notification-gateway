import { Global, Module } from '@nestjs/common';
import { PubsubServiceImpl } from './application/pubsub.service.impl';
import { PubsubService } from './application/pubsub.service';

@Global()
@Module({
  providers: [{ provide: PubsubService, useClass: PubsubServiceImpl }],
  exports: [PubsubService],
})
export class PubsubModule {}
