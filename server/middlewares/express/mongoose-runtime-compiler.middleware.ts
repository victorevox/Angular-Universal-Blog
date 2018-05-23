import { Request, Response, NextFunction } from "express";
import { connection, createConnection, Model, Schema, Mongoose } from "mongoose";
import { getMainDBConfig } from "@server/config/db";
import { compileModelsForConnection } from "@server/utils/helpers/mongoose-runtime.helper";
import { isFunction, isString } from "lodash";
import { MODEL_SCHEMAS } from "@server/config/mongoose-schema-loader";

export class MongooseCustomMiddleware {

    public static init( req: Request, res: Response, next: NextFunction) {

        let model = null;
        /** @type {IServerUser} */
        // @ts-ignore
        const user = req.user;
        let tenantConection = null;
        let globalConnection = connection;
    
        if (user) {
            // for the moment it will retrive default db
            let dbConfig = getMainDBConfig();
            // dbData.name = user.dbCredentials.dbName;
            // dbData.user = user.dbCredentials.user;
            // dbData.pass = user.dbCredentials.password;
    
            // get tenant connection credentials and create mongoose connection
            tenantConection = new Mongoose().createConnection(dbConfig.getConnectionString());
        }
    
        let options = {
            locals: {
                request: req,
                user: user,
                // store global and tenant connections so maybe they will be usefull later on 
                connections: {
                    tenant: tenantConection,
                    global: globalConnection
                }
            }
        }
    
        if(tenantConection) compileModelsForConnection(tenantConection, options);
        compileModelsForConnection(globalConnection, options);

        
        req.model = function (schemaOrModel, options) {
            function getSchemaAndName(schemaOrModel) {
                let schema = null;
                let name = null;
                if (schemaOrModel instanceof Schema) {
                    name = schemaOrModel.options.name || options.name;
                    schema = schemaOrModel;
                } else if ( schemaOrModel instanceof Model) {
                    name = schemaOrModel.modelName;
                    schema = schemaOrModel.schema;
                } else if (isString(schemaOrModel)) {
                    name = schemaOrModel;
                    schema = MODEL_SCHEMAS[schemaOrModel];
                }
                return {
                    schema,
                    name
                }
            }

            let model = null;
            let {name, schema} = getSchemaAndName(schemaOrModel);
            if (!name) throw new Error("No model name given for Schema");
            if (!schema) throw new Error(`No model schema given for ${name} Schema`);

            if (user) {
                        // if schema is tenant
                        if(schema.options.tenant) model = tenantConection.model(name);
                        else model = globalConnection.model(name);
            } else  {
                    // if schema is tenant
                    if(schema.options.tenant) throw new Error("No user on request was set");
                    else model = globalConnection.model(name);
            }
    
            return model;
        }
    
        next();
    }
    
}