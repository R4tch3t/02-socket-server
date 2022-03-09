import { urlApi } from "../variables/url"
export const fetchSinToken = async (endpoint:any,data:any, method="GET") => {
    const baseUrl = `${urlApi}/${endpoint}`
    
    if(method==="GET"){
        const resp = await fetch(baseUrl)
        return await resp.json()
    }else{
        const resp = await fetch(baseUrl,{
            method,
            headers:{ 
                "Content-type": "application/json"
            },
            body: JSON.stringify(data)
        });
        return await resp.json()
    } 
}

export const fetchConToken = async (endpoint:any,data:any='', method="GET") => {
    const baseUrl = `${urlApi}/${endpoint}`
    const token = localStorage.getItem("token")||'';



    if(method==="GET"){
        const resp = await fetch(baseUrl,{headers: {
            "x-token": token
        }});
        return await resp.json()
    }else{
        console.log(JSON.stringify(data))
        const resp = await fetch(baseUrl,{
            method,
            headers:{ 
                "Content-type": "application/json",
                "x-token": token
            },
            body: JSON.stringify(data)
        });
        return await resp.json()
    } 
}

export default ()=>null