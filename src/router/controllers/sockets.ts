import { Usuario } from "../../entities/Usuario";
import { Mensaje } from "../../entities/Mensaje";

const usuarioConectado = async ({id,uuid}:any)=>{
    const usuario:any = await Usuario.findOne(id);
    usuario.online=true;
    await usuario.save();

    return usuario;
}

const usuarioDesconectado = async ({id,uuid}:any)=>{
    const usuario:any = await Usuario.findOne(id);
    usuario.online=false;
    await usuario.save();

    return usuario;
}

const getUsuarios = async ()=>{
    const usuarios:any = await Usuario.find({order: {
        online: "DESC",
    }});
    
    return usuarios;
}

const grabarMensaje = async (payload:any) => {
    try{
       const mensaje:any = Mensaje.create(payload);
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