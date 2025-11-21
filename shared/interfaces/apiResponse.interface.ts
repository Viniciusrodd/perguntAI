
export interface iApiResponse<T = any>{
   success: boolean; 
   message: string; 
   data?: T; 
   document?: string;
   errorMessage?: string;
};