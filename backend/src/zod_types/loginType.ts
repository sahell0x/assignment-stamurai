import z from "zod";


const loginType = z.object({
  email: z.string().email(),
  password: z.string().min(8),
  
});

export default loginType;
