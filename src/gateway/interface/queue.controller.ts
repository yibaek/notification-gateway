import { Body, Controller, Inject, Post } from '@nestjs/common';
import { GatewayService } from '../application/gateway.service';
import { PubsubRequestDto } from '../../provider/queue/domain/pubsub/interface/pubsub.request.dto';
import { PubsubGetCommand } from '../../provider/queue/domain/pubsub/application/command/pubsub-get.command';
import { NotifyRequestDto } from './dto/notify.request.dto';
import { NotifyInfoMapper } from '../application/info/notify.info.mapper';
import { NotifyResponseDto } from './dto/notify.response.dto';
import { QueueCommandMapper } from '../../provider/queue/application/command/queue.command.mapper';
import { QueueService } from '../../provider/queue/application/queue.service';
import { NotifyCommandMapper } from '../application/command/notify.command.mapper';
import { NotifyCommand } from '../application/command/notify.command';

@Controller('gateway/queue')
export class QueueController {
  constructor(
    @Inject(QueueService)
    private readonly queueService: QueueService,
    @Inject(GatewayService)
    private readonly gatewayService: GatewayService,
  ) {}

  @Post()
  async notify(@Body() body: PubsubRequestDto.Body) {
    try {
      // 큐(pubsub) 메시지를 커맨드로 변환
      const command = QueueCommandMapper.of(PubsubGetCommand.Body, body);

      // 큐(pubsub) 커맨드를 알림 메시지 구조로 변환
      const messages =
        this.queueService.get<NotifyRequestDto.Messages>(command);

      // 각 알림 타입별로 알림 메시지 전송
      const info = await this.gatewayService.notify(
        NotifyCommandMapper.of(NotifyCommand.Messages, messages),
      );

      return NotifyInfoMapper.of(NotifyResponseDto.Body, info);
    } catch (e) {
      console.error(`QueueController/notify()`, e);
      return true;
    }
  }
}
