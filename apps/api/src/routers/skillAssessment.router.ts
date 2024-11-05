import { getAllSkillAssessments, getSkillAssessmentsQuizById, submitSkillAssessmentAnswers, createSkillAssessment, addQuestion } from "@/controllers/skillAssessment.controller";
import { Router } from "express";

const router = Router();

router.get("/quiz/", getAllSkillAssessments);
router.get("/quiz/:id", getSkillAssessmentsQuizById);
router.post("/submit-assessment", submitSkillAssessmentAnswers);
router.post("/skill-assessment-creation", createSkillAssessment);
router.post("/skill-assessment/question", addQuestion);

export default router;