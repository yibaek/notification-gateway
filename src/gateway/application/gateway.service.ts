import { NotifyCommand } from './command/notify.command';
import { NotifyInfo } from './info/notify.info';

export const GatewayService = Symbol('GatewayService');

export interface GatewayService {
  notify(command: NotifyCommand.Messages): Promise<NotifyInfo.Body>;
}
