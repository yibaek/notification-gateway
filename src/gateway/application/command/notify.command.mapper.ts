import { ClassConstructor, plainToInstance } from 'class-transformer';
import { NotifyCommand } from './notify.command';
import { NotifyRequestDto } from '../../interface/dto/notify.request.dto';

export namespace NotifyCommandMapper {
  export function of(
    to: ClassConstructor<NotifyCommand.Messages>,
    from: NotifyRequestDto.Messages,
  ): NotifyCommand.Messages;

  export function of(to: any, from: any): any {
    return plainToInstance(to, from, {
      excludeExtraneousValues: true,
    });
  }
}
