import { Schema, Model, connection } from "mongoose";

export class TenantPopulationMiddleware {

    public static init(schema: Schema, options) {
        schema.pre('find', function (next) {
            let query = this;
            
            schema.eachPath((path, type) => {
                let isTenant;
                if(query.mongooseOptions().populate && query.mongooseOptions().populate[path]){
                    let instanceType = type.instance;
                    let typeOptions = type.options;
                    if (instanceType === "ObjectID") {
                        isTenant = typeOptions.tenant !== undefined ? typeOptions.tenant : true;
                        !isTenant && process();
                    } else if (instanceType === "Array" && type.caster.instance === "ObjectID") {
                        isTenant = typeOptions.tenant !== undefined ? typeOptions.tenant : type.caster.options.tenant !== undefined ? type.caster.options.tenant : true;
                        !isTenant && process();
                    }
                }
                // if path tenant is defined to be false
                // then set de reference to point to the global mongoose connection
                function process() {
                    let pathDefinition = query.schema.path(path);
                    let ref = pathDefinition.caster.options.ref;
                    let model = connection.model(ref);
                    query.mongooseOptions().populate[path].model = model;
                }
              
            })
            next();
            // this.populate('user');
        });
    }
}