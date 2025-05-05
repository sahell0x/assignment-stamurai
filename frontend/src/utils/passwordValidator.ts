 import {z} from "zod"
 const passwordValidator = (password:string): boolean=>{
    const passwordValidation = new RegExp( 
        /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/
      );

      const passwordSchema = z.string().regex(passwordValidation);

      const {success} = passwordSchema.safeParse(password);

      if(success){
        return true;
      }
      return false;

}

export default passwordValidator