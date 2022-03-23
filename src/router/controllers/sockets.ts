//import { Connection, getConnection, Repository } from "typeorm";
import { getRepo } from "../../config/typeorm";
//import { Mensaje } from "../../entities/mongoDB/Mensaje";
//import { Usuario } from "../../entities/postgres/Usuario";

const usuarioConectado = async ({id,uuid}:any)=>{
    try{
        const userRepo:any = getRepo('usersConn','UsersChat');//.findOne(id);
        let usuario:any = await userRepo.find({
            where: {id},
            relations:['alumno']
        });
        console.log(usuario)
        usuario=usuario[0];
        
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
        const userRepo:any = getRepo('usersConn','UsersChat');
        let usuario:any = await userRepo.find({
            where: {id},
            relations:['alumno']
        });
        usuario=usuario[0];
        
        usuario.online=false;
        usuario.lastConn=new Date();
        await userRepo.save(usuario);

        return usuario;
    }catch(e){
        console.log(e)
        return
    }
}

const getUsersMsg = (usuarios:any) => new Promise((resolve,reject)=>{
    /*if(!usuarios.length){
        resolve(1)
    }*/
    const chatRepo:any = getRepo('chatConn','Mensajes');
    let i = 1;
    //console.log("de_ "+de)
    usuarios.map(async(user:any)=>{
        const de = parseInt(user.id);
        const lastMsg:any = await chatRepo.find({
            where: {            
                /*$or: [{de: para, para: de},{de, para}],*/de, readed: false
            },
            order: {
                //id: "ASC",
                time: "DESC"
            },
            skip: 0,
            take: 1,
    
        });//mongo
        console.log(i)
        console.log(usuarios.length)
        console.log(lastMsg) 
        user.lastMsg = lastMsg[0]
        //user.lastMsg=lastMsg
        if(i===usuarios.length){
            resolve(usuarios)
        }
        i++;
    });
})

const getUsuarios = async ({id,uuid}:any)=>{
    
    const userRepo:any = getRepo('usersConn','UsersChat');
    
    let usuarios:any = await userRepo.find({
        order: {
            lastConn: 'DESC',
            online: "DESC",
        },
        relations:['alumno']
    });

    id=parseInt(id)
    if(usuarios&&usuarios.length>0){
        usuarios = await getUsersMsg(usuarios);
    }

    console.log("lastMsg");
        console.log(usuarios);
    
    return usuarios;
}

const grabarMensaje = async (payload:any) => {
    try{
       //const chatConn:Connection = getConnection('chatConn');
       const msgRepo:any = getRepo('chatConn','Mensajes');
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