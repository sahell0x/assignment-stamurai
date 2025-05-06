import z from "zod";


const priorityEnum = z.enum(["low", "medium", "high"]);
const statusEnum = z.enum(["todo", "inProgress", "review", "completed"]);

const taskType = z.object({
    title: z.string(),
    description: z.string().optional(),
    dueDate: z.string().date(),
    priority: priorityEnum,
    status: statusEnum.optional(),
    assignedTo: z.string(),
    assignedToName: z.string(),
});

export default taskType;
