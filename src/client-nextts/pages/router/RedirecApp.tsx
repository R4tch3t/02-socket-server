import { useEffect } from 'react';
import { useAppContext } from '../auth/authContext';

export const RedirecApp=() => {
    const {auth, verificaToken}:any = useAppContext();
    
    useEffect(()=>{
        verificaToken();
    },[]);

    console.log(auth)

    /*if(auth.logged){
        Router.push("/");
    }*/
    return auth
}

export default ()=>null