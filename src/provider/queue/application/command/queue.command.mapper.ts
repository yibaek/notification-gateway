import { ClassConstructor, plainToInstance } from 'class-transformer';
import { QueueRequestDto } from '../../interface/dto/queue.request.dto';
import { QueueGetCommand } from './queue-get.command';
import { QueuePublishCommand } from './queue-publish.command';
import { QueueSubscriptionCommand } from './queue-subscription.command';

export namespace QueueCommandMapper {
  export function of(
    to: ClassConstructor<QueueGetCommand.Body>,
    from: QueueRequestDto.Body,
  ): QueueGetCommand.Body;

  export function of(
    to: ClassConstructor<QueuePublishCommand.Body>,
    from: Record<string, any>,
  ): QueuePublishCommand.Body;

  export function of(
    to: ClassConstructor<QueueSubscriptionCommand.Body>,
    from: Record<string, any>,
  ): QueueSubscriptionCommand.Body;

  export function of(to: any, from: any): any {
    return plainToInstance(to, from, {
      excludeExtraneousValues: true,
    });
  }
}
