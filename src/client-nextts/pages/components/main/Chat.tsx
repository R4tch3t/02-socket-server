
import {
    AcademicCapIcon,
    BadgeCheckIcon,
    CashIcon,
    ClockIcon,
    ReceiptRefundIcon,
    UsersIcon,
  } from '@heroicons/react/outline'
import { useEffect, useState } from 'react';
import { useAppContext } from '../../auth/authContext';
import Login from './Login';
import Signup from './Signup';
import {Feed} from '../Feed'
import { useChatContext } from '../../context/chat/ChatContext';
import Chatbox from '../Chatbox';
  
function classNames(...classes:any) {
    return classes.filter(Boolean).join(' ')
}
const Home = () => {
  //console.log("Dimension")
  //console.log(window.innerHeight)
    const height = window.innerHeight*0.8;

    const {auth,logout}:any = useAppContext();
    const [state, setState]:any = useState({logBand: true, btnHome: [{html: 'Ver perfil', href: '#'}]});
    const user = {
        name: auth.name,
        email: auth.email,
        role: 'Alumno(a)',
        imageUrl:
        "https://pm1.narvii.com/6442/ba5891720f46bc77825afc5c4dcbee06d3c66fe4_hq.jpg",
    }
    
    const actions = [
        {
          icon: ClockIcon,
          name: 'Request time off',
          href: '#',
          iconForeground: 'text-teal-700',
          iconBackground: 'bg-teal-50',
        },
        {
          icon: BadgeCheckIcon,
          name: 'Benefits',
          href: '#',
          iconForeground: 'text-purple-700',
          iconBackground: 'bg-purple-50',
        },
        {
          icon: UsersIcon,
          name: 'Schedule a one-on-one',
          href: '#',
          iconForeground: 'text-sky-700',
          iconBackground: 'bg-sky-50',
        },
        { icon: CashIcon, name: 'Payroll', href: '#', iconForeground: 'text-yellow-700', iconBackground: 'bg-yellow-50' },
        {
          icon: ReceiptRefundIcon,
          name: 'Submit an expense',
          href: '#',
          iconForeground: 'text-rose-700',
          iconBackground: 'bg-rose-50',
        },
        {
          icon: AcademicCapIcon,
          name: 'Training',
          href: '#',
          iconForeground: 'text-indigo-700',
          iconBackground: 'bg-indigo-50',
        },
      ]

      const {chatState}:any = useChatContext();
      let onlineU = 0;
      const listaU = chatState.usuarios.length-1;
      chatState.usuarios.filter((user:any)=>user.id!==auth.id).map((v:any)=>{
        onlineU+=v.online??1
      });
      const offlineU=listaU-onlineU
      const stats = [
        { label: 'Usuarios en lista', value: listaU },
        { label: (onlineU === 1? 'Usuario conectado' : 'Usuarios conectados'), value: onlineU },
        { label: (offlineU === 1? 'Usuario desconectado':'Usuarios desconectados'), value: offlineU },
      ]

     // let [btnHome, setBtnHome]:any = useState([{html: 'Ver perfil', href: '#'}]);
      const ShowGridLog = () => {
        setState({...state, 
            logBand: !state.logBand,
            //btnHome: [{html: 'Iniciar sesión', onMouseUp: ShowGridLog }]
        });
        //setLogBand(!logBand);
        //setBtnHome( [{html: 'Iniciar sesión', onMouseUp: ShowGridLog }]);  
      }
      
      console.log('home:')
      console.log(auth)

      if(!auth.email){
        state.btnHome = [{
            html: state.logBand?'Registrar cuenta':'Iniciar sesión',
            onMouseUp: ShowGridLog 
        }];
      }else{
        state.btnHome = [{html: 'Ver perfil', href: '/perfil', onMouseUp: null}];
      }

      const {logBand, btnHome} = state 

    return (
        <main className="-mt-24 pb-8">
              <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:max-w-7xl lg:px-8">
                <h1 className="sr-only">Perfil</h1>
                {// Main 3 column grid
                }
                <div className="grid grid-cols-1 gap-4 items-start lg:grid-cols-3 lg:gap-8">
                  {// Left column 
                  }
                  <div className="grid grid-cols-1 gap-4 lg:col-span-2 h-full">
                    {// Welcome panel 
                    }
                    <section aria-labelledby="profile-overview-title">
                      <div className="rounded-lg bg-white overflow-hidden shadow">
                        <h2 className="sr-only" id="profile-overview-title">
                          Resumen del perfil
                        </h2>
                        <div className="bg-white p-6">
                          <div className="sm:flex sm:items-center sm:justify-between">
                            <div className="sm:flex sm:space-x-5">
                              <div className="flex-shrink-0">
                                <img className="mx-auto h-20 w-20 rounded-full" src={user.imageUrl} alt="" />
                              </div>
                              <div className="mt-4 text-center sm:mt-0 sm:pt-1 sm:text-left">
                                <p className="text-sm font-medium text-gray-600">Bienvenido(a),</p>
                                <p className="text-xl font-bold text-gray-900 sm:text-2xl">{user.name}</p>
                                {/*<p className="text-xl font-bold text-gray-900 sm:text-2xl">{auth.email}</p>*/}
                                <p className="text-sm font-medium text-gray-600">{user.role}</p>
                              </div>
                            </div>
                            
                            <div className="mt-5 flex justify-center sm:mt-0">
                              
                              {
                                btnHome.map((b:any,i:any)=>{
                                    return <a
                                    key={i}
                                    href={b.href}
                                    onMouseUp={b.onMouseUp}
                                    className="flex tabSettings justify-center items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
                                  >
                                    {b.html}
                                  </a>
                                })
                              }

                            </div>
                            
                          </div>
                        </div>
                        <div className="border-t border-gray-200 bg-gray-50 grid grid-cols-1 divide-y divide-gray-200 sm:grid-cols-3 sm:divide-y-0 sm:divide-x">
                          {stats.map((stat) => (
                            <div key={stat.label} className="px-6 py-5 text-sm font-medium text-center">
                              <span className="text-gray-900">{stat.value}</span>{' '}
                              <span className="text-gray-600">{stat.label}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </section>
    
                    {// Actions panel 
                    }
                    <section aria-labelledby="quick-links-title" style={{height}} >
                    <div className="h-full rounded-lg bg-white shadow border-2 border-gray-200 border-dashed rounded-lg"  > 
                      <Chatbox />
                    </div>
                      {/*<div className="rounded-lg bg-gray-200 overflow-hidden shadow divide-y divide-gray-200 sm:divide-y-0 sm:grid sm:grid-cols-2 sm:gap-px">
                        <h2 className="sr-only" id="quick-links-title">
                          Quick links
                        </h2>
                        {actions.map((action, actionIdx) => (
                          <div
                            key={action.name}
                            className={classNames(
                              actionIdx === 0 ? 'rounded-tl-lg rounded-tr-lg sm:rounded-tr-none' : '',
                              actionIdx === 1 ? 'sm:rounded-tr-lg' : '',
                              actionIdx === actions.length - 2 ? 'sm:rounded-bl-lg' : '',
                              actionIdx === actions.length - 1 ? 'rounded-bl-lg rounded-br-lg sm:rounded-bl-none' : '',
                              'relative group bg-white p-6 focus-within:ring-2 focus-within:ring-inset focus-within:ring-cyan-500'
                            )}
                          >
                            <div>
                              <span
                                className={classNames(
                                  action.iconBackground,
                                  action.iconForeground,
                                  'rounded-lg inline-flex p-3 ring-4 ring-white'
                                )}
                              >
                                <action.icon className="h-6 w-6" aria-hidden="true" />
                              </span>
                            </div>
                            <div className="mt-8">
                              <h3 className="text-lg font-medium">
                                <a href={action.href} className="focus:outline-none">
                                  {// Extend touch target to entire panel 
                                  }
                                  <span className="absolute inset-0" aria-hidden="true" />
                                  {action.name}
                                </a>
                              </h3>
                              <p className="mt-2 text-sm text-gray-500">
                                Doloribus dolores nostrum quia qui natus officia quod et dolorem. Sit repellendus qui ut at
                                blanditiis et quo et molestiae.
                              </p>
                            </div>
                            <span
                              className="pointer-events-none absolute top-6 right-6 text-gray-300 group-hover:text-gray-400"
                              aria-hidden="true"
                            >
                              <svg
                                className="h-6 w-6"
                                xmlns="http://www.w3.org/2000/svg"
                                fill="currentColor"
                                viewBox="0 0 24 24"
                              >
                                <path d="M20 4h1a1 1 0 00-1-1v1zm-1 12a1 1 0 102 0h-2zM8 3a1 1 0 000 2V3zM3.293 19.293a1 1 0 101.414 1.414l-1.414-1.414zM19 4v12h2V4h-2zm1-1H8v2h12V3zm-.707.293l-16 16 1.414 1.414 16-16-1.414-1.414z" />
                              </svg>
                            </span>
                          </div>
                        ))}
                      </div>*/}

                    </section>
                  </div>
    
                  {// Right column 
                  }
                  <div className="grid grid-cols-1 gap-4">
                    {// Announcements 
                    }
                    <section aria-labelledby="announcements-title" style={{maxHeight: 700}} >
                      <div className="rounded-lg bg-white overflow-hidden shadow">
                        <div className="p-2">
                          
                          <div className="flow-root">
                            {/* login */}  
                            
                            {!auth.logged&&logBand&&<Login />}
                            {!auth.logged&&!logBand&&<Signup />}
                            {auth.logged&&<Feed />}

                          </div>

                        </div>
                      </div>
                    </section>
    
                    {/*<section aria-labelledby="recent-hires-title">
                      <div className="rounded-lg bg-white overflow-hidden shadow">
                        <div className="p-6">
                          <h2 className="text-base font-medium text-gray-900" id="recent-hires-title">
                            Recent Hires
                          </h2>
                          <div className="flow-root mt-6">
                            <ul role="list" className="-my-5 divide-y divide-gray-200">
                              {
                              recentHires.map((person) => (
                                <li key={person.handle} className="py-4">
                                  <div className="flex items-center space-x-4">
                                    <div className="flex-shrink-0">
                                      <img className="h-8 w-8 rounded-full" src={person.imageUrl} alt="" />
                                    </div>
                                    <div className="flex-1 min-w-0">
                                      <p className="text-sm font-medium text-gray-900 truncate">{person.name}</p>
                                      <p className="text-sm text-gray-500 truncate">{'@' + person.handle}</p>
                                    </div>
                                    <div>
                                      <a
                                        href={person.href}
                                        className="inline-flex items-center shadow-sm px-2.5 py-0.5 border border-gray-300 text-sm leading-5 font-medium rounded-full text-gray-700 bg-white hover:bg-gray-50"
                                      >
                                        View
                                      </a>
                                    </div>
                                  </div>
                                </li>
                              ))
                              }
                            </ul>
                          </div>
                          <div className="mt-6">
                            <a
                              href="#"
                              className="w-full flex justify-center items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
                            >
                              View all
                            </a>
                          </div>
                        </div>
                      </div>
                    </section>*/}

                  </div>
                </div>
              </div>
            </main>
    )
}

export default Home