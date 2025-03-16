import { str, num, cleanEnv } from 'envalid';

export const validateEnv = () => {
  return cleanEnv(process.env, {
    MONGO_DATABASE: str(),
    MONGO_ROOT_USER: str(),
    MONGO_ROOT_PASSWORD: str(),
    MONGO_HOST: str(),
    MONGO_PORT: num(),
    KAFKA_PORT: num(),
    KAFKA_GROUP_ID: str(),
    KAFKA_HOST: str(),
    KAFKA_CLIENT_ID: str(),
    KAFKA_SERVICE: str(),
    PORT: num({ default: 3002 }),
  });
};

export default () => {
  const env = validateEnv();

  return {
    server: {
      port: env.PORT,
    },
    database: {
      name: env.MONGO_DATABASE,
      user: env.MONGO_ROOT_USER,
      password: env.MONGO_ROOT_PASSWORD,
      host: env.MONGO_HOST,
      port: env.MONGO_PORT,
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
