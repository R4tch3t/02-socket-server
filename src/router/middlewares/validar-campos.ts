import { validationResult } from "express-validator";

const validarCampos = (req:any, res:any, next:any) => {
    const errores = validationResult(req);
    if(!errores.isEmpty()){
        return res.status(400).json({
            ok: false, 
            errors: errores.mapped()
        });
    }
    next();
}

export{validarCampos}