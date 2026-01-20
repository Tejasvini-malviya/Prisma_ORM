import { Router } from "express";
import { createUser, getAllUsers } from "../controller/userController.js";
const router = Router();

router.get("/", getAllUsers);
router.post("/", createUser);
export default router;
