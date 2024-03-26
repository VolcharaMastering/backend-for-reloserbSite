require('dotenv').config();
import express, { Express, Request, Response } from 'express';
import mongoose from 'mongoose';
import { errors } from 'celebrate';
import helmet from 'helmet';
import cors from 'cors';
import config from './config';
import rateLimit from 'express-rate-limit';
import notFound from './src/errors/notFound';
import errorHandler from './src/middlewares/errorHandler';
import router from './src/routes';

const { PROJ_PORT_DEV = 3000, PROJ_PORT_PROD = 3044 } = process.env;
const environment = process.env.NODE_ENV || 'development';
const dbConfig = environment === 'production' ? config.production.db : config.development.db;
const portConfig = environment === 'production' ? PROJ_PORT_PROD : PROJ_PORT_DEV;
const connectionString = `mongodb://${dbConfig.host}:${dbConfig.port}/${dbConfig.name}`;

const app: Express = express();

app.use(rateLimit);
app.use(cors());
app.use(express.json());
app.use(helmet());


app.use(router);

app.use('*', (req, res, next) => {
  next(notFound('Page not found'));
});

app.use(errors());
app.use(errorHandler);

async function connect() {
  try {
    await mongoose.connect(connectionString, { });
    const db = mongoose.connection;
    db.on('error', console.error.bind(console, 'MongoDB connection error:'));
    db.once('open', () => {
      console.log('Connected to MongoDB successfully!');
    });
    app.listen(portConfig, () => {
      console.log(`connected! on port ${portConfig}`);
    });
  } catch (error) {
    console.error('Error connecting to MongoDB:', error);
    process.exit(1);
  }
}

connect();

