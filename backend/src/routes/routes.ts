
// imports
import { Router, Request, Response } from "express";


// export router
export const router: Router = Router();


// test - routes
router.get('/test', (req: Request, res: Response): any =>{
   return res.json({
      msg: 'test success'
   });
});