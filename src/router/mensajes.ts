import { Router } from "express";
import {validarJWT} from "./middlewares/validar-jwt"
import { obtenerChat, upRead } from "./controllers/mensajes";

const router = Router();

router.get("/:de",validarJWT,obtenerChat);

router.post("/upRead",validarJWT,upRead);

export default router;