import z from "zod";


const resgisterType = z.object({
  email: z.string().email(),
  password: z.string().min(8),
  name : z.string(),
  
});

export default resgisterType;
