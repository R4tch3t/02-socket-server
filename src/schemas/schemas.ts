
import { buildSchema } from 'type-graphql';

import { FileResolver } from '../resolvers/FileResolver';
import { UsuarioResolver } from '../resolvers/UsuarioResolver';
import { MensajeResolver } from '../resolvers/MensajeResolver';

export default async () => await buildSchema({
    resolvers: [ FileResolver, UsuarioResolver, MensajeResolver ],
    validate: false

})