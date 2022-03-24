import http from "http"


const startExpressServer = (app) => {
    const promiseServer = new Promise((resolve, reject) => {
        const server = http.createServer(app);
        server
            .listen(4000)
            .on('listening', () => {
                console.log(
                    `Server is running on port:  ${(server.address()).port}`
                );
                resolve();
            })
            .on('error', err => {
                console.log(err);
                reject(err);
            });
    });
    return promiseServer;
}

export default startExpressServer
