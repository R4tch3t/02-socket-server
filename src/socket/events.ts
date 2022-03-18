import { Server } from "socket.io";
import { getUsuarios, grabarMensaje, usuarioConectado, usuarioDesconectado } from "../router/controllers/sockets";
import { comprobarJWT } from "../router/helpers/jwt";

const ioOnConnection = (io:Server) => {
    io.on('connection', async (socket) => { 
        const token:any = socket.handshake.query['x-token'];
        const [valido,activada,ids]:any = comprobarJWT(token);
        if(!valido){
            console.log("Socket no identificado");
            socket.emit('logout');
            return socket.disconnect();
        }

        /*if(!activada){
            console.log("Cuenta no activada...");
            socket.emit('deactivated');
        }*/

        //Cambiar estado de coneccion
        await usuarioConectado(ids);
        console.log(ids.id)
        socket.join(ids.id);
        //obtener usuarios
        io.emit("getUsuarios",await getUsuarios(ids));

        
        socket.on("getUsuarios",async()=>{
            socket.emit("getUsuarios",await getUsuarios(ids));
        });
        

        //console.log("Cliente conectado!", ids)
        //console.log(token)

        socket.on('mensaje-personal', async(payload)=>{
            const mensaje = await grabarMensaje(payload);
            io.to(payload.para).emit('mensaje-personal',mensaje);
            io.to(payload.de).emit('mensaje-personal',mensaje);
            io.to(payload.para).emit("getUsuarios",await getUsuarios({id: payload.para, uuid: payload.uuid}));
        });

        socket.on('writingDown', async(payload)=>{
            io.to(payload.para).emit('writingDown',payload);
        });

        socket.on('writingUp', async(payload)=>{
            io.to(payload.para).emit('writingUp',payload);
        });
        
        /*socket.on("hello", () => {
            console.log("Say event On Hello")
        });*/
        /*socket.on("msjtoserver", (data) => {
            
            const {name,msj} = data
            let time: any = new Date()
            time=time.toLocaleString();
            console.log(data)
            console.log(msj)
            io.emit("msjfromserver",{name,msj,time})
        });*/
        socket.on("disconnect",async ()=>{
            await usuarioDesconectado(ids);
            io.emit("getUsuarios",await getUsuarios(ids));
            //socket.disconnect();
           // console.log("Cliente desconectado",ids);
        })
    });
} 

export{ioOnConnection}