import type {NextPage} from 'next'
import { Fragment, useState } from 'react'
import {
  EmojiHappyIcon,
  EmojiSadIcon,
  FireIcon,
  HeartIcon,
  PaperClipIcon,
  ThumbUpIcon,
  XIcon,
} from '@heroicons/react/solid'
import { Listbox, Transition } from '@headlessui/react'
import {MensajeDe} from './MensajeDe'
import {MensajePara} from './MensajePara'
import { useChatContext } from '../context/chat/ChatContext'
import Warning from './Warning'
import { useAppContext } from '../auth/authContext'
import { useSocketContext } from '../context/SocketContext'
//import { io, Socket } from "socket.io-client";
const moods = [
    { name: 'Excited', value: 'excited', icon: FireIcon, iconColor: 'text-white', bgColor: 'bg-red-500' },
    { name: 'Loved', value: 'loved', icon: HeartIcon, iconColor: 'text-white', bgColor: 'bg-pink-400' },
    { name: 'Happy', value: 'happy', icon: EmojiHappyIcon, iconColor: 'text-white', bgColor: 'bg-green-400' },
    { name: 'Sad', value: 'sad', icon: EmojiSadIcon, iconColor: 'text-white', bgColor: 'bg-yellow-400' },
    { name: 'Thumbsy', value: 'thumbsy', icon: ThumbUpIcon, iconColor: 'text-white', bgColor: 'bg-blue-500' },
    { name: 'I feel nothing', value: null, icon: XIcon, iconColor: 'text-gray-400', bgColor: 'bg-transparent' },
]
  
