const express = require('express');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const authRoutes = require('./routes/auth.routes');
import dashboardRoutes from './routes/dashboard.routes';
import procurementRoutes from './routes/procurement.routes';

import type { Request, Response } from 'express';

const app = express();
const allowedOrigin = process.env.FRONTEND_URL || 'http://localhost:3000';

app.use(cors({
    origin: allowedOrigin,
    credentials: true,
}));

app.use(express.json());
app.use(cookieParser());

app.get('/', (req: Request, res: Response) => {
    res.send('Hello World!');
});

app.use('/api/auth', authRoutes);
app.use('/api/dashboard', dashboardRoutes);
app.use('/api/procurement', procurementRoutes);

module.exports = app;
