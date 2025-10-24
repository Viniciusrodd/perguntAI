
// imports
import { Request, Response, NextFunction } from "express";
import axios from "axios";

// import env
import dotenv from 'dotenv';
dotenv.config({});


// ollama middleware check
export async function ollamaMiddleware(
   req: Request,
   res: Response,
   next: NextFunction
): Promise<void | Response> {
   try{
      await axios.get(process.env.OLLAMA_CHECK_URL!, { timeout: 3000 });
      next();
   }
   catch(error: unknown){
      console.log('⚠️ Ollama service is offline or inaccessible');
      return res.status(503).json({
         success: false,
         message: '⚠️ Ollama service is offline or inaccessible',
      });
   };
};