import express, { Request, Response, NextFunction } from "express";
import todoRoutes from "./routes/todo";
import { json, urlencoded } from "body-parser";
import db from "mongoose";

const app = express();
app.use(json());
app.use(urlencoded({ extended: true }));

app.listen(4000, () => console.log("server is running at port 4000..."));

/* const url = "mongodb://localhost:27017/todos";
mongoose
  .connect(url, {})
  .then((result) => console.log("database connected"))
  .catch((err) => console.log(err)); 
  
const db = mongoose.connection;*/

db.connect("mongodb://localhost:27017/todos")
  .then((result) => console.log("database connected"))
  .catch((err) => console.log(err));

// API endpoint
app.use("/todo", todoRoutes);

app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  res.status(500).json({ message: err.message });
});
