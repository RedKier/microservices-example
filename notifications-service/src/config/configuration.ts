import { cleanEnv, num, str } from 'envalid';

export const validateEnv = () => {
  return cleanEnv(process.env, {
    KAFKA_PORT: num(),
    KAFKA_GROUP_ID: str(),
    KAFKA_HOST: str(),
    KAFKA_CLIENT_ID: str(),
    KAFKA_SERVICE: str(),
    PORT: num({ default: 3003 }),
  });
};

export default () => {
  const env = validateEnv();

  return {
    server: {
      port: env.PORT,
    },
    kafka: {
      serviceName: env.KAFKA_SERVICE,
      clientId: env.KAFKA_CLIENT_ID,
      groupId: env.KAFKA_GROUP_ID,
      host: env.KAFKA_HOST,
      port: env.KAFKA_PORT,
    },
  };
};
