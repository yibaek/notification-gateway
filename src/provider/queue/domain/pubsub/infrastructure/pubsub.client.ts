import { PubSub } from '@google-cloud/pubsub';
import { PubsubConfig } from './pubsub.config';

export namespace PubsubClient {
  export class Client {
    private readonly config: PubsubConfig.Config;
    private client: PubSub | undefined;

    constructor(config: PubsubConfig.Config) {
      this.config = config;
    }

    public getClient(): PubSub {
      if (!this.client) {
        if (this.config.getEmulatorMode()) {
          this.client = new PubSub({
            projectId: this.config.getProjectId(),
            apiEndpoint: this.config.getApiEndpoint(),
          });
        } else {
          this.client = new PubSub({ projectId: this.config.getProjectId() });
        }
      }

      return this.client;
    }
  }
}
