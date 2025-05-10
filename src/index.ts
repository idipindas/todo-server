import express from 'express';
import 'dotenv/config'
import cors from 'cors'
import connectDB from './config/db';
import authRoutes from './routes/auth.routes'
import todoRoutes from './routes/todo.routes'
import morgan from 'morgan'

connectDB()
const app = express();
const PORT: any = process.env.PORT;
app.use(cors())

app.use(express.json());
app.use(morgan('dev'))
app.use('/api/auth', authRoutes);
app.use('/api/todos', todoRoutes);
app.get('/', (_req, res) => {
    res.send('Hello from Node + TypeScript!');
});

// app.listen(PORT, () => {
//     console.log(`Server is running at http://localhost:${PORT}`);
// });
app.listen(PORT, '0.0.0.0', () => {
    console.log(`Running at http://0.0.0.0:${PORT}`);
});
