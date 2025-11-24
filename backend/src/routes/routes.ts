
// imports
import { Router, Request, Response } from "express";

// import controllers
import { generationController } from "@root/controllers/generation.controller";
import { userController } from "@root/controllers/user.controller";
import { pdfController } from "@root/controllers/pdf.controller";

// import middlewares
import { ollamaMiddleware } from "@middlewares/model.middleware";


// export router
export const router: Router = Router();


// Model IA - routes
router.post(
   '/questions',
   ollamaMiddleware,
   generationController.questionGeneration.bind(generationController)
);

// user - routes
router.post(
   '/answers', 
   ollamaMiddleware,
   userController.answersGeneration.bind(userController)
);

// PDF - routes
router.get(
   '/pdf',
   pdfController.downloadPdf.bind(pdfController)
);