import { Router } from "express";
import { createUser, fetchUser, updateUser, showUsers, deleteUser } from "../controller/userController.js";
const router = Router();

router.get("/", fetchUser);
router.get("/:id", showUsers);
router.post("/", createUser);
router.put("/:id", updateUser);
router.delete("/:id", deleteUser);

export default router;
