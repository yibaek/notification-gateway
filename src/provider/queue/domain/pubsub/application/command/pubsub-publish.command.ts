import { QueuePublishCommand } from '../../../../application/command/queue-publish.command';
import { Expose } from 'class-transformer';
import { IsNotEmpty, IsString } from 'class-validator';

export namespace PubsubPublishCommand {
  export class Body extends QueuePublishCommand.Body {
    @Expose()
    @IsString()
    @IsNotEmpty()
    private readonly topic: string;

    @Expose()
    @IsNotEmpty()
    private readonly message: any;

    getTopic() {
      return this.topic;
    }

    getMessage() {
      return this.message;
    }
  }
}
