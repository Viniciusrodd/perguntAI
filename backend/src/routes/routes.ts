
// imports
import { Router, Request, Response } from "express";

// import controllers
import { generationController } from "@root/controllers/generation.controller";

// export router
export const router: Router = Router();


router.post('/questions', generationController.questionGeneration.bind(generationController));