import "reflect-metadata"
import { connect } from "./config/typeorm";
import { startServer } from "./app"
import {getConnection} from "typeorm";

async function main() {
    await startServer();
    await connect();
    //await getConnection('usersConn').close()
    //getConnection('chatConn')
    
}

main();