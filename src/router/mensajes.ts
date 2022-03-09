import { Router } from "express";
import {validarJWT} from "./middlewares/validar-jwt"
import { obtenerChat } from "./controllers/mensajes";

const router = Router();

router.get("/:de",validarJWT,obtenerChat);

export default router;