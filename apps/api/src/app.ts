import express from 'express';
import { errorMiddleware } from './middlewares/error.middleware';
import authRoutes from './routers/auth.router';
import jobPostRoutes from './routers/jobPost.router';
import skillAssessmentRouter from './routers/skillAssessment.router';
import cors from 'cors';

const app = express();

app.use(express.json());
app.use(
  cors({
    origin: '*',
    methods: 'GET,POST,PUT,DELETE',
    credentials: true,
  }),
);

app.use('/api/v1/auth', authRoutes);
app.use('/api/v1/jobposts', jobPostRoutes);
app.use('/api/v1/skill-assessment', skillAssessmentRouter)

app.use(errorMiddleware);

export default app;
