import "dotenv/config";
import express from "express";
import router from "./Routes/index.js";

const app = express();
const PORT = 3000;

app.use(express.json());

app.get("/", (req, res) => {
  res.send("Hello World");
});

app.use(router);

app.listen(PORT, () => {
  console.log(`server is running on ${PORT}`);
});
