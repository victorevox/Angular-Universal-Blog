import { connect } from "mongoose";
// var mongoose = require('mongoose');
export const dbConfig = () => {
    try {
        let host = process.env.DB_HOST?  process.env.DB_HOST : 'localhost';
        let user = process.env.DB_USER? process.env.DB_USER : '';
        let pass = process.env.DB_PASS? ':' + process.env.DB_PASS + '@' : user? '@' : '';
        let name = process.env.DB_NAME? process.env.DB_NAME : 'test';
        let port = process.env.DB_PORT? ':' + process.env.DB_PORT : '';
        let connectionString = `mongodb://${user}${pass}${host}${port}/${name}`;
        // console.log(connectionString);
        connect(connectionString);
    } catch (error) {
        console.log(error);
    }
    // connect('mongodb://localhost/test');
}