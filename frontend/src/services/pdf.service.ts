
// imports
import axios from "axios";


// pdf service
class PDFService {

   // download pdf
   public async pdfDownload(
      filePath: string
   ): Promise<void>{
      // build pdf url
      const pdfUrl = `http://localhost:5111/pdf?filepath=${ encodeURIComponent(filePath) }`;

      // send axios request
      const res = await axios.get(pdfUrl, {
         responseType: 'blob'
      });

      // Create blob URL and trigger download
      const blob = new Blob([res.data], { type: 'application/pdf' });
      const url = window.URL.createObjectURL(blob);

      // Create temporary link and trigger click
      const link = document.createElement('a');
      link.href = url;
      link.download = 'evaluation.pdf'; // file name for download
      document.body.appendChild(link);
      link.click();

      // Cleanup
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);
   };

};
export const pdfService: PDFService = new PDFService();