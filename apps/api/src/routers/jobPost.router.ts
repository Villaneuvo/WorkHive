import {
    createJobPost,
    deleteJobPost,
    getAllJobPostsByAdmin,
    getAllPosts,
    getJobPostForAdminById,
    togglePublishJobPost,
    updateJobPost,
} from "@/controllers/jobPost.controller";
import { Router } from "express";

const router = Router();

router.get("/", getAllPosts);
router.post("/", createJobPost);
router.get("/adminId/:adminId", getAllJobPostsByAdmin);
router.get("/admin/:id", getJobPostForAdminById);
router.put("/admin/:id", updateJobPost);
router.delete("/admin/:id", deleteJobPost);
router.put("/togglePublish/:id", togglePublishJobPost);

export default router;
