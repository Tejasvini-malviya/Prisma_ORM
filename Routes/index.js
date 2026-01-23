import { Router } from "express";
import userRouter from "./userRoute.js";
import postRouter from "./postRoutes.js";
import commentRouter from "./commentRoutes.js";
const router = Router();

router.use("/api/users", userRouter);
router.use("/api/posts", postRouter);
router.use("/api/comments", commentRouter);

export default router;
