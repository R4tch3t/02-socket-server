import type {NextPage} from 'next'
import Router  from 'next/router';
import { useEffect, useState } from 'react';
import { useAppContext } from './auth/authContext';
import Logo from './components/Logo';
import {ModalError} from './components/ModalError';
import MainLogin from "./components/main/Login"
import {RedirecApp} from './router/RedirecApp';
import { Home } from './subPages/Home';

const Login: NextPage = () => {
  //let sE:any = ['']
  const auth = RedirecApp();
  //const [eLog, setELog] = useState({band: false, errors: ['']})
  const {login}:any = useAppContext()
  const [form, setForm] = useState({
    email:'test1@test.com',
    password: '1234',
    rememberme: false
  });
  const [modalE, setModalE] = useState(false);
  const [dataModal, setDataModal] = useState({title: '', txt:'', btnTxt:''})
  

  useEffect(()=>{
    const email = localStorage.getItem("email");
    if(email){
      setForm({...form,rememberme: true,email})
    }
  },[form]);

  const onChange = ({target}:any) => {
    const {name, value} = target;
    setForm({
      ...form,
      [name]: value
    });
  } 
  const toggleCheck = () => {
    setForm({
      ...form,
      rememberme: !form.rememberme
    });
  }
  const onSubmit = async (e:any) => {
    e.preventDefault();
    form.rememberme?
      localStorage.setItem("email",form.email):
      localStorage.removeItem("email");
    const ok = await login(form.email,form.password);
    if(!ok){
      //sE=["Verificar usuario y/o contraseña"]
      /*const errors:any=[];
      errors.push("Verificar usuario y/o contraseña.");
      setELog({band:!ok,errors});*/
      setDataModal({title: "Error", txt: "Verificar usuario y/o contraseña.", btnTxt: "Regresar al inicio" })
      setModalE(true);
    }
    console.log(ok)
  }

  const todoOk = () => {
    return (form.email.length>0&&form.password.length>0)?true:false
  }
  
  if(auth.checking){
    return <h1>ESPERE PORFAVOR...</h1>
  }

  if(auth.logged){
      Router.push("/");
  }

  return (
  <>
    {!auth.logged&&<Home Children={MainLogin} />}
  </>);
  
}

export default Login