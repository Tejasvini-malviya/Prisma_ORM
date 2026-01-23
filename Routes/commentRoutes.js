import { Router } from "express";
import {
  createComment,
  fetchComments,
  deleteComment,
  showComment,
  updateComment,
} from "../controller/commentController.js";
const router = Router();

router.get("/", fetchComments);
router.get("/:id", showComment);
router.put("/:id", updateComment);
router.post("/", createComment);
router.delete("/:id", deleteComment);

export default router;
