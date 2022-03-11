
import { buildSchema } from 'type-graphql';

import { FileResolver } from '../resolvers/FileResolver';
import { MensajeResolver } from '../resolvers/mongoDB/MensajeResolver';
import { UsuarioResolver } from '../resolvers/mongoDB/UsuarioResolver';


export default async () => await buildSchema({
    resolvers: [ FileResolver, UsuarioResolver, MensajeResolver ],
    validate: false

})