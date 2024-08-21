import { registerAs } from '@nestjs/config';

export default registerAs(
  'gcp',
  () =>
    ({
      pubsub: {
        local: {
          host: 'http://localhost:8085',
        },
        notification: {
          email: {
            topic: process.env.GCP_PUBSUB_NOTIFICATION_EMAIL_TOPIC,
          },
          inPlatform: {
            topic: process.env.GCP_PUBSUB_NOTIFICATION_INPLATFORM_TOPIC,
          },
        },
      },
      projectId: process.env.GCP_CONFIG_PROJECT_ID,
    }) as const,
);
