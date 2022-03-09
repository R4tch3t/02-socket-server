import { DocumentNode } from "graphql";
import {Resolver, Query, Mutation, Arg, Field, InputType, Int } from "type-graphql";
import { Column } from "typeorm";
import { gql } from "urql";
import { Mensaje } from "../entities/Mensaje";
import { Usuario } from "../entities/Usuario";

const postsQueryDocument = gql`
query Mensajes ($paraUuid: String!, $paraId: Int!, $deUuid: String!, $deId: Int!) {
    mensajes(paraUuid: $paraUuid, paraId: $paraId, deUuid: $deUuid, deId: $deId) {
      id
      mensaje
      time
      de {
        id
        uuid
        email
      }
      para {
        id
        uuid
        email
      }
    }
  }
`

const Posts = () => {
    const { data } = useCustomFetchGraphQLData(postsQueryDocument);
}
  
function useCustomFetchGraphQLData(postsQueryDocument: DocumentNode): { data: any; } {
    throw new Error('Function not implemented.');
}

@InputType()
class MensajeInput {
    @Field()
    mensaje!: string
    //@Column()
    //de!: Usuario
    //@Column()
    //para!: Usuario
}

@InputType()
class de_user {
    @Field(()=>Int, {nullable: true})
    id!: number
    @Field(()=>String, {nullable: true})
    nombre!: string
    @Field(()=>String, {nullable: true})
    email!: string
}

@InputType()
class para_user {
    @Field(()=>Int, {nullable: true})
    id!: number
    @Field(()=>String, {nullable: true})
    nombre!: string
    @Field(()=>String, {nullable: true})
    email!: string
}

@InputType()
class MensajeUpdateInput {

    @Field(()=>String, {nullable: true})
    mensaje?: string;

}



@Resolver()
export class MensajeResolver {
    addToUser = (users: any[]): any => new Promise((resolve,reject)=>{
        const userSaved: Usuario[] = [];
        users.forEach(async (user,i)=>{
            const { id, nombre, email } = await user;

            let para_user = await Usuario.findOne({where:{email}})
            if(!para_user){
                para_user = await Usuario.findOne({where:{nombre}})
            }
            
            if(!para_user){
                para_user = await Usuario.findOne({where:{id}})
            }
            
            userSaved.push(para_user!)

            if(i===users.length-1){
                resolve(userSaved)
            }
            
        })
    });

    @Mutation(()=> Mensaje)
    async createMensaje(
        @Arg("msjInput", () => MensajeInput) msjInput: MensajeInput,
        @Arg("de", () => de_user) de: de_user,
        @Arg("para", () => para_user) para: para_user
    ){
        //const newMensaje = Mensaje.create(msjInput);
        const newMensaje = Mensaje.create(msjInput);
        //newMensaje.para=[]
        let de_user = await Usuario.findOne({where:{id: de.email}})
        let para_user = await Usuario.findOne({where:{id: para.email}})
        
        if(!de_user){
            de_user = await Usuario.findOne({where:{nombre: de.nombre}})
        }
        if(!de_user){
            de_user = await Usuario.findOne({where:{email: de.id}})
        }

        if(!para_user){
            para_user = await Usuario.findOne({where:{nombre: para.nombre}})
        }
        if(!para_user){
            para_user = await Usuario.findOne({where:{email: para.id}})
        }

        //const arrPara: [Usuario] = await this.addToUser(para)
        newMensaje.de = de_user!
        newMensaje.para = para_user!
        //newMensaje.para=newMensaje.para.concat(arrPara)
        
        return await newMensaje.save();
        
    }

    @Mutation(()=>Boolean)
    async deleteMensaje(@Arg("id", () => Int) id: number){
        await Mensaje.delete(id)
        return true
    }

    @Mutation(()=>Boolean)
    async updateMensaje (
        @Arg("id",()=>Int) id: number,
        @Arg("fields",()=>MensajeUpdateInput) fields: MensajeUpdateInput
    ){
        await Mensaje.update({id}, fields)
        return true
    }
    

    @Query(()=>[Mensaje])
    mensajes(
        @Arg("deId",()=>Int) deId: number,
        @Arg("deUuid",()=>String) deUuid: string,
        @Arg("paraId",()=>Int) paraId: number,
        @Arg("paraUuid",()=>String) paraUuid: string,
    ){
        return Mensaje.find({ 
            where: [{de: deId, para: paraId } , {de: paraId, para: deId}],
            relations: ["de","para"],
            order: {
                id: "ASC",
                time: "DESC"
            },
            skip: 0,
            take: 30, 
        });
    }
}