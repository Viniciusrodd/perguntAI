
// imports
import { Router, Request, Response } from "express";

// import routes


// export router
export const router: Router = Router();


// routes
router.get('/test', (req: Request, res: Response): any =>{
   return res.json({
      msg: 'test success'
   });
});