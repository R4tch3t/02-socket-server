import React, { createContext, useCallback, useContext, useState } from "react";
import { useChatContext } from "../context/chat/ChatContext";
import {fetchConToken, fetchSinToken } from "../helpers/fetch";
import {types} from "../types/types";

const AuthContext = createContext({});

const initialState:any = {
    id: 0,
    uuid: null,
    checking: true,
    logged: false,
    name: null,
    email: null
}

 const AuthProvider = ({ children }:any) => {
    const [auth, setAuth] = useState(initialState)
    const {dispatch}:any = useChatContext();
    const login = async (email:any, password:any) => {
        const resp = await fetchSinToken("login",{email,password},"POST");
        console.log("loginAuthProv");
        console.log(resp)
        if(resp.ok){
            localStorage.setItem("token",resp.token);
            const {usuario} = resp
            setAuth({
                id: usuario.id,
                uuid: usuario.uuid,
                checking: false,
                logged: true,
                name: usuario.nombre,
                email: usuario.email
            })
        }
        return resp.ok
    }

    const signup = async (nombre:any, email:any, password:any) => {
        const resp = await fetchSinToken("login/new",{nombre,email,password},"POST");
        console.log("registerProv");
        console.log(resp);
        if(resp.ok){
            return resp.ok;
        }
        return resp.msg;
    }

    const verificaToken = useCallback( async()=>{
        const token = localStorage.getItem("token")
        if(!token){
            setAuth({
                checking: false,
                logged: false,
            });
            return false;
        }

        const resp = await fetchConToken("login/renew")

        if(resp.ok){
            localStorage.setItem("token",resp.token);
            const {usuario} = resp
            setAuth({
                id: usuario.id,
                uuid: usuario.uuid,
                checking: false,
                logged: true,
                name: usuario.nombre,
                email: usuario.email
            });
            return true;
        }else{
            setAuth({
                id: 0,
                uuid: null,
                checking: false,
                logged: true,
            });
            return false
        }

    }, []);

    const updateUser = useCallback( async(user:any,endpoint)=>{
        const token = localStorage.getItem("token")
        if(!token){
            setAuth({
                checking: false,
                logged: false,
            });
            return false;
        }

        const resp = await fetchConToken(endpoint,{user},"POST")

        if(resp.ok){
            localStorage.setItem("token",resp.token);
            const {usuario} = resp
            setAuth({
                id: usuario.id,
                uuid: usuario.uuid,
                checking: false,
                logged: true,
                name: usuario.nombre,
                email: usuario.email
            });
            return true;
        }else{
            /*setAuth({
                id: 0,
                uuid: null,
                checking: false,
                logged: true,
            });*/
            return false
        }

    }, []);
    

    const logout = () => {
        localStorage.removeItem("token");
        dispatch({type: types.cerrarSesion});

        setAuth({
            checking: false,
            logged: false,
        });
    }

    return (
            <AuthContext.Provider  value={{
                auth,
                login,
                signup,
                verificaToken,
                updateUser,
                logout
            }} >
                { children }
            </AuthContext.Provider>
    )
}
export default AuthProvider
export function useAppContext() {
    return useContext(AuthContext);
}