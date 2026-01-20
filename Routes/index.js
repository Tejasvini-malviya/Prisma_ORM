import { Route } from "express";
import { userRouter } from "./userRouter";
const router = Router();

router.use("/api/users", userRouter);
export default router;
