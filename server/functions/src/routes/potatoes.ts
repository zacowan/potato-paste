import { Router } from 'express';
import * as admin from 'firebase-admin';

admin.initializeApp();

const db = admin.firestore();

const router = Router();

router.post('/', async (req, res) => {
  try {
    const nickname = req.body.nickname;

    const newPotato: { createdAt: number; nickname?: string } = {
      createdAt: Date.now(),
    };

    if (!!nickname) {
      newPotato['nickname'] = nickname;
    }

    const doc = await db.collection('potatoes').add(newPotato);

    res.status(200).json({
      message: 'Successfully generated new potato.',
      id: doc.id,
    });
  } catch (error) {
    res.status(500).json({
      message: 'An unexpected error has occurred.',
      error,
    });
  }
});

router.get('/:id', async (req, res) => {
  try {
    const id = req.params.id.toString();

    if (!!!id) {
      res.status(400).json({ message: 'Request body is invalid.' });
    }

    const doc = await db.collection('potatoes').doc(id).get();

    const data = doc.data();

    if (data) {
      res.json(data);
    } else {
      res.status(404).json({ message: 'The requested potato does not exist.' });
    }
  } catch (error) {
    res.status(500).json({
      message: 'An unexpected error has occurred.',
      error,
    });
  }
});

router.get('/:id/pastes', async (req, res) => {
  try {
    const id = req.params.id.toString();

    if (!!!id) {
      res.status(400).json({ message: 'Request body is invalid.' });
    }

    const snap = await db
      .collection('potatoes')
      .doc(id)
      .collection('pastes')
      .orderBy('createdAt', 'desc')
      .get();

    const ret: any[] = [];
    snap.forEach((doc) => ret.push({ ...doc.data(), id: doc.id }));

    res.json(ret);
  } catch (error) {
    res.status(500).json({
      message: 'An unexpected error has occurred.',
      error,
    });
  }
});

router.post('/:id/pastes', async (req, res) => {
  try {
    const potatoId = req.params.id.toString();
    const pasteData = req.body;

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
  } catch (error) {
    res.status(500).json({
      message: 'An unexpected error has occurred.',
      error,
    });
  }
});

export default router;
