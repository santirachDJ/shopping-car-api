import yenv from 'yenv';
import mongoDB from '@condor-labs/mongodb';

const env = yenv();
let mongooseClient = null;

const startMongoDB = () => {
  const parametersConnection = {
    host: env.DATABASE.MONGO.HOST,
    port: env.DATABASE.MONGO.PORT,
    database: env.DATABASE.MONGO.DATABASE,
    user: env.DATABASE.MONGO.USER,
    password: `${env.DATABASE.MONGO.PASS}`,
    ssl: env.DATABASE.MONGO.SSL,
    authSource: env.DATABASE.MONGO.AUTHSOURCE,
  };
  mongooseClient = mongoDB(parametersConnection);

  const promiseInitialize = new Promise((resolve, reject) => {
    mongooseClient
      .getClient()
      .then(() => {
        console.log(`Connection mongoDB successful(after):${mongooseClient._isConnected()}`);
        resolve(true);
      })
      .catch((error) => {
        console.log('error al conectarce a mongoDB');
        console.log(error);
        reject(error);
      });
  });

  return promiseInitialize;
};

const disconnect = async () => {
  return true;
};

export { startMongoDB, disconnect };
