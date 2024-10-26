import { Router } from "express";
import {
    getAllPosts,
    createJobPost,
    getAllJobPostsByAdmin,
    getJobPostForAdminById,
    togglePublishJobPost,
    updateJobPost,
    deleteJobPost,
} from "@/controllers/jobPost.controller";

const router = Router();

router.get("/", getAllPosts);
router.post("/", createJobPost);
router.get("/adminId/:adminId", getAllJobPostsByAdmin);
router.get("/admin/:id", getJobPostForAdminById);
router.put("/admin/:id", updateJobPost);
router.delete("/admin/:id", deleteJobPost);
router.put("/togglePublish/:id", togglePublishJobPost);

export default router;
