import { ClassConstructor, plainToInstance } from 'class-transformer';
import { NotifyRequestDto } from './notify.request.dto';

export namespace NotifyDtoMapper {
  export function of(
    to: ClassConstructor<NotifyRequestDto.Messages>,
    from: string,
  ): NotifyRequestDto.Messages;

  export function of(to: any, from: any): any {
    return plainToInstance(to, from, {
      excludeExtraneousValues: true,
    });
  }
}
