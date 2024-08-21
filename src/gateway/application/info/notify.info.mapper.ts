import { ClassConstructor, plainToInstance } from 'class-transformer';
import { NotifyResponseDto } from '../../interface/dto/notify.response.dto';
import { NotifyInfo } from './notify.info';

export namespace NotifyInfoMapper {
  export function of(
    to: ClassConstructor<NotifyResponseDto.Body>,
    from: NotifyInfo.Body,
  ): NotifyResponseDto.Body;

  export function of(to: any, from: any): any {
    return plainToInstance(to, from, {
      excludeExtraneousValues: true,
    });
  }
}
