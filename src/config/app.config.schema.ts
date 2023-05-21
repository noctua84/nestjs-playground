import Joi, { ObjectSchema } from 'joi';

export const validationSchema: ObjectSchema = Joi.object({
  app: {
    name: Joi.string().default('MediQuiz-Backend'),
    version: Joi.string().default('1.0.0'),
    description: Joi.string().default('MediQuiz-Backend API'),
    host: Joi.string().default('localhost'),
    port: Joi.number().default(3000),
  },
  logging: {
    global: {
      level: Joi.string().default('info'),
      time_format: Joi.string().default('YYYY-MM-DD HH:mm:ss'),
      colorize: Joi.boolean().default(true),
      pretty_print: Joi.boolean().default(true),
    },
    console: {
      enable: Joi.boolean().default(true),
      level: Joi.string().default('info'),
    },
    server: {
      level: Joi.string().default('warning'),
      collection: Joi.string().default('server-logs'),
      store_host: Joi.boolean().default(true),
      file: Joi.string().default('server-logs.log'),
    },
    crash: {
      enable: Joi.boolean().default(true),
      level: Joi.string().default('error'),
      collection: Joi.string().default('server-crash-logs'),
      store_host: Joi.boolean().default(true),
      file: Joi.string().default('server-crashes.log'),
    },
    rejection: {
      enable: Joi.boolean().default(true),
      level: Joi.string().default('error'),
      collection: Joi.string().default('server-promis-rejection-logs'),
      store_host: Joi.boolean().default(true),
      file: Joi.string().default('server-promis-rejections.log'),
    },
    access: {
      level: Joi.string().default('info'),
      collection: Joi.string().default('server-access-logs'),
      store_host: Joi.boolean().default(true),
      file: Joi.string().default('access.log'),
    },
    transports: {
      sentry: {
        enable: Joi.boolean().default(false),
      },
      elasticsearch: {
        enable: Joi.boolean().default(false),
      },
      mongodb: {
        enable: Joi.boolean().default(false),
      },
    },
  },
  database: {
    postgres: {
      enable: Joi.boolean().default(true),
      host: Joi.string().default('localhost'),
      port: Joi.number().default(5432),
      database: Joi.string().required(),
      user: Joi.string().default('postgres'),
      password: Joi.string().default('postgres'),
    },
    mongodb: {
      enable: Joi.boolean().default(true),
      uri: Joi.string().required(),
    },
  },
  sentry: {
    dsn: Joi.string().default(''),
    sample_rate: Joi.number().default(1),
    max_breadcrumbs: Joi.number().default(100),
    debug: Joi.boolean().default(false),
    environment: Joi.string(),
    release: Joi.string(),
    server_name: Joi.string(),
    log_level: Joi.string().default('error'),
  },
  metrics: {
    enable: Joi.boolean().default(true),
  },
  swagger: {
    enable: Joi.boolean().default(true),
  },
  health: {
    enable: Joi.boolean().default(true),
  },
});
