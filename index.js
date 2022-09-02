import express from "express";
import bodyParser from "body-parser";
import userRoutes from "./routes/user-routes.js";

const app = express();
const PORT = 5000;

// dont need to use bodyParser now
app.use(express.json());

app.use(express.static("public"));

app.use("/api/users", userRoutes);

app.listen(PORT, () =>
  console.log(`server running on port: http://localhost:${PORT}`)
);


