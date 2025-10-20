
// imports
import express, { Express, Application } from "express";

// import server setup
import { Server } from "./server";


// class
class App {
  
   // initialize app
   public initialize(): void {
      // express instance
      const app: Express = express();
      const server: Server = new Server(app);

      // start server
      server.start();
   };

};
const app: App = new App();
app.initialize();