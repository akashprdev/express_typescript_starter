import { Router } from 'express';

const router = Router();

router.get('/', (req, res) => {
  res.json({ message: 'Auth route' });
});

router.post('/login', (req, res) => {
  res.json({ message: 'Login success' });
});

router.post('/register', (req, res) => {
  res.json({ message: 'Register success' });
});

export default router;
