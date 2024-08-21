import * as dotenv from 'dotenv';

dotenv.config();

export class EnvUtil {
  private constructor() {}

  static getEnvPath(): string {
    if (EnvUtil.isDevelopment()) {
      return '.env.development';
    } else if (EnvUtil.isTest()) {
      return '.env.test';
    } else {
      return '.env.production';
    }
  }

  static isDevelopment() {
    return ['development'].includes(EnvUtil.getNodeEnv());
  }

  static isTest() {
    return ['test'].includes(EnvUtil.getNodeEnv());
  }

  static isProduction() {
    return ['production'].includes(EnvUtil.getNodeEnv());
  }

  static getNodeEnv() {
    const nodeEnv = process.env.NODE_ENV ?? 'development';
    if (nodeEnv === 'development') {
      return 'development';
    } else if (nodeEnv === 'production') {
      return 'production';
    }

    return 'test';
  }
}
