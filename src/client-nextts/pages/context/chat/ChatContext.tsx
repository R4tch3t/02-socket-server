import { createContext, useContext, useReducer } from "react";
import {chatReducer} from "./chatReducer";

const ChatContext = createContext({});

const initialState={
    id:0,uuid:null,
    chatActivo:{id: null,uuid:null},//uuid al que se le enviara msj
    usuarios: [],
    mensajes: [] //chat seleccionaado
}

const  ChatProvider = ({children}:any)=>{
    const [chatState, dispatch] = useReducer(chatReducer, initialState);
    return (
        <ChatContext.Provider value={{
           chatState,
           dispatch
        }} >
            {children}
        </ChatContext.Provider>
    )
} 

export function useChatContext() {
    return useContext(ChatContext);
}

export default ChatProvider