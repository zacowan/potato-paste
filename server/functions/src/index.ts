import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';
import * as express from 'express';

admin.initializeApp();

const db = admin.firestore();

const app = express();

app.post('/pastes', async (req, res) => {
  const potatoId = req.body.potatoId.toString();
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
    data: { id: doc.id },
  });
});

app.post('/potatoes', async (req, res) => {
  const doc = await db.collection('potatoes').add({
    createdAt: Date.now(),
  });

  res.status(200).json({
    message: 'Successfully generated new potato.',
    data: { id: doc.id },
  });
});

app.get('/potatoes/:id', async (req, res) => {
  const id = req.params.id;

  if (!!!id) {
    res.status(400).json({ message: 'Request body is invalid.' });
  }

  const doc = await db.collection('potatoes').doc(id).get();

  const data = doc.data();

  res.json({ data: data });
});

app.get('/potatoes/:id/pastes', async (req, res) => {
  const id = req.params.id;

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

  res.json({ data: ret });
});

exports.app = functions.https.onRequest(app);