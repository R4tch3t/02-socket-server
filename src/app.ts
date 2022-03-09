import express from 'express';
import {ApolloServer} from 'apollo-server-express';
import fs from 'fs';
import https from 'https';
import http from 'http';
import {graphqlUploadExpress} from 'graphql-upload';
import path from 'path';
import cors from 'cors';
import schemas from './schemas/schemas'
import {Server} from 'socket.io';
import routerAuth from './router/auth';
import routerMsj from './router/mensajes';
import { ioOnConnection } from './socket/events';

export async function startServer(){
    const app = express();
    const router = require("./router/auth")
    const schema = await schemas();
    const configurations: {[index: string]:any} = {
      production: { ssl: true, port: 443, hostname: 'localhost' },
      development: { ssl: false, port: 3000, hostname: 'localhost' },
    }; 
    const environment = process.env.NODE_ENV || 'development';
    const config = configurations[environment];

    const server = new ApolloServer({
        schema,
        context: ({req, res}) => ({req, res})
    });
    await server.start()
    app.use(express.json());
    app.use(cors())
    app.use(graphqlUploadExpress());
    server.applyMiddleware({app, path: '/graphql'});
    //app.set('view engine', 'js');

    app.use(express.static(path.join(__dirname, 'client-nextts/.next')));

    //app.use("/client-nextts",express.static(path.join(__dirname, 'client-nextts')));
    app.use("/_next",express.static(path.join(__dirname, 'client-nextts/.next')));
    app.use("/api/login",routerAuth);
    app.use("/api/mensajes",routerMsj);
    /*app.use("/",function(req, res, next){
      //res.render('User')
      res.send(path.join(__dirname, 'client-nextts/.next/server/pages', 'index.js'))
      next();
    })*/
    const root = path.join(__dirname, 'client-nextts/.next/server/pages', 'index.html');
    const login = path.join(__dirname, 'client-nextts/.next/server/pages', 'login.html');
    const signup = path.join(__dirname, 'client-nextts/.next/server/pages', 'signup.html');
    const perfil = path.join(__dirname, 'client-nextts/.next/server/pages', 'perfil.html');
    app.get('/', function (req, res) {
      //res.sendFile(path.join(__dirname, '', 'index.html'));
      res.sendFile(root);
      //res.render(path.join(__dirname, 'client-nextts/.next/server/pages', 'index.js'))
      //res.send(path.join(__dirname, 'client-nextts/.next/server/pages', 'index.js'));
      //res.render("Home");
      //res.send()
    });
    app.get('/login', function (req, res) {
      res.sendFile(login);
    });
    app.get('/signup', function (req, res) {
      res.sendFile(signup);
    });
    app.get('/perfil', function (req, res) {
      res.sendFile(perfil);
    });
    //app.get("/",express.static(path.join(__dirname, 'client-nextts/.next/server/pages')));

    let httpServer: any;
    if (config.ssl) {
      httpServer = https.createServer(
        {
          key: fs.readFileSync(path.join(__dirname,`ssl/${environment}/server.key`)),
          cert: fs.readFileSync(path.join(__dirname,`ssl/${environment}/server.crt`))
        },

        app,
      );
    } else {
      httpServer = http.createServer(app);
    }

    const io = new Server(httpServer)
    ioOnConnection(io);
    

    await new Promise<void>(resolve =>
      httpServer.listen({ port: config.port }, resolve)
    );
    
    console.log(
      '🚀 Server ready at',
      `http${config.ssl ? 's' : ''}://${config.hostname}:${config.port}${
        server.graphqlPath
      }`
    );
}