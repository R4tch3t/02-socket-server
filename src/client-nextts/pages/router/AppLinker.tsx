import Link from 'next/link'
import Router from 'next/router';
import React, { useEffect } from 'react';
import { useAppContext } from '../auth/authContext';

import Chat from "../subPages/Chat"
import {RedirecApp} from './RedirecApp';
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
    Router.push("/login");
  }

return (<>
    <header >
        <Link href="/" > </Link>
        <Link href="/login" > </Link>
        <Link href="/signup" > </Link>
        <Link href="/perfil" > </Link>
        {/*<ul>
            <li>
            <Link href="/">
                <a>Home</a>
            </Link>
            </li>
            <li>
            <Link href="/login">
                <a>login</a>
            </Link>
            </li>
            <li>
            <Link href="/sigin">
                <a>sigin</a>
            </Link>
            </li>
            <li>
            <Link href="/post/second">
                <a>Second Post</a>
            </Link>
            </li>
        </ul>*/}
    </header>
    {auth.logged&&<Chat/>}
    </>
);
}
export default AppLinker