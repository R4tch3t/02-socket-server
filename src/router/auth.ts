import { Router } from "express";
import { crearUsuario, login, renew, updateUser, updateUserPass } from "./controllers/auth";
import { check } from "express-validator"
import { validarCampos } from "./middlewares/validar-campos";
import {validarJWT} from "./middlewares/validar-jwt"
const router = Router();

//Usuario nuevo
router.post("/new",[
    check("nombre","El nombre es obligatorio").not().isEmpty(),
    check("email","El email es obligatorio").isEmail(),
    check("password","El password es obligatorio").not().isEmpty(),
    validarCampos
],crearUsuario);

//Login
router.post("/",[
    check("email","El email es obligatorio").isEmail(),
    check("password","El password es obligatorio").not().isEmpty(),
    validarCampos
],login);


//Renovar Token
router.get("/renew",validarJWT,renew);

//Actualizar Usuario
router.post("/update",[
    check("user.nombre","El nombre es obligatorio").not().isEmpty(),
    check("user.email","El email es obligatorio").isEmail(),
    check("user.newEmail","El email es obligatorio").isEmail(),
    //check("user.password","El password es obligatorio").not().isEmpty(),
    validarCampos
],updateUser);

//Actualizar Password
router.post("/updatePass",[
    check("user.password","El password es obligatorio").not().isEmpty(),
    check("user.newPass","El password es obligatorio").not().isEmpty(),
    check("user.email","El email es obligatorio").isEmail(),
    //check("user.newEmail","El email es obligatorio").isEmail(),
    //check("user.password","El password es obligatorio").not().isEmpty(),
    validarCampos
],updateUserPass);

export default router;