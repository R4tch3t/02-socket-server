import { createConnections, getConnection } from "typeorm";
import path from "path";

export const getRepo = (con:any,repo:any) => {
    return getConnection(con).getRepository(repo);
}

export async function connect(){

    // await createConnection({
    //     type: 'oracle',
    //     host: 'localhost',
    //     port: 1521,
    //     username: 'XE',
    //     password: 'oracle',
    //     database: 'XE',
    //     entities: [
    //         path.join(__dirname,'../entity/**/**.ts')
    //     ],
    //     synchronize: true
    // })
    
    await createConnections([{
            name: "chatConn",
            type: "mongodb",
            url: process.env.MONGO_TYPEO,
            useNewUrlParser: true,
            useUnifiedTopology: true,
        // retryWrites: true,
            synchronize: false,
        // logging: true,
            entities: [
                path.join(__dirname,'../entity/**/**.ts'),
                path.join(__dirname,'../entities/mongoDB/**/**.ts')
            ],
        },
        {
            name: "usersConn",
            type: 'oracle',
            host: 'localhost',
            port: 1521,
            username: 'XE',
            password: 'oracle',
            database: 'XE',
            entities: [
                path.join(__dirname,'../entities/oracle/**/**.ts')
            ],
            synchronize: false
        },
        {
            name: "usersConnP",
            type: 'postgres',
            host: 'localhost',
            port: 5432,
            username: 'postgres',
            password: 'R4tch3t',
            database: 'chatApp',
            entities: [
                path.join(__dirname,'../entity/**/**.ts'),
                path.join(__dirname,'../entities/postgres/**/**.ts')
            ],
            synchronize: true
        }
    ]);

    //await createConnection({
    //    type: 'postgres',
    //    host: 'localhost',
    //    port: 5432,
    //    username: 'postgres',
    //    password: 'R4tch3t',
    //    database: 'chatApp',
    //    entities: [
   //         path.join(__dirname,'../entity/**/**.ts'),
   //         path.join(__dirname,'../entities/**/**.ts')
   //     ],
    //    synchronize: true
    //})


    //await createConnection({
    //    type: 'mysql',
    //    host: 'localhost',
    //    port: 3306,
    //    username: 'root',
    //    password: '',
    //    database: 'graphqlts',
    //    entities: [
    //        path.join(__dirname,'../entity/**/**.ts')
    //    ],
    //    synchronize: true
    //})
}