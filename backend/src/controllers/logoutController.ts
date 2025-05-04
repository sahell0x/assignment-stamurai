import { Request,Response } from "express";


const logoutController = async (req:Request,res:Response) :Promise<any>=>{
    try{
        
        res.cookie("token","", {     
            httpOnly: true,
            secure: true,
            sameSite: "none",
            maxAge: 1,   
        });
    return res.status(200).json({
        message:"Logout successfully",
    });

   
    }catch{
     return res.status(500).json({message:"internal server error."});
    }
}

export default logoutController;