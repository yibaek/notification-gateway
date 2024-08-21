import { PubsubGetCommand } from './command/pubsub-get.command';
import { Injectable } from '@nestjs/common';
import { PubsubError } from '../exception/pubsub.error';
import { PubsubClient } from '../infrastructure/pubsub.client';
import { PubsubTopic } from '../infrastructure/pubsub.topic';
import { PubsubService } from './pubsub.service';
import { QueuePublishInfo } from '../../../application/info/queue-publish.info';
import { QueueSubscriptionCommand } from '../../../application/command/queue-subscription.command';
import { QueueSubscriptionInfo } from '../../../application/info/queue-subscription.info';
import { PubsubPublishCommand } from './command/pubsub-publish.command';
import { PubsubPublishInfo } from './info/pubsub-publish.info';
import { PubsubSubscriptionInfo } from './info/pubsub-subscription.info';
import { PubsubConfig } from '../infrastructure/pubsub.config';

@Injectable()
export class PubsubServiceImpl implements PubsubService {
  private config: PubsubConfig.Config;
  private pubsubClient: PubsubClient.Client | undefined = undefined;
  private pubsubTopic: PubsubTopic.Topic | undefined = undefined;

  setConfig(config: PubsubConfig.Config) {
    this.config = config;
  }

  get<T>(command: PubsubGetCommand.Body): T {
    try {
      return JSON.parse(
        Buffer.from(command.getMessage().getData(), 'base64').toString('utf8'),
      );
    } catch (e) {
      console.error(`An error occurred while parsing the pubsub message.`, e);
      throw new PubsubError.MessageParseError();
    }
  }

  async publish(
    command: PubsubPublishCommand.Body,
  ): Promise<QueuePublishInfo.Body> {
    try {
      await this.getPubsubTopic().publishMessage(
        command.getTopic(),
        Buffer.from(JSON.stringify(command.getMessage())),
      );

      return new PubsubPublishInfo.Body();
    } catch (e) {
      console.error(`An error occurred while publish the pubsub message.`, e);
      throw new PubsubError.MessagePublishError();
    }
  }

  async subscription(
    command: QueueSubscriptionCommand.Body,
  ): Promise<QueueSubscriptionInfo.Body> {
    return new PubsubSubscriptionInfo.Body();
  }

  private getPubsubClient() {
    if (this.pubsubClient === undefined) {
      this.pubsubClient = new PubsubClient.Client(this.config);
    }

    return this.pubsubClient;
  }

  private getPubsubTopic() {
    if (this.pubsubTopic === undefined) {
      this.pubsubTopic = new PubsubTopic.Topic(this.getPubsubClient());
    }

    return this.pubsubTopic;
  }
}
