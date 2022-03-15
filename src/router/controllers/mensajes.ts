import { getRepo } from "../../config/typeorm";


const obtenerChat = async (req:any, res:any)=>{
    //const chatConn:Connection = getConnection('chatConn');
    const chatRepo:any = getRepo('chatConn','Mensajes');
    let {id,uuid} = req
    let {de} = req.params

    console.log(id)
    console.log(de)

    /*const mensajes:any = await Mensaje.find({
        where: [{de: id, para: de } , {de: de, para: id}],
        //relations: ["de","para"],
        order: {
            id: "ASC",
            time: "DESC"
        },
        skip: 0,
        take: 30,
        
    });*/ //OTHER DB
    id=parseInt(id);
    de=parseInt(de);//parse to ID int for a PrimaryGeneratedColumn SQL DB's
    const mensajes:any = await chatRepo.find({
        //de: { $type: 16 },
        //para: { $type: 16 }, //innecesary in these case, but is util
        where: {            
            $or:  [{de: id, para: de } , {de: de, para: id}]
        },
        order: {
            //id: "ASC",
            time: "ASC"
        },
        skip: 0,
        take: 30,

    });//mongo

    
    //await chatRepo.update({readed: true},{where: { de: id }})
    
    
    //console.log(mensajes)
    /*const last30: any = await Mensaje.createQueryBuilder("m")
    .leftJoinAndSelect("m.de","de")
    .leftJoinAndSelect("m.para","para")
    //.where("para.id=:para",{de: id, para: de})
    .where("de.id = :de AND para.id=:para",{de: id, para: de})
    .orWhere("de.id = :para AND para.id=:de")
    .orderBy("m.id", "ASC").orderBy("m.time", "DESC")
    .skip(0)
    .take(30)
    .getMany();*/

    res.json({
        ok: true,
        mensajes,
        uuid,
        de,
    });
}

const setReaded = (mensajes:any) => new Promise((resolve,reject)=>{
    let i = 1;
    const chatRepo:any = getRepo('chatConn','Mensajes');
    mensajes.map(async(m:any)=>{
        m.readed=true;
        await chatRepo.save(m);
        if(i===mensajes.length){
            resolve(mensajes)
        }
        i++;
    })
});

const upRead=async(req:any, res:any)=>{
    let {id} = req
    id=parseInt(id);
    const chatRepo:any = getRepo('chatConn','Mensajes');
    const unread:any = await chatRepo.find({
        //de: { $type: 16 },
        //para: { $type: 16 }, //innecesary in these case, but is util
        where: {            
            para: id, readed: false
        },
        order: {
            //id: "ASC",
            time: "ASC"
        }
    });

    if(unread&&unread.length>0){
        await setReaded(unread);
    }

    res.json({
        ok: true
    });
}

export{
    obtenerChat,
    upRead}