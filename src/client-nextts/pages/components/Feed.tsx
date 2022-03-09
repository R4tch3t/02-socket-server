import type {NextPage} from 'next'
import { useAppContext } from '../auth/authContext';
import { useChatContext } from '../context/chat/ChatContext';
import {fetchConToken} from '../helpers/fetch';
import { scrollToBottom } from '../helpers/scrollToBottom';
import {types} from '../types/types';
/*const people = [
    {
      name: 'Lindsay Walton',
      imageUrl:
        'https://pm1.narvii.com/6442/ba5891720f46bc77825afc5c4dcbee06d3c66fe4_hq.jpg',
    },
    // More people...
  ]
const activityItems = [
{ id: 1, person: people[0], project: 'Workcation', commit: '2d89f0c8', environment: 'production', time: '1h' },
// More items...
]*/

export const Feed: NextPage = () => {
    const {chatState, dispatch}:any = useChatContext()
    const {auth}:any = useAppContext()
    const imageUrl='https://pm1.narvii.com/6442/ba5891720f46bc77825afc5c4dcbee06d3c66fe4_hq.jpg';

    const onClick = async ({target}:any,user:any) =>{
        dispatch({
            type: types.activarChat,
            payload: user
        });
        const resp = await fetchConToken(`mensajes/${user.id}`);
        dispatch({
            type: types.cargarMensajes,
            payload: resp.mensajes
        });
        scrollToBottom('chatBox');
    }
    /*const people = [{
        name: 'Victor',
        imageUrl:'https://pm1.narvii.com/6442/ba5891720f46bc77825afc5c4dcbee06d3c66fe4_hq.jpg',
      }]
    let [activityItems, setActivityItems]: any = useState([{id:0,person: people[0],msj:'Hola mundo', time: '1h'},{id:2,person: people[0],msj:'Hola mundo2', time: '2h'}]);
    */
    /*const socket: Socket = io();
    socket.on("msjfromserver", (data)=>{
        //const listmsj: any = document.getElementById("mensajes");
        //listmsj.innerHTML += `<li>${data.msj}</li>`
        const {msj, time, name} = data;
        //const name = "Victor"
        const imageUrl='https://pm1.narvii.com/6442/ba5891720f46bc77825afc5c4dcbee06d3c66fe4_hq.jpg';
        const id = activityItems.length+1;
        
        //const time = '1h'
        people.push({name,imageUrl});
        const person = people[people.length-1];
        activityItems=activityItems.concat([{id,person,msj,time}]);
        setActivityItems(activityItems);
    });*/

    if(chatState.usuarios.length>0){
        return (
            <div  >
            <ul role="list" className="divide-y divide-gray-200">
                {chatState.usuarios
                .filter((user:any)=>user.id!==auth.id)
                .map((user: any) => (
                <li key={user.id} className="py-4">
                    <div className="border-2 border-gray-200 border-dashed rounded-lg select-feed" onMouseUp={(e)=>{onClick(e,user)}} >
                    <div className="flex space-x-3">
                    <img className="h-6 w-6 rounded-full" src={imageUrl/*activityItem.person.imageUrl*/} alt="" />
                    <div className="flex-1 space-y-1">
                        <div className="flex items-center justify-between">
                        <h3 className="text-sm font-medium">{user.nombre}</h3>
                            {user.online&&<p className="text-sm text-green-500"><b>En Linea</b></p>}
                            {!user.online&&<p className="text-sm text-gray-500">{"2h"}</p>}
                        </div>
                        {user.msj&&<p className="text-sm text-gray-500">
                        {/*Deployed {activityItem.project} ({activityItem.commit} in master) to {activityItem.environment}*/}
                        {user.msj}
                        </p>}
                        {!user.msj&&<br/>}
                    </div>
                    </div>
                    </div>
                </li>
                ))}
            </ul>
            </div>
        )
    }else{
        return <></>
    }
}

export default ()=>null