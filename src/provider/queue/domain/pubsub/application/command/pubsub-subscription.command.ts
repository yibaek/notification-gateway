import { QueueSubscriptionCommand } from '../../../../application/command/queue-subscription.command';

export namespace PubsubSubscriptionCommand {
  export class Body extends QueueSubscriptionCommand.Body {}
}
