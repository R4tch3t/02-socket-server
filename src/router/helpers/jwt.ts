import jwt from "jsonwebtoken";

const generarJWT = (id:any,uuid:any) => {
    return new Promise((resolve,reject)=>{
        const payload = {id,uuid}
        jwt.sign(payload,process.env.JWT_SECRET!,{expiresIn: '24h'},(err,token)=>{
            if(err){
                console.log(err)
                reject("No se pudo generar el JWT");
            }else{
                resolve(token);
            }
        })
    });
}

const comprobarJWT = (token="")=>{
    try{
        const {id, uuid}:any = jwt.verify(token,process.env.JWT_SECRET!);
        //TODO comprobar si cuenta es activada o no
        return [true, false, {id,uuid}];
    }catch(e){
        return [false,e];
    }
}

export {generarJWT, comprobarJWT}