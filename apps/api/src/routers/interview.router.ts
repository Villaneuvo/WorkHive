import {
    createInterviewSchedule,
    deleteInterviewSchedule,
    getAllAvailableUsers,
    getAllInterviewSchedule,
    getInterviewScheduleById,
    updateInterviewSchedule,
} from "@/controllers/interview.controller";
import express from "express";

const router = express.Router();

router.get("/available-user", getAllAvailableUsers);
router.get("/list", getAllInterviewSchedule);
router.get("/:id", getInterviewScheduleById);
router.post("/create", createInterviewSchedule);
router.put("/update/:id", updateInterviewSchedule);
router.delete("/delete/:id", deleteInterviewSchedule);

export default router;
