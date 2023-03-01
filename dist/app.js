"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const todo_1 = __importDefault(require("./routes/todo"));
const body_parser_1 = require("body-parser");
const mongoose_1 = __importDefault(require("mongoose"));
const app = (0, express_1.default)();
app.use((0, body_parser_1.json)());
app.use((0, body_parser_1.urlencoded)({ extended: true }));
app.listen(4000, () => console.log("server is running at port 4000..."));
/* const url = "mongodb://localhost:27017/todos";
mongoose
  .connect(url, {})
  .then((result) => console.log("database connected"))
  .catch((err) => console.log(err));
  
const db = mongoose.connection;*/
mongoose_1.default.connect("mongodb://localhost:27017/todos")
    .then((result) => console.log("database connected"))
    .catch((err) => console.log(err));
// API endpoint
app.use("/todo", todo_1.default);
app.use((err, req, res, next) => {
    res.status(500).json({ message: err.message });
});
