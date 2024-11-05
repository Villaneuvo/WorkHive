import { Router } from "express";
import { changeStatus, getAllJobApplicationByJobPostId } from "@/controllers/jobApplication.controller";

const router = Router();

router.get("/jobPostId/:jobPostId", getAllJobApplicationByJobPostId);
router.put("/changeStatus/:id", changeStatus);

export default router;
