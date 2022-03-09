import React, {useCallback, useEffect, useLayoutEffect, useState} from 'react';
//import { UsuariosDocument } from "./graphql/generated";
import { Client } from 'urql'
import {url} from "./variables/url"

const getUsers = async () => {

}

const UsuariosQ=()=>{
    console.log('???')
    console.log(process.env.URL_DEV)
    const [usuarios,setUsuarios]:any = useState(null);

    //const [usuariosResult] = useUsuariosQuery(); new Client({ url }).
    

    /*useEffect(()=>{
      const usuariosResult:any = (new Client({ url })).query(UsuariosDocument).toPromise()
      usuariosResult.then((v:any)=>{
        console.log("toPromise")
        const {usuarios} = v.data
        setUsuarios(usuarios)
        //useEffect(()=>{
        //  setUsuarios(usuarios)
        //},[])
        
        console.log(v)
        console.log(usuarios)
      })
    },[])*/
    
    //const users:any = usuariosResult&&usuariosResult.data ? usuariosResult.data : []
    //console.log(usuariosResult)
    return (
        <>
          
            {usuarios && <h2>  {usuarios.map((v:any,i:any)=>{return <p key={i} ><b>{`N°: ${i+1} - ID: ${v.uuid}`}</b></p> })}  </h2>}
    
        </>
    );
}



export default UsuariosQ