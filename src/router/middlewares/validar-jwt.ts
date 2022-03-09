import  jwt  from "jsonwebtoken";

const validarJWT = (req:any, res:any, next:any) => {
    try{
        const token = req.header("x-token");
        
        //validar token
        if(!token){
            return res.status(401).json({
                ok: false,
                msg: "No hay token en la petición"
            })
        }

        const {id,uuid}:any = jwt.verify(token,process.env.JWT_SECRET!)
        req.id=id
        req.uuid=uuid
        

        next();
    }catch(e){
        return res.status(401).json({
            ok: false,
            msg: 'Token no es valido'
        })
    }
}

export {validarJWT}