import express from 'express';
import 'dotenv/config';
import cors from 'cors';
import * as https from 'https';
import * as fs from 'fs';
import connectDB from './config/db';
import authRoutes from './routes/auth.routes';
import todoRoutes from './routes/todo.routes';
import morgan from 'morgan';

connectDB();

const app = express();
const PORT: any = process.env.PORT || 8000; 

// Middleware
app.use(cors());
app.use(express.json());
app.use(morgan('dev'));

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/todos', todoRoutes);

// Root route
app.get('/', (_req, res) => {
    res.send('Hello from Node + TypeScript with HTTPS!');
});

// HTTPS certificate options
const options = {
    key: fs.readFileSync('./certs/todo-server.key'),
    cert: fs.readFileSync('./certs/todo-server.crt'),
  };
  

// Start HTTPS server
https.createServer(options, app).listen(PORT, '0.0.0.0', () => {
    console.log(`🚀 HTTPS server running at https://44.201.176.213:${PORT}`);
});
