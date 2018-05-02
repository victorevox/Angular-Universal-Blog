import { connect } from "mongoose";

let _dbConfig: DBConfig;
let _connection;

export const connectDb = () => {
    try {

        _dbConfig = getMainDBConfig();
        console.log(`Connecting to: ${_dbConfig.getConnectionString()}`);
        connect(_dbConfig.getConnectionString());
    } catch (error) {
        console.log(error);
    }
}

class DBConfig {
    host: string = null;
    user: string = null;
    pass: string = null;
    name: string = null;
    port: string = null;

    constructor(host, user, pass, db_name, port) {
        this.host = host;
        this.user = user;
        this.pass = pass;
        this.name = db_name;
        this.port = port;
    }

    getConnectionString() {
        return `mongodb://${this.user}${this.pass}${this.host}${this.port}/${this.name}`;
    }
}

export function getMainDBConfig(): DBConfig {
    let host = process.env.DB_HOST ? process.env.DB_HOST : 'localhost';
    let user = process.env.DB_USER ? process.env.DB_USER : '';
    let pass = process.env.DB_PASS ? ':' + process.env.DB_PASS + '@' : user ? '@' : '';
    let name = process.env.DB_NAME ? process.env.DB_NAME : 'test';
    let port = process.env.DB_PORT ? ':' + process.env.DB_PORT : '';
    return new DBConfig( host, user, pass, name, port);
}