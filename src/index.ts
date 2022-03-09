import "reflect-metadata"
import { connect } from "./config/typeorm";
import { startServer } from "./app"

async function main() {
    await startServer();
    connect();
}

main();