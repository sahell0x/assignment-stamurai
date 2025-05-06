import z, { string } from "zod";


const priorityEnum = z.enum(["low", "medium", "high"]);
const statusEnum = z.enum(["todo", "inProgress", "review", "completed"]);

const taskType = z.object({
  
    title: z.string(),
    description: z.string().optional(),
    dueDate: z.string().date(),
    priority: priorityEnum,
    status: statusEnum,
    createdBy: z.string(),
    assignedTo: z.string(),
    assignedToName: z.string(),
  
  
});

export default taskType;
