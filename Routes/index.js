import { Router } from "express";
import userRouter from "./userRoute.js";
import postRouter from "./postRoutes.js";
const router = Router();

router.use("/api/users", userRouter);
router.use("/api/posts", postRouter);

export default router;