function classNames(...classes: any[]) {
    return classes.filter(Boolean).join(' ')
}
const Chatbox: NextPage = () => {
const {chatState}:any = useChatContext();
const {chatActivo} = chatState;
const [selected, setSelected] = useState(moods[5]);
const [mensaje, setMensaje] = useState('');
const {socket}:any = useSocketContext();
const {auth}:any = useAppContext();
//const {chatState}:any = useChatContext();

const onChange = ({target}:any) => {
  const {value}:any = target;
  setMensaje(value);
}

const onSubmit=(e:any)=>{
  e.preventDefault();
  if(mensaje.length===0){return;}

  socket.emit('mensaje-personal',
  {
    de:auth.id,
    para:chatState.chatActivo.id,
    mensaje
  });

  console.log(mensaje);
  setMensaje('');
}
//const socket: Socket = io();

/*socket.on("msjfromserver", (data)=>{
    const listmsj: any = document.getElementById("mensajes");
    listmsj.innerHTML += `<li>${data.msj}</li>`
});*/

const handleSend = () => {
    //socket.emit("hello");
    /*let name: any = document.getElementById("name");
    let msj: any = document.getElementById("msj");
    name=name.value;
    msj = msj.value;
    console.log(msj);
    socket.emit("msjtoserver",{name,msj})*/
}

console.log(chatState.mensajes)

if(!chatActivo.id){
  return(
    <div className='h-full wMid' >
      <Warning msg={"Seleciona un contacto en la barra laretal derecha para iniciar una conversación."} />
    </div>
  );
}else{
  return (<>
    <div className='h-full chatBoxMain'  >
      {/*<div className='w-full h-full .chatMsg chatFlow ' >*/}
      <div id='chatBox' className='h-full w-full chatBox mainFlow'  >
        {chatState.mensajes.map((msj:any,i:any)=>{
          return(((msj.para===auth.id) ?
              <MensajeDe key={i} name={chatState.chatActivo.nombre} txt={msj.mensaje} time={msj.time} />: 
              <MensajePara key={i} name={auth.name} txt={msj.mensaje} time={msj.time} />)) 
        })}
      </div>
        {/*<MensajeDe name={'Victor'} txt={"hola mundoasjdaksljdaslkdjaskldjasiodjoaisdjasi"} />
        <MensajePara name={'Victor2'} txt={"hola mundo 2"} />*/}
      
      {/*</div>*/}
    
    <div className="flex items-start space-x-4 w-full"  >
      <div className="flex-shrink-0">
        <img
          className="inline-block h-10 w-10 rounded-full"
          src="https://pm1.narvii.com/6442/ba5891720f46bc77825afc5c4dcbee06d3c66fe4_hq.jpg"
          alt=""
        />
      </div>
      <div className="min-w-0 flex-1" >
      <form  className="relative" onSubmit={onSubmit} >
        <div className="relative" >
          <div className="border border-gray-300 rounded-lg shadow-sm overflow-hidden focus-within:border-indigo-500 focus-within:ring-1 focus-within:ring-indigo-500">
            <label htmlFor="msj" className="sr-only">
              Enviar mensaje...
            </label>
            <textarea
              rows={3}
              name="msj"
              id="msj"
              className="block w-full py-3 border-0 resize-none focus:ring-0 sm:text-sm"
              placeholder="Enviar mensaje..."
              value={mensaje}
              onChange={onChange}
            />

            {/* Spacer element to match the height of the toolbar */}
            <div className="py-2" aria-hidden="true">
              {/* Matches height of button in toolbar (1px border + 36px content height) */}
              <div className="py-px">
                <div className="h-9" />
              </div>
            </div>
          </div>

          <div className="absolute bottom-0 inset-x-0 pl-3 pr-2 py-2 flex justify-between">
            <div className="flex items-center space-x-5">
              <div className="flex items-center">
                <button
                  type="button"
                  className="-m-2.5 w-10 h-10 rounded-full flex items-center justify-center text-gray-400 hover:text-gray-500"
                >
                  <PaperClipIcon className="h-5 w-5" aria-hidden="true" />
                  <span className="sr-only">Attach a file</span>
                </button>
              </div>
              <div className="flex items-center">
                <Listbox value={selected} onChange={setSelected}>
                  {({ open }) => (
                    <>
                      <Listbox.Label className="sr-only">Your mood</Listbox.Label>
                      <div className="relative">
                        <Listbox.Button className="relative -m-2.5 w-10 h-10 rounded-full flex items-center justify-center text-gray-400 hover:text-gray-500">
                          <span className="flex items-center justify-center">
                            {selected.value === null ? (
                              <span>
                                <EmojiHappyIcon className="flex-shrink-0 h-5 w-5" aria-hidden="true" />
                                <span className="sr-only">Add your mood</span>
                              </span>
                            ) : (
                              <span>
                                <div
                                  className={classNames(
                                    selected.bgColor,
                                    'w-8 h-8 rounded-full flex items-center justify-center'
                                  )}
                                >
                                  <selected.icon className="flex-shrink-0 h-5 w-5 text-white" aria-hidden="true" />
                                </div>
                                <span className="sr-only">{selected.name}</span>
                              </span>
                            )}
                          </span>
                        </Listbox.Button>

                        <Transition
                          show={open}
                          as={Fragment}
                          leave="transition ease-in duration-100"
                          leaveFrom="opacity-100"
                          leaveTo="opacity-0"
                        >
                          <Listbox.Options className="absolute z-10 mt-1 -ml-6 w-60 bg-white shadow rounded-lg py-3 text-base ring-1 ring-black ring-opacity-5 focus:outline-none sm:ml-auto sm:w-64 sm:text-sm">
                            {moods.map((mood) => (
                              <Listbox.Option
                                key={mood.value}
                                className={({ active }) =>
                                  classNames(
                                    active ? 'bg-gray-100' : 'bg-white',
                                    'cursor-default select-none relative py-2 px-3'
                                  )
                                }
                                value={mood}
                              >
                                <div className="flex items-center">
                                  <div
                                    className={classNames(
                                      mood.bgColor,
                                      'w-8 h-8 rounded-full flex items-center justify-center'
                                    )}
                                  >
                                    <mood.icon
                                      className={classNames(mood.iconColor, 'flex-shrink-0 h-5 w-5')}
                                      aria-hidden="true"
                                    />
                                  </div>
                                  <span className="ml-3 block font-medium truncate">{mood.name}</span>
                                </div>
                              </Listbox.Option>
                            ))}
                          </Listbox.Options>
                        </Transition>
                      </div>
                    </>
                  )}
                </Listbox>
              </div>
            </div>
            <div className="flex-shrink-0">
              <button
                type="submit"
                className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                Enviar
              </button>
            </div>
          </div>
        </div>
        </form>
      </div>
    </div>
    </div>
    </>
  )
}
}
export default Chatbox