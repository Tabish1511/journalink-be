import { createClient } from 'redis';

// const client = createClient();
const client = createClient({
    url: 'redis://journalink-redis:6379'
});
client.on('error', (err) => console.log('Redis Client Error', err));



async function startWorker() {
  try {
      await client.connect();
      console.log('Connected to Redis from worker');
  } catch (error) {
      console.error('Failed to connect to Redis:', error);
      return;
  }

  while (true) {
      if (!client.isOpen) {
          console.error('Redis connection lost. Exiting worker loop.');
          break;
      }
      try {
          const messageData = await client.brPop("newMessages", 0);
          if (messageData?.element) {
              console.log("The message received by redis: ", messageData.element);
              console.log('Message processed in BG WORKER');
          } else {
              console.log('NO MESSAGE IN BG WORKER');
          }
      } catch (error) {
          console.error("Error processing message:", error);
      }
  }
}

startWorker();