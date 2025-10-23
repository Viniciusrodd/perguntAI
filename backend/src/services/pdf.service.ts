
// imports
import PDFDocument from 'pdfkit';
import fs from 'fs';
import path from 'path';

// import pdf config
import { pdfConfig } from "@root/config/pdf.config";

// import interfaces
import { iEvaluationResult } from '@interfaces/pdf.interfaces';



// pdf service - class
class PdfService {

   // evaluation result generation pdf
   public async evaluationResultGeneration(
      evaluation: iEvaluationResult
   ): Promise<string> {
      // path resolves
      const ouputDir = path.resolve(pdfConfig.outputDir);
      if(!fs.existsSync(ouputDir)){ // if output doesn't exist
         fs.mkdirSync(ouputDir, { recursive: true });
      } 

      // file resolve
      const filePath = path.join(ouputDir, `evaluation-${Date.now()}.pdf`);
      const doc = new PDFDocument({ margin: 50 });
      
      // font set
      const fontPath = path.join(__dirname, '../assets/fonts/DejaVuSans.ttf');
      doc.font(fontPath);

      // pdf metadatas
      doc.info.Title = pdfConfig.meta.title;
      doc.info.Author = pdfConfig.meta.author;
      doc.info.Subject = pdfConfig.meta.subject;

      // PDF will be generated and saved directly to the file, without taking up all the memory.
      const stream = fs.createWriteStream(filePath);
      doc.pipe(stream);

      // header - set
      doc
         .fontSize(18)
         .fillColor(pdfConfig.styles.headerColor)
         .text(pdfConfig.meta.title, { align: "center" });
      doc.moveDown();
      doc.fontSize(10).fillColor("black").text(`Data: ${evaluation.generatedAt}`);
      doc.moveDown(2);

      // general resume - set
      doc.fontSize(12)
         .fillColor(pdfConfig.styles.accentColor)
         .text("Resumo da Avaliação:");
      doc.moveDown();
      doc.fillColor("black");
      doc.text(`🟢 Total: ${evaluation.totalQuestions}`);
      doc.text(`✔️ Acertos: ${evaluation.correctAnswers}`);
      doc.text(`❌ Erros: ${evaluation.incorrectAnswers}`);
      doc.text(`📊 Taxa: ${evaluation.accuracy}%`);
      doc.moveDown(2);

      // base text
      doc.fontSize(12)
         .fillColor(pdfConfig.styles.accentColor)
         .text("📚 Material de estudo:");
      doc.moveDown();
      doc.fontSize(10)
         .fillColor("black")
         .text(evaluation.questionSet.material.text, { align: "justify" });
      doc.moveDown(2);

      // questions + answers
      doc.fontSize(12)
         .fillColor(pdfConfig.styles.accentColor)
         .text("🧠 Perguntas e Respostas:");
      doc.moveDown();

      // questions - set
      evaluation.userAnswers.forEach((ans, index) => {
         const question = evaluation.questionSet.questions.find(q => q.id === ans.questionId);
         if (!question) return;

         doc.fontSize(11).text(`${index + 1}. ${question.prompt}`);
         doc.text(`Resposta do usuário: ${ans.userResponse}`);
         doc.text(`Correto: ${ans.isCorrect ? "✔️ Sim" : "❌ Não"}`);
         if (!ans.isCorrect && ans.feedback)
         doc.text(`Feedback: ${ans.feedback}`);
         doc.moveDown();
      });

      // end
      doc.end();
      return new Promise((resolve) => {
         stream.on("finish", () => resolve(filePath));
      });
   };

};
export const pdfService: PdfService = new PdfService();