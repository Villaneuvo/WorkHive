import { getAllSkillAssessments, getSkillAssessmentsQuizById, submitSkillAssessmentAnswers } from "@/controllers/skillAssessment.controller";
import { Router } from "express";

const router = Router();

router.get("/quiz/", getAllSkillAssessments);
router.get("/quiz/:id", getSkillAssessmentsQuizById);
router.post("/submit-assessment", submitSkillAssessmentAnswers)

export default router;