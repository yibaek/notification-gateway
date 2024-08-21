import { Expose, Type } from 'class-transformer';
import { QueueGetCommand } from '../../../../application/command/queue-get.command';

export namespace PubsubGetCommand {
  export class Message {
    @Expose()
    private readonly publishTime: string;

    @Expose()
    private readonly messageId: string;

    @Expose()
    private readonly data: string;

    @Expose()
    private readonly attributes: any;

    getPublishTime(): string {
      return this.publishTime;
    }

    getMessageId(): string {
      return this.messageId;
    }

    getData(): string {
      return this.data;
    }

    getAttributes(): any {
      return this.attributes;
    }
  }

  export class Body extends QueueGetCommand.Body {
    @Expose()
    private readonly subscription: string;

    @Expose()
    @Type(() => Message)
    private readonly message: Message;

    getSubscription(): string {
      return this.subscription;
    }

    getMessage(): Message {
      return this.message;
    }
  }
}
