import { Expose, Type } from 'class-transformer';
import { QueueRequestDto } from '../../../interface/dto/queue.request.dto';

export namespace PubsubRequestDto {
  export class Message {
    @Expose()
    private readonly publishTime: string;

    @Expose()
    private readonly messageId: string;

    @Expose()
    private readonly data: string;

    @Expose()
    private readonly attributes: any;
  }

  export class Body extends QueueRequestDto.Body {
    @Expose()
    private readonly subscription: string;

    @Expose()
    @Type(() => Message)
    private readonly message: Message;
  }
}
