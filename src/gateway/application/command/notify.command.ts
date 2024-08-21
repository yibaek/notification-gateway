import { Expose, Type } from 'class-transformer';
import { NotificationEnum } from '../../enum/notification.enum';

export namespace NotifyCommand {
  export class Trace {
    @Expose()
    private readonly id: string;
  }

  export class Property {
    @Expose()
    private readonly environment: string;

    @Expose()
    private readonly version: number;

    @Expose()
    @Type(() => Trace)
    private readonly trace: Trace;

    @Expose()
    private readonly payload: Array<Record<any, any>>;
  }

  export class Message {
    @Expose()
    private readonly type: NotificationEnum.NotificationType;

    @Expose()
    @Type(() => Property)
    private readonly property: Property;

    getType() {
      return this.type;
    }

    getProperty() {
      return this.property;
    }
  }

  export class Messages {
    @Expose()
    @Type(() => Message)
    private readonly messages: Array<Message>;

    getMessages() {
      return this.messages;
    }
  }
}
