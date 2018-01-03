import { connect } from "mongoose";
// var mongoose = require('mongoose');
export const dbConfig = () => {
    connect('mongodb://localhost/test');
}