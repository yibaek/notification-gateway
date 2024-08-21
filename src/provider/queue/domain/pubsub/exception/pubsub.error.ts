import { HttpStatus } from '@nestjs/common';
import { QueueError } from '../../../exception/queue.error';

export namespace PubsubError {
  export class MessageParseError extends QueueError.BaseError {
    ////////////////////////////////////////////////
    //  Constructor
    ////////////////////////////////////////////////

    constructor(data = {}) {
      super(
        'Failed to parse pubsub message.',
        HttpStatus.BAD_REQUEST,
        false,
        {},
        data,
      );

      this.name = MessageParseError.name;
      Object.setPrototypeOf(this, MessageParseError.prototype);
    }
  }

  export class MessagePublishError extends QueueError.BaseError {
    ////////////////////////////////////////////////
    //  Constructor
    ////////////////////////////////////////////////

    constructor(data = {}) {
      super(
        'Failed to publish pubsub message.',
        HttpStatus.BAD_REQUEST,
        false,
        {},
        data,
      );

      this.name = MessageParseError.name;
      Object.setPrototypeOf(this, MessageParseError.prototype);
    }
  }

  export class NotFoundTopicError extends QueueError.BaseError {
    ////////////////////////////////////////////////
    //  Constructor
    ////////////////////////////////////////////////

    constructor(data = {}) {
      super(
        'Not found the topic in topic list',
        HttpStatus.BAD_REQUEST,
        false,
        {},
        data,
      );

      this.name = MessageParseError.name;
      Object.setPrototypeOf(this, MessageParseError.prototype);
    }
  }
}
