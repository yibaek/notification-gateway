import { HttpStatus } from '@nestjs/common';
import { OutCodeError } from '../common/exception/base.error';

export class InvalidNotificationTypeError extends OutCodeError {
  ////////////////////////////////////////////////
  //  Constructor
  ////////////////////////////////////////////////

  constructor() {
    super('error.bad-request', HttpStatus.BAD_REQUEST);

    this.name = InvalidNotificationTypeError.name;
    Object.setPrototypeOf(this, InvalidNotificationTypeError.prototype);
  }
}
