import cors from "cors";
import express from "express";
import { errorMiddleware } from "./middlewares/error.middleware";
import authRoutes from "./routers/auth.router";
import generatorRouter from "./routers/generator.router";
import jobApplicationRoutes from "./routers/jobApplication.router";
import jobPostRoutes from "./routers/jobPost.router";
import skillAssessmentRouter from "./routers/skillAssessment.router";
import subscriptionRouter from "./routers/subscription.router";
import companyRouter from './routers/company.router';
import endorsmentRouter from './routers/endorsment.router'
import userRouter from "./routers/user.router"
import interviewRouter from "./routers/interview.router";
import chatsRouter from "./routers/chat.router";
import path from "path";

const app = express();

app.use(express.json());
app.use(
    cors({
        origin: "*",
        methods: "GET,POST,PUT,DELETE",
        credentials: true,
    }),
);

app.use("/uploads", express.static(path.join(__dirname, "..", "uploads")));

app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/jobposts", jobPostRoutes);
app.use("/api/v1/jobapplications", jobApplicationRoutes);
app.use("/api/v1/skill-assessment", skillAssessmentRouter);
app.use("/api/v1/subscriptions", subscriptionRouter);
app.use("/api/v1/generator", generatorRouter);
app.use('/api/v1/company', companyRouter);
app.use('/api/v1/endorsement', endorsmentRouter);
app.use('/api/v1/users', userRouter);
app.use("/api/v1/chat", chatsRouter);
app.use("/api/v1/interview-schedule", interviewRouter);
app.use(errorMiddleware);

export default app;
