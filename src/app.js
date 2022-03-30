import express from 'express';

// App
const app = express();
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

export default app;
