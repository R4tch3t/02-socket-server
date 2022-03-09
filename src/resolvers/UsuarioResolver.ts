import {Resolver, Query, Mutation, Arg, Field, InputType, Int } from "type-graphql";
import { Usuario } from "../entities/Usuario";
import {randomUUID} from "crypto"
import { gql } from "urql";
import { DocumentNode } from "graphql";

const postsQueryDocument = gql`
  query Usuarios {
    usuarios {
        id
        uuid
        nombre
        email
        password
    }
  }

  mutation createUser($user: UsuarioInput!){
    createUser(user: $user) {
     id
     uuid
     nombre
     email 
    }
  }

`

const createUser = () => {
    const { data } = useCustomFetchGraphQLData(postsQueryDocument);
}
  
function useCustomFetchGraphQLData(postsQueryDocument: DocumentNode): { data: any; } {
    throw new Error('Function not implemented.');
}

@InputType()
class UsuarioInput {
    @Field({nullable: true})
    uuid!: string
    @Field()
    nombre!: string
    @Field()
    email!: string
    @Field()
    password!: string
    @Field()
    online!: boolean
}

@InputType()
class UsuarioUpdateInput {

    @Field(()=>String, {nullable: true})
    nombre?: string;

    @Field(()=>String, {nullable: true})
    email?: string;

    @Field(()=>String, {nullable: true})
    password?: string;

    @Field(()=>Boolean, {nullable: true})
    online?: boolean;

}



@Resolver()
export class UsuarioResolver {
    
    @Mutation(()=> Usuario)
    async createUser(
        @Arg("user", () => UsuarioInput) user: UsuarioInput
    ){
        const newUsuario = Usuario.create(user);
        newUsuario.uuid = randomUUID()
        console.log(newUsuario);
        return await newUsuario.save();
        
    }

    @Mutation(()=>Boolean)
    async deleteUsuario(@Arg("id", () => Int) id: number){
        //console.log(id)
        await Usuario.delete(id)
        return true
    }

    @Mutation(()=>Boolean)
    async updateUsuario (
        @Arg("id",()=>Int) id: number,
        @Arg("fields",()=>UsuarioUpdateInput) fields: UsuarioUpdateInput
    ){
        await Usuario.update({id}, fields)
        return true
    }
    

    @Query(()=>[Usuario])
    usuarios(){
        return Usuario.find({ relations: ["msj_de","msj_para"] });
    }
}