import { Expose, Type } from 'class-transformer';
import {
  IsArray,
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsString,
} from 'class-validator';
import { NotificationEnum } from '../../enum/notification.enum';

export namespace NotifyRequestDto {
  export class Trace {
    @Expose()
    @IsString()
    @IsNotEmpty()
    private readonly id: string;
  }

  export class Property {
    @Expose()
    @IsString()
    @IsNotEmpty()
    private readonly environment: string;

    @Expose()
    @IsNumber()
    @IsNotEmpty()
    private readonly version: number;

    @Expose()
    @IsNotEmpty()
    @Type(() => Trace)
    private readonly trace: Trace;

    @Expose()
    @IsNotEmpty()
    @IsArray()
    private readonly payload: Array<Record<any, any>>;
  }

  export class Message {
    @Expose()
    @IsNotEmpty()
    @IsEnum(NotificationEnum.NotificationType)
    private readonly type: NotificationEnum.NotificationType;

    @Expose()
    @IsNotEmpty()
    @Type(() => Property)
    private readonly property: Property;
  }

  export class Messages {
    @Expose()
    @IsNotEmpty()
    @IsArray()
    @Type(() => Message)
    private readonly messages: Array<Message>;
  }
}
