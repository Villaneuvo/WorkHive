import cors from "cors";
import express from "express";
import { errorMiddleware } from "./middlewares/error.middleware";
import authRoutes from "./routers/auth.router";
import generatorRouter from "./routers/generator.router";
import jobApplicationRoutes from "./routers/jobApplication.router";
import jobPostRoutes from "./routers/jobPost.router";
import skillAssessmentRouter from "./routers/skillAssessment.router";
import subscriptionRouter from "./routers/subscription.router";

const app = express();

app.use(express.json());
app.use(
    cors({
        origin: "*",
        methods: "GET,POST,PUT,DELETE",
        credentials: true,
    }),
);

app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/jobposts", jobPostRoutes);
app.use("/api/v1/jobapplications", jobApplicationRoutes);
app.use("/api/v1/skill-assessment", skillAssessmentRouter);
app.use("/api/v1/subscriptions", subscriptionRouter);
app.use("/api/v1/generator", generatorRouter);

app.use(errorMiddleware);

export default app;
