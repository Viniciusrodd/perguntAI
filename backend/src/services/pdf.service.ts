
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
      // utils
      const formattedDate = new Date(evaluation.generatedAt).toLocaleDateString('pt-BR', {
         timeZone: 'UTC'
      });

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

      // HEADER
      doc
         .fontSize(20)
         .fillColor(pdfConfig.styles.headerColor)
         .font(fontPath)
         .text(pdfConfig.meta.title, { align: "center", underline: true });

      doc.moveDown(0.5);
      doc
         .fontSize(10)
         .fillColor(pdfConfig.styles.greyColor)
         .text(`Data de geração: ${formattedDate}`, { align: "center" });

      // line
      doc.moveDown(1);
      doc
         .moveTo(50, doc.y)
         .lineTo(550, doc.y)
         .strokeColor(pdfConfig.styles.accentColor)
         .lineWidth(0.5)
         .stroke();
      doc.moveDown(3);

      // RESUME
      doc
         .fontSize(14)
         .fillColor(pdfConfig.styles.accentColor)
         .text("Resumo da Avaliação");
      doc.moveDown(1);

      const resumeItems = [
         { label: "Total de Questões", value: evaluation.totalQuestions },
         { label: "Acertos", value: evaluation.correctAnswers },
         { label: "Erros", value: evaluation.incorrectAnswers },
         { label: "Taxa de Acerto", value: `${evaluation.accuracy}%` }
      ];

      resumeItems.forEach(({ label, value }) => {
         doc
            .fontSize(11)
            .fillColor(pdfConfig.styles.accentColor)
            .text(`• ${label}: `, { continued: true, indent: 10 })
            .fillColor(pdfConfig.styles.blackColor)
            .text(`${value}`);
      });

      doc.moveDown(3);

      // STUDY MATERIAL
      doc
         .fontSize(14)
         .fillColor(pdfConfig.styles.accentColor)
         .text("Material de Estudo");
      doc.moveDown(1);

      doc
         .fontSize(11)
         .fillColor(pdfConfig.styles.blackColor)
         .text(evaluation.questionSet.material.text, {
            align: "justify",
            indent: 10,
            lineGap: 4
         });

      doc.moveDown(3);

      // QUESTIONS & ANSWERS
      doc
         .fontSize(14)
         .fillColor(pdfConfig.styles.accentColor)
         .text("Perguntas e Respostas");

      doc.moveDown(1);

      evaluation.userAnswers.forEach((ans, index) => {
         const question = evaluation.questionSet.questions.find(q => q.id === ans.questionId);
         if (!question) return;

         // line between questions
         doc
         .moveTo(50, doc.y)
         .lineTo(550, doc.y)
         .strokeColor(pdfConfig.styles.accentColor)
         .lineWidth(0.5)
         .stroke();
         doc.moveDown(1);         

         // question
         doc
            .fontSize(12)
            .fillColor(pdfConfig.styles.accentColor)
            .text(`${index + 1}. ${question.prompt}`, {
               align: "justify",
               lineGap: 2
            });
         doc.moveDown(0.5);

         // user answer
         doc
            .fontSize(11)
            .fillColor(pdfConfig.styles.accentColor)
            .text('• Resposta do usuário: ', { continued: true })
            .font(fontPath)
            .fillColor(pdfConfig.styles.blackColor)
            .text(ans.userResponse);

         // correct feed
         doc
            .fontSize(11)
            .fillColor(pdfConfig.styles.accentColor)
            .text('• Correto: ', { continued: true })
            .fillColor(ans.isCorrect ? pdfConfig.styles.greenColor : pdfConfig.styles.redColor)
            .text(ans.isCorrect ? 'Sim' : 'Não');

         // feedback
         if (!ans.isCorrect && ans.feedback) {
            doc
               .fontSize(11)
               .fillColor(pdfConfig.styles.accentColor)
               .text('• Feedback: ', { continued: true })
               .fillColor(pdfConfig.styles.blackColor)
               .text(`"${ans.feedback}"`);
         }

         doc.moveDown(1.5);
      });

      doc.moveDown(3);
      doc
         .fontSize(9)
         .fillColor(pdfConfig.styles.lightGreyColor)
         .text("Documento gerado automaticamente pelo sistema de avaliação perguntAI.", {
            align: "center",
            oblique: true
         });

      // END
      doc.end();

      return new Promise((resolve) => {
         stream.on("finish", () => resolve(filePath));
      });
   };

};
export const pdfService: PdfService = new PdfService();