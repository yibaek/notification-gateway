import { QueueGetCommand } from './command/queue-get.command';
import { QueuePublishCommand } from './command/queue-publish.command';
import { QueueSubscriptionCommand } from './command/queue-subscription.command';
import { QueuePublishInfo } from './info/queue-publish.info';
import { QueueSubscriptionInfo } from './info/queue-subscription.info';
import { QueueConfig } from './queue.config';

export const QueueService = Symbol('QueueService');

export interface QueueService {
  setConfig(config: QueueConfig.Config): void;
  get<T>(command: QueueGetCommand.Body): T;
  publish(command: QueuePublishCommand.Body): Promise<QueuePublishInfo.Body>;
  subscription(
    command: QueueSubscriptionCommand.Body,
  ): Promise<QueueSubscriptionInfo.Body>;
}
