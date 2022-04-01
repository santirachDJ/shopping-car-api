import http from 'http';
import yenv from 'yenv';
const env = yenv();

const startExpressServer = (app) => {
  const promiseServer = new Promise((resolve, reject) => {
    const server = http.createServer(app);
    server
      .listen(env.PORT)
      .on('listening', () => {
        console.log(`Server is running on port:  ${server.address().port}`);
        resolve();
      })
      .on('error', (err) => {
        console.log(err);
        reject(err);
      });
  });
  return promiseServer;
};

export default startExpressServer;
