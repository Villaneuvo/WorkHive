import {
    getCertificateByUserIdAndSkillAssessmentId,
    getCV,
    getUserCertificateInfo,
    getUserCVInfo,
    postCV,
    verifyCertificate,
} from "@/controllers/generator.controller";
import { Router } from "express";

const router = Router();

router.get("/cv", getCV);
router.get("/certificate", getCertificateByUserIdAndSkillAssessmentId);
router.get("/verify/:verificationCode", verifyCertificate);
router.get("/userCVInfo/:userId", getUserCVInfo);
router.get("/userCertificateInfo/:userId", getUserCertificateInfo);
router.post("/cv/:userId", postCV);

export default router;
