
// imports
import { Application } from 'express';
import cors from 'cors';
import helmet from 'helmet';
import hpp from 'hpp';


// utils
const SERVER_PORT = 5111;


// class - Server
export class Server {
   // express instance
   private app: Application;

   // constructor
   constructor(app: Application){
      this.app = app;
   };

   // start methods
   public start(): void {
      this.startServer(this.app);
   };

   // start server
   private startServer(app: Application): void {
      app.listen(SERVER_PORT, () => {
         console.log('Server initialize at port: ', SERVER_PORT);
      });
   };

};