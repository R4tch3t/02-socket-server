import React, { useContext, useEffect } from 'react';
import { createContext } from 'react';
import {useSocket} from '../hooks/useSocket'
import { useAppContext } from '../auth/authContext';
import { useChatContext } from './chat/ChatContext';
import {types} from '../types/types';
import {scrollToBottomAnimated} from '../helpers/scrollToBottom';
import writingState from '../helpers/writingState';

const SocketContext = createContext({});


const SocketProvider = ({ children }:any) => {

    const { socket, online, conectarSocket, desconectarSocket } = useSocket('http://localhost:3000');
    const {auth,logout}:any = useAppContext();
    const {dispatch}:any = useChatContext();

    useEffect(()=>{
        if(auth.logged){
            conectarSocket()
        }
    },[auth,conectarSocket]);

    useEffect(()=>{
        if(!auth.logged){
            desconectarSocket()
        }
    },[auth,desconectarSocket]);

    //Escuchar los cambios en los usuarios conectados

    useEffect(()=>{
        socket?.on("getUsuarios",(usuarios:any)=>{
            dispatch({
                type: types.usuariosCargados,
                payload: usuarios
            })
        })
    },[socket,dispatch]);

    useEffect(()=>{
        socket?.on("logout",()=>{
            logout()
        })
    },[socket,logout]);

    useEffect(()=>{
        socket?.on('mensaje-personal',(mensaje:any)=>{
            dispatch({
                type: types.nuevoMensaje,
                payload: mensaje
            });
                scrollToBottomAnimated('chatBox');
        });
    },[socket,dispatch])

    useEffect(()=>{
        
        socket?.on('writingDown',(payload:any)=>{
            
            let {usuarios} = payload;
            usuarios = writingState(usuarios,payload.de,true);
            console.log("writingDown")
            console.log(usuarios)
            dispatch({
                type: types.usuariosCargados,
                payload: usuarios
            });
                //scrollToBottomAnimated('chatBox');
        });

    },[socket,dispatch])

    useEffect(()=>{
        
        socket?.on('writingUp',(payload:any)=>{
            
            let {usuarios} = payload;
            usuarios = writingState(usuarios,payload.de,false);
            dispatch({
                type: types.usuariosCargados,
                payload: usuarios
            });
                //scrollToBottomAnimated('chatBox');
        });
        
    },[socket,dispatch])

    return (
        <SocketContext.Provider value={{ socket, online }}>
            { children }
        </SocketContext.Provider>
    )
}

export function useSocketContext(){
    return useContext(SocketContext);
}

export default SocketProvider