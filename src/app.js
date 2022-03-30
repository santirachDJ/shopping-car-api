import express from 'express';
import { healthMonitor } from '@condor-labs/health-middleware';
// App
const app = express();
healthMonitor(app);
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

export default app;
