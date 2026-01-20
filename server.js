import "dotenv/config";
import express from "express";
const app = express();
const PORT = 3000;

app.use(express.json());

app.get("/", (req, res) => {
  res.send("Hello World");
});

//*--routes define here--*//
import userRouter from "./Routes/userRoute.js";
app.use("/api/user", userRouter);

app.listen(PORT, () => {
  console.log(`server is running on ${PORT}`);
});
