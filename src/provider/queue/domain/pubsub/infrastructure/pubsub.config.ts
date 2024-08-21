import { QueueConfig } from '../../../application/queue.config';

export namespace PubsubConfig {
  export type PubsubConfigOption = {
    apiEndpoint?: string;
    emulatorMode?: boolean;
  };

  export class Config extends QueueConfig.Config {
    private readonly projectId: string;
    private readonly option: PubsubConfigOption;

    constructor(projectId: string, option: PubsubConfigOption) {
      super();
      this.projectId = projectId;
      this.option = option;
    }

    getProjectId() {
      return this.projectId;
    }

    getApiEndpoint() {
      return this.option.apiEndpoint ?? undefined;
    }

    getEmulatorMode() {
      return this.option.emulatorMode ?? false;
    }
  }
}
