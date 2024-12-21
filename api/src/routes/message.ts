import { Router } from 'express';
const messageRouter = Router();


messageRouter.get('/test', (req, res) => {
  res.send('Hello, messageRoute!');
});

export default messageRouter;
