import { ClassConstructor, plainToInstance } from 'class-transformer';
import { QueueResponseDto } from '../../interface/dto/queue.response.dto';
import { QueuePublishInfo } from './queue-publish.info';
import { QueueSubscriptionInfo } from './queue-subscription.info';

export namespace QueueInfoMapper {
  export function of(
    to: ClassConstructor<QueueResponseDto.Body>,
    from: QueuePublishInfo.Body,
  ): QueueResponseDto.Body;

  export function of(
    to: ClassConstructor<QueueResponseDto.Body>,
    from: QueueSubscriptionInfo.Body,
  ): QueueResponseDto.Body;

  export function of(to: any, from: any): any {
    return plainToInstance(to, from, {
      excludeExtraneousValues: true,
    });
  }
}
