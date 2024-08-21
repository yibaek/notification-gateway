import { PubsubClient } from './pubsub.client';
import { Topic as TopicObject } from '@google-cloud/pubsub';

export namespace PubsubTopic {
  export class Topic {
    private readonly client: PubsubClient.Client;
    private topics: Map<string, TopicObject> = new Map();

    constructor(client: PubsubClient.Client) {
      this.client = client;
    }

    public async publishMessage(topic: string, data: any) {
      if (!this.topics.has(topic)) {
        this.addTopic(topic);
      }

      await this.topics.get(topic).publishMessage({ data });
    }

    public addTopic(name: string): void {
      if (!this.topics.has(name)) {
        const topic = this.client.getClient().topic(name);
        this.topics.set(name, topic);
      }
    }
  }
}
