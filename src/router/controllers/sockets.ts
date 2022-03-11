import { Connection, getConnection, Repository } from "typeorm";
import { Mensaje } from "../../entities/mongoDB/Mensaje";
import { Usuario, getRepo } from "../../entities/postgres/Usuario";

const usuarioConectado = async ({id,uuid}:any)=>{
    
    const userRepo:any = getRepo();//.findOne(id);
    const usuario:any = await userRepo.findOne(id);
    
    usuario.online=true;
    await userRepo.save(usuario);
    
    return usuario;
}

const usuarioDesconectado = async ({id,uuid}:any)=>{
    
    const userRepo:any = getRepo();
    const usuario:any = await userRepo.findOne(id);
    usuario.online=false;
    await userRepo.save(usuario);

    return usuario;
}

const getUsuarios = async ()=>{
    const usersConn:Connection = getConnection('usersConn');
    const usuarios:any = await usersConn.getRepository(Usuario).find({order: {
        online: "DESC",
    }});
    
    return usuarios;
}

const grabarMensaje = async (payload:any) => {
    try{
       const chatConn:Connection = getConnection('chatConn');
       const mensaje:any = chatConn.getRepository(Mensaje).create(payload);
       //const usuario:any = await Usuario.findOne(payload.para);
       await mensaje.save();
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