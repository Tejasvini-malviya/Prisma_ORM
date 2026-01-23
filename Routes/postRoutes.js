import { Router } from "express";
import { fetchPosts, createPost, deletePost, showPosts, updatePost } from "../controller/postController.js";
const router = Router();

router.get("/", fetchPosts);
router.post("/", createPost);
router.get("/:id", showPosts);
router.put("/:id", updatePost);
router.delete("/:id", deletePost);

export default router;