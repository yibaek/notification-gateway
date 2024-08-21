import { GatewayService } from './gateway.service';
import { Inject, Injectable } from '@nestjs/common';
import { NotifyCommand } from './command/notify.command';
import { NotifyInfo } from './info/notify.info';
import { QueueService } from '../../provider/queue/application/queue.service';
import { QueueConfig } from '../../provider/queue/application/queue.config';
import { PubsubConfig } from '../../provider/queue/domain/pubsub/infrastructure/pubsub.config';
import { ConfigType } from '@nestjs/config';
import gcpConfig from '../../config/gcp.config';
import { EnvUtil } from '../../util/env.util';
import { QueueCommandMapper } from '../../provider/queue/application/command/queue.command.mapper';
import { NotificationEnum } from '../enum/notification.enum';
import { PubsubPublishCommand } from '../../provider/queue/domain/pubsub/application/command/pubsub-publish.command';

@Injectable()
export class GatewayServiceImpl implements GatewayService {
  constructor(
    @Inject(gcpConfig.KEY)
    private config: ConfigType<typeof gcpConfig>,
    @Inject(QueueService)
    private readonly queueService: QueueService,
  ) {}

  ////////////////////////////////////////////////
  //  Public Method
  ////////////////////////////////////////////////

  async notify(command: NotifyCommand.Messages): Promise<NotifyInfo.Body> {
    try {
      const messages = command.getMessages();

      // 큐(pubsub) 설정
      this.queueService.setConfig(this.getConfig());

      await Promise.all(
        messages.map(async (message) => {
          await this.queueService.publish(
            QueueCommandMapper.of(PubsubPublishCommand.Body, {
              topic: this.getTopic(message),
              message: message.getProperty(),
            }),
          );
        }),
      );

      return Promise.resolve(undefined);
    } catch (e: any) {
      console.error(`[GatewayService/notify()`, e);
    }
  }

  ////////////////////////////////////////////////
  //  Private Method
  ////////////////////////////////////////////////

  private getConfig(): QueueConfig.Config {
    return new PubsubConfig.Config(this.config.projectId, {
      apiEndpoint: this.config.pubsub.local.host,
      emulatorMode: EnvUtil.isDevelopment(),
    });
  }

  private getTopic(message: NotifyCommand.Message): string {
    if (message.getType() === NotificationEnum.NotificationType.IN_PLATFORM) {
      return this.config.pubsub.notification.inPlatform.topic;
    }

    return this.config.pubsub.notification.email.topic;
  }
}
