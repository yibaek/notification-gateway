import { QueueService } from '../../../application/queue.service';

export const PubsubService = Symbol('PubsubService');

export interface PubsubService extends QueueService {}
