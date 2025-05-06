import mongoose from "mongoose";

const taskSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: String,
  dueDate: { type: Date, required: true },
  priority: {
    type: String,
    enum: ["low", "medium", "high"],
    default: "medium",
  },
  status: {
    type: String,
    enum: ["todo", "inProgress", "review", "completed"],
    default: "todo",
  },
  createdBy: { type: mongoose.Types.ObjectId, ref: "User", required: true },
  assignedTo: { type: mongoose.Types.ObjectId, ref: "User", required: true },
  assignedToName: { type: String, required: true },
});

const Task = mongoose.model("Task", taskSchema);
  
export default Task;
