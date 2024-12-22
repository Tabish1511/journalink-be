import express from "express";
import userRouter from './routes/user';
import messageRouter from './routes/message';

// Check if build workflow running
// Check if build workflow running
// Check if build workflow running

const app = express();
app.use(express.json());

app.use('/api/v1/user', userRouter);
app.use('/api/v1/message', messageRouter);

const httpServer = app.listen(8080, () => {
  console.log('API server running on port 8080');
});

export { httpServer };

import './websocket';