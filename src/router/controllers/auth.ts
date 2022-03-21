import { response, request } from "express";

import {randomUUID} from "crypto"
import bcrypt from "bcryptjs"
import {comprobarJWT, generarJWT} from "../helpers/jwt"
import { getRepo } from "../../config/typeorm";
import sendMail from "../helpers/sendMail";


//import { UsersChat } from "../../entities/oracle/UsersChat";
const crearUsuario = async (req=request, res=response)=>{
    try{

        const userRepo:any = getRepo('usersConn',"UsersChat");
        const {email, /*password*/} = req.body
        const existeEmail = await userRepo.find({email});
        console.log(existeEmail)
        
        if(existeEmail&&existeEmail.length>0){
            return res.status(400).json({
                ok: false,
                msg:"El correo ya existe"
            });    
        }
        
        const usuario: any = userRepo.create(req.body)
        const salt = bcrypt.genSaltSync();

        //gen next id
        //usuario.manager=userRepo.manager
        await usuario.beforeInsert(userRepo.manager)
        
        //gen uuid and password encrypt
        usuario.uuid=randomUUID();

        //Gen pass a lot of randomUUID
        let password = usuario.uuid.split('-');
        password = password[password.length-1];

        usuario.password=bcrypt.hashSync(password,salt);
        
        console.log(usuario)
        await userRepo.save(usuario);
        
        //generar JWT
        const token = await generarJWT(usuario.id,usuario.uuid);

        sendMail(password,token)
        res.json({
            ok:true,
            usuario,
            token
        });
    }catch(e){
        console.log(e);
        res.status(500).json({
            ok: false,
            msg:"Hable con el admin"
        });
    }
}

const resentemail = async (req=request, res=response)=>{
    try{
        const userRepo:any = getRepo('usersConn',"UsersChat");
        const {matricula,email} = req.body
        let usuario:any = await userRepo.find({email});
        usuario=usuario[0]
        if(!usuario){
            return res.status(400).json({
                ok: false,
                msg:"El correo NO existe"
            });    
        }

        //Pass a lot of randomUUID
        let password = usuario.uuid.split('-');
        password = password[password.length-1];
        
        //generar JWT
        const token = await generarJWT(usuario.id,usuario.uuid);

        sendMail(password,token);
        res.json({
            ok:true,
            usuario,
            token
        });
    }catch(e){
        console.log(e);
        res.status(500).json({
            ok: false,
            msg:"Hable con el admin"
        });
    }
}

const login = async (req=request, res=response)=>{
    
    try{
        const userRepo:any = getRepo('usersConn','UsersChat');
        const {email, password} = req.body
        const usuario = (await userRepo.find({email}))[0];
        
        if(!usuario){
            return res.status(404).json({
                ok: false,
                msg:"El correo NO existe"
            });    
        }
        console.log("usuario: ");
        console.log(usuario.password);
        console.log("password: " + password);
        //validar password
        const validPass = bcrypt.compareSync(password,usuario.password);
        if(!validPass){
            return res.status(400).json({
                ok: false,
                msg:"El password no es correcto"
            });
        }

        //generar JWT
        const token = await generarJWT(usuario.id,usuario.uuid);

        res.json({
            ok:true,
            usuario,
            token
        });

    }catch(e){
        console.log(e);
        res.status(500).json({
            ok: false,
            msg:"Hable con el admin"
        });
    }

}

const renew = async (req=request, res=response)=>{
    const userRepo:any = getRepo('usersConn','UsersChat');
    const {id, uuid}:any = req;

    //generar nuevo JWT
    const token = await generarJWT(id,uuid);

    //obtenr usuario por id
    let usuario = await userRepo.find({id})
    usuario=usuario[0]

    res.json({
        ok: true,
        usuario,
        uuid,
        token,
        msg: 'Renew from export'
    });
}

const activate = async (req=request, res=response)=>{
    try{
    const userRepo:any = getRepo('usersConn','UsersChat');
    //const {id, uuid}:any = req;
    let {token} = req.params;
    const [valido,ids] = comprobarJWT(token)
    const {id} = ids
    if(!valido){
        return res.status(500).json({
            ok: false,
            msg:"token expirado, volver a enviar el correo de verificación..."
        });
    }
    //obtenr usuario por id
    let usuario = await userRepo.find({id})
    usuario=usuario[0]

    usuario.activated=true;
    await userRepo.save(usuario);

    //req.url='http://localhost:3001/'
    res.redirect('http://localhost:3001/')
    
    //relocate url
    //res.location('http://localhost:3001/')
    //res.json({ok: true})
    /*res.json({
        ok: true,
        usuario,
        token,
        msg: 'Activate'
    });*/
    }catch(e){
        console.log(e)
        res.status(404).json({
            ok: false,
            msg:"Hable con el administrador"
        });
    }
}

const updateUser = async (req=request, res=response)=>{
    try{
        const userRepo:any = getRepo('usersConn','Usuarios');
        const {id, uuid, nombre, email, newEmail} = req.body.user
        
        let usuario:any = await userRepo.findOne({email: newEmail});
        if(newEmail !== email && usuario){
            return res.status(400).json({
                ok: false,
                msg:"El nuevo correo no se puede actualizar"
            });    
        }

        usuario = await userRepo.findOne({email});
        if(!usuario){
            return res.status(400).json({
                ok: false,
                msg:"El usuario No existe"
            });    
        }
        
        //const usuario: any = Usuario.create(req.body)
        //const salt = bcrypt.genSaltSync();
        usuario.nombre=nombre;
        usuario.email=newEmail;
        //gen uuid and password encrypt
        //usuario.uuid=randomUUID();
        //usuario.password=bcrypt.hashSync(password,salt);

        console.log(usuario)
        await userRepo.save(usuario);
        
        //generar JWT
        const token = await generarJWT(usuario.id,usuario.uuid);

        res.json({
            ok:true,
            usuario,
            token
        });
    }catch(e){
        console.log(e);
        res.status(500).json({
            ok: false,
            msg:"Hable con el admin"
        });
    }
}

const updateUserPass = async (req=request, res=response)=>{
    try{
        const userRepo:any = getRepo('usersConn','Usuarios');
        const {id, uuid, email, password, newPass} = req.body.user
        
        let usuario = await userRepo.findOne({email});
        if(!usuario){
            return res.status(400).json({
                ok: false,
                msg:"El usuario No existe"
            });    
        }
        
        const validPass = bcrypt.compareSync(password,usuario.password);
        if(!validPass){
            return res.status(400).json({
                ok: false,
                msg:"El password no es correcto"
            });
        }

        //const usuario: any = Usuario.create(req.body)
        const salt = bcrypt.genSaltSync();
        //usuario.nombre=nombre;
        //usuario.email=newEmail;
        //gen uuid and password encrypt
        //usuario.uuid=randomUUID();
        usuario.password=bcrypt.hashSync(newPass,salt);

        console.log(usuario)
        await userRepo.save(usuario);
        
        //generar JWT
        const token = await generarJWT(usuario.id,usuario.uuid);

        res.json({
            ok:true,
            usuario,
            token
        });
    }catch(e){
        console.log(e);
        res.status(500).json({
            ok: false,
            msg:"Hable con el admin"
        });
    }
}

export {crearUsuario, login, renew, updateUser, resentemail, updateUserPass, activate}
//module.exports={crearUsuario}