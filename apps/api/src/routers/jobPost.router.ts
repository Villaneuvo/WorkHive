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
    saveJobPost,
    getSavedJobs,
    applyJob,
    upload,
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
router.get("/users/:userId/saved-jobs", getSavedJobs);
router.put("/admin/:id", updateJobPost);
router.delete("/admin/:id", deleteJobPost);
router.put("/togglePublish/:id", togglePublishJobPost);
router.post('/jobs/save', saveJobPost);
router.post("/apply", upload.single("cv"), applyJob);

export default router;
