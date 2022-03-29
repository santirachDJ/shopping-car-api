import yenv from "yenv";
import redisConnection from "@condor-labs/redis"


const env = yenv();
let redisClient = null


const clearRedis = async () => {
    const keys = await redisClient.keys('APP_*');
    const pipeline = redisClient.pipeline();

    keys.forEach((key) => {
        pipeline.del(key);
    });

    return pipeline.exec();
};

const promiseRedisServer = () => {
    const promiseRedis = new Promise(async (resolve, reject) => {

    })
}


const getDataRedis = (key) => {
    const promiseRedis = new Promise(async (resolve, reject) => {
        getRedis(key, async (err, vlaueInCache) => {
            if (err) reject(err);

            if (vlaueInCache) {

                resolve(vlaueInCache)
            } else {

                resolve()
            }
        });
    })
    return promiseRedis
}

const getRedis = (key, callback) => {
    redisClient.get(key, callback);
};

const setRedis = (key, value) => {
    redisClient.set(key, value);
};

const deleteRedis = (key) => {
    redisClient.del(key);
}

const startRedisDB = () => {

    const settings = {
        prefix: env.DATABASE.REDIS.PREFIX,
        host: env.DATABASE.REDIS.HOST,
        port: env.DATABASE.REDIS.PORT,
        password: `${env.DATABASE.REDIS.PASS}`,
    }

    const redisConnectionPromise = redisConnection(settings)

    const promise = new Promise(async (resolve, reject) => {

        redisClient = await redisConnectionPromise.getClient();
        redisClient.on('connect', () => {
            console.log('Connection Redis successful');
            resolve(true);
        })
            .on('error', error => {
                reject(error);
            });

    });

    return promise;
}

export {
    startRedisDB,
    getRedis,
    setRedis,
    deleteRedis,
    getDataRedis,
    redisClient
}