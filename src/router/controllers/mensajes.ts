import { getRepo } from "../../config/typeorm";
import { Mensaje } from "../../entities/mongoDB/Mensaje"


const obtenerChat = async (req:any, res:any)=>{
    //const chatConn:Connection = getConnection('chatConn');
    const msgRepo:any = getRepo('chatConn','Mensaje');
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
    const mensajes:any = await msgRepo.find({
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

export{obtenerChat}