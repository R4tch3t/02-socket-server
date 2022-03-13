//import { Connection, getConnection, Repository } from "typeorm";
import { getRepo } from "../../config/typeorm";
//import { Mensaje } from "../../entities/mongoDB/Mensaje";
//import { Usuario } from "../../entities/postgres/Usuario";

const usuarioConectado = async ({id,uuid}:any)=>{
    try{
        const userRepo:any = getRepo('usersConn','Usuario');//.findOne(id);
        const usuario:any = await userRepo.findOne(id);
        
        usuario.online=true;
        await userRepo.save(usuario);
        
        return usuario;
    }catch(e){
        console.log(e)
        return
    }
}

const usuarioDesconectado = async ({id,uuid}:any)=>{
    try{
        const userRepo:any = getRepo('usersConn','Usuario');
        const usuario:any = await userRepo.findOne(id);
        usuario.online=false;
        await userRepo.save(usuario);

        return usuario;
    }catch(e){
        console.log(e)
        return
    }
}

const getUsuarios = async ()=>{
    const userRepo:any = getRepo('usersConn','Usuario');
    const usuarios:any = await userRepo.find({order: {
        online: "DESC",
    }});
    
    return usuarios;
}

const grabarMensaje = async (payload:any) => {
    try{
       //const chatConn:Connection = getConnection('chatConn');
       const msgRepo:any = getRepo('chatConn','Mensaje');
       //payload.para+=""
       //payload.de+=""
       const mensaje:any = msgRepo.create(payload);
       //const usuario:any = await Usuario.findOne(payload.para);
       await msgRepo.save(mensaje);
       //mensaje.para=usuario
       return mensaje;
    }catch(e){
        console.log(e)
        return false
    }
}

export{
    usuarioConectado,
    usuarioDesconectado,
    getUsuarios,
    grabarMensaje
}