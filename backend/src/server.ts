
// imports
import { Application, json, urlencoded, Router } from 'express';
import cors from 'cors';
import helmet from 'helmet';
import hpp from 'hpp';
import compression from 'compression';

// import router
import { router } from '@routes/routes';

// import middlewares
import { loggingMiddleware } from '@middlewares/logging.middleware';

// import env
import dotenv from 'dotenv';
dotenv.config({});


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
      this.securityMiddlewares(this.app);
      this.dataMiddlewaresConfig(this.app);
      this.customMiddlewares(this.app);
      this.routerConfig(this.app);
      this.startServer(this.app);
   };


   // security middlewares
   private securityMiddlewares(app: Application): void {
      app.use(hpp());
      app.use(helmet());
      app.use(cors({
         origin: 'any', // any origin - for development
         credentials: true,
         methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS']
      }));

      console.log('✔️ security middlewares running');
   };


   // data middlewares config
   private dataMiddlewaresConfig(app: Application): void {
      app.use(compression());
      app.use(json({ limit: '50mb' }));
      app.use(urlencoded({
         extended: true,
         limit: '50mb'
      }));

      console.log('✔️ data middlewares config running');
   };


   // custom middlewares
   private customMiddlewares(app: Application): void {
      app.use(loggingMiddleware); // logging mid
      console.log('✔️ custom middlewares running');
   };


   // route config
   private routerConfig(app: Application): void {
      app.use('/', router);
      console.log('✔️ router prefix defined');
   };


   // start server
   private startServer(app: Application): void {
      app.listen(process.env.SERVER_PORT, () => {
         console.log('✔️ server running at port: ', process.env.SERVER_PORT);
      });
   };

};