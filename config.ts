import dotenv from 'dotenv';
dotenv.config();

const config = {
  development: {
    db: {
      host: process.env.DB_HOST_DEV,
      port: process.env.DB_PORT_DEV,
      name: process.env.DB_NAME_DEV,
    },
    secretKey: process.env.SECRET_KEY_DEV,
  },
  production: {
    db: {
      host: process.env.DB_HOST_PROD,
      port: process.env.DB_PORT_PROD,
      name: process.env.DB_NAME_PROD,
    },
    secretKey: process.env.SECRET_KEY_PROD,
  },
};

export default config;