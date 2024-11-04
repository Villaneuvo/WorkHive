import {
    createJobPost,
    deleteJobPost,
    getAllCompanies,
    getAllJobPostsByAdmin,
    getAllPosts,
    getCompanyById,
    getJobPostForAdminById,
    getPostById,
    togglePublishJobPost,
    updateJobPost,
    saveJobPost
} from "@/controllers/jobPost.controller";
import { Router } from "express";

const router = Router();

router.get("/", getAllPosts);
router.post("/", createJobPost);
router.get("/company/", getAllCompanies);
router.get("/:id", getPostById);
router.get("/company/:id", getCompanyById);
router.get("/adminId/:adminId", getAllJobPostsByAdmin);
router.get("/admin/:id", getJobPostForAdminById);
router.put("/admin/:id", updateJobPost);
router.delete("/admin/:id", deleteJobPost);
router.put("/togglePublish/:id", togglePublishJobPost);
router.post('/jobs/save', saveJobPost);

export default router;
