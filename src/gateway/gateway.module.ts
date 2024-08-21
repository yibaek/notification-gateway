import { Module } from '@nestjs/common';
import { GatewayServiceImpl } from './application/gateway.service.impl';
import { QueueController } from './interface/queue.controller';
import { GatewayService } from './application/gateway.service';
import { QueueService } from '../provider/queue/application/queue.service';
import { PubsubServiceImpl } from '../provider/queue/domain/pubsub/application/pubsub.service.impl';
import { ApiController } from './interface/api.controller';

@Module({
  imports: [],
  providers: [
    { provide: GatewayService, useClass: GatewayServiceImpl },
    { provide: QueueService, useClass: PubsubServiceImpl },
  ],
  controllers: [QueueController, ApiController],
})
export class GatewayModule {}
