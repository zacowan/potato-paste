import * as functions from 'firebase-functions';
import * as express from 'express';
import * as cors from 'cors';
import './setup';

import PotatoRouter from './routes/potatoes';

const app = express();

app.use(cors());

app.use('/potatoes', PotatoRouter);

exports.api = functions.https.onRequest(app);
