import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';
import * as express from 'express';
import * as cors from 'cors';

admin.initializeApp();

const db = admin.firestore();

const app = express();

app.use(cors());

app.post('/potatoes', async (req, res) => {
  const nickname = req.body.nickname;

  const doc = await db.collection('potatoes').add({
    createdAt: Date.now(),
    nickname: nickname ?? '',
  });

  res.status(200).json({
    message: 'Successfully generated new potato.',
    id: doc.id,
  });
});

app.get('/potatoes/:id', async (req, res) => {
  const id = req.params.id.toString();

  if (!!!id) {
    res.status(400).json({ message: 'Request body is invalid.' });
  }

  const doc = await db.collection('potatoes').doc(id).get();

  const data = doc.data();

  res.json(data);
});

app.get('/potatoes/:id/pastes', async (req, res) => {
  const id = req.params.id.toString();

  if (!!!id) {
    res.status(400).json({ message: 'Request body is invalid.' });
  }

  const snap = await db
    .collection('potatoes')
    .doc(id)
    .collection('pastes')
    .get();

  const ret: any[] = [];
  snap.forEach((doc) => ret.push(doc.data()));

  res.json(ret);
});

app.post('/potatoes/:id/pastes', async (req, res) => {
  const potatoId = req.params.id.toString();
  const pasteData = req.body.pasteData;

  if (!!!potatoId || !!!pasteData) {
    res.status(400).json({ message: 'Request body is invalid.' });
  }

  const doc = await db
    .collection('potatoes')
    .doc(potatoId)
    .collection('pastes')
    .add({
      ...pasteData,
      createdAt: Date.now(),
    });

  res.status(200).json({
    message: 'Successfully created new paste.',
    id: doc.id,
  });
});

exports.api = functions.https.onRequest(app);
