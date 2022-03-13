import React from 'react';
import Router from 'next/router';
import {Home} from './subPages/Home';
import ChatHomen from './components/main/Chat'
import { RedirecApp } from './router/RedirecApp';
//import Login from "../login"
//import Registro from "../sigin"
const AppLinker = () =>{
  const auth = RedirecApp();
//const {auth, verificaToken}:any = useAppContext();
  
  /*useEffect(()=>{
    verificaToken();
  },[]);*/

  if(auth.checking){
    return <h1>ESPERE PORFAVOR...</h1>
  }

  //console.log(auth)

  if(!auth.logged){
    /*useEffect(()=>{
        verificaToken();
      },[]);*/
    Router.push("/");
  }

return (
      <>
        <Home Children={ChatHomen} link='Chat' />
      </>
);
}
export default AppLinker