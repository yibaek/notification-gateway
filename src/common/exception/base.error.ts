import { I18nService } from 'nestjs-i18n';

export class OutCodeError extends Error {
  constructor(
    message: string,
    readonly statusCode: number,
    readonly isTranslate = true,
    readonly args = {},
    readonly data = {},
  ) {
    super(message);

    this.name = OutCodeError.name;
    Object.setPrototypeOf(this, OutCodeError.prototype);
  }

  ////////////////////////////////////////////////
  //  Public Method
  ////////////////////////////////////////////////

  public async toJson(i18n: I18nService, lang = 'ko-KR') {
    return {
      status: this.statusCode,
      code: this.name,
      message: this.isTranslate
        ? i18n.translate(this.message, {
            lang,
            args: this.args,
          })
        : this.message,
      data: this.data,
    };
  }
}
