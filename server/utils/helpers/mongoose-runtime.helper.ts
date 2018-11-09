import { Connection, SchemaOptions, Schema, Model } from "mongoose";
import { MODEL_SCHEMAS } from "@server/config/mongoose-schema-loader";
import { merge } from "lodash";
import { SecurityMiddleware, TenantPopulationMiddleware, CrudMiddleware } from "@server/middlewares/mongoose";

export const compileModelsForConnection = function (connection: Connection, options: SchemaOptions) {
    for (const schemaName in MODEL_SCHEMAS) {
        try {
            let schema = MODEL_SCHEMAS[schemaName];
            compileForConnection(schema, connection, schemaName);
        } catch (error) {
            console.error(error);
            throw error;
        }
    }

    function compileForConnection(schema: Schema, connection: Connection, name: string) {
        if (schema instanceof Schema) {
            // clone the schema to prevent weird behaviour
            schema = schema.clone();
            // merge options passed to function with schema defined ones
            let options = schema.options;
            merge(schema.options, options);
            if (options && !options.name && !name) throw new Error("No model name given for Schema");
            // get model schema name
            name = name || options && options.name;

            // just compile it if is not already compiled on this connection
            if (!(connection.modelNames().indexOf(name) + 1)) {
                // addd plugins to Schema
                addPlugins(schema);
                // compile it
                connection.model(name, schema);
            }
        } else {
            throw `Wrong schema type defined`;
        }
    }

    function addPlugins(schema: Schema) {
        schema.plugin(CrudMiddleware.init, {});
        schema.plugin(TenantPopulationMiddleware.init, {});
        schema.plugin(SecurityMiddleware.init, {});
    }
}