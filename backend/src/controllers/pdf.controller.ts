
// imports
import { Request, Response } from "express";
import path from 'path';
import fs from 'fs';

// import interfaces
import type { iApiResponse } from "@interfaces/apiResponse.interface";


// pdf controller - class
class PdfController {

   // download pdf
   public async downloadPdf(
      req: Request,
      res: Response<iApiResponse>
   ){
      // get PDF path + validation
      const { filepath } = req.query;
      if(!filepath || typeof filepath !== 'string'){
         return res.status(400).send({
            success: false,
            message: '❌ Missing PDF filepath'
         });
      }

      // get file name
      const filename = path.basename(filepath);

      // safe base DIR
      const baseDir = path.join(__dirname, '..', 'temp', 'pdf');
      const fullPath = path.join(baseDir, filename);

      // check file extension
      if (!filename.toLowerCase().endsWith('.pdf')) {
         return res.status(400).send({
            success: false,
            message: '❌ Invalid file type'
         });
      }

      // check file existence
      if (!fs.existsSync(fullPath)) {
         return res.status(404).send({
            success: false,
            message: '❌ PDF file not found'
         });
      }

      // download
      return res.download(fullPath, filename, (error) =>{
         if(error){
            console.error('Download error:', error);
            return res.status(500).send({
               success: false,
               message: '❌ Internal Error at downloading PDF file'
            });
         }
      });
   };

};
export const pdfController: PdfController = new PdfController();