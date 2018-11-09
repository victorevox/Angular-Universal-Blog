import { Request } from "express";
import { Model, DocumentQuery } from "mongoose";
import { forOwn, isEmpty, isArray } from "lodash";
import { MongooseQueryParser } from 'gb-mongoose-query-parser';
import { IResourceListResponse } from "@shared/interfaces";

export const getDocsByQuery = (model: Model<any>, req: Request, options?: object) => {
    return new Promise((resolve, reject) => {
        let defaultOptions = {
            ignoreCompanyRelation: false
        }

        // Query variables
        let query: DocumentQuery<any, any>;
        let countQueryDocuments: DocumentQuery<any, any>;

        // Array of queries' promises
        let queryPromises = [];
        let _id = req.params._id || req.query._id;
        if (_id) {
            query = model.findById(_id).lean();
            countQueryDocuments = model.countDocuments({ _id });
        } else {
            query = model.find({}).lean();
            countQueryDocuments = model.countDocuments();
        }

        if (!isEmpty(req.query)) {
            const parser = new MongooseQueryParser();
            let queryParams = parser.parse(req.query);
            if (queryParams.filter) {
                forOwn(queryParams.filter, (value, key) => {
                    query = query.where(key, value);
                    countQueryDocuments = countQueryDocuments.where(key, value);
                });
            }
            if (queryParams.populate) query = query.populate(queryParams.populate)
            if (queryParams.deepPopulate) query = query.populate(queryParams.deepPopulate)
            if (queryParams.sort) query = query.sort(queryParams.sort);
            if (queryParams.limit) query = query.limit(queryParams.limit);
            if (queryParams.select) query = query.select(queryParams.select);
            if (queryParams.skip) query = query.skip(queryParams.skip);

        }

        //Attaching queries to the promise array.
        queryPromises.push(countQueryDocuments);
        queryPromises.push(query);
        Promise.all(queryPromises)
            .then(response => {
                let totalDocuments = response[0];

                /* Check documents  */
                /** 
                 * if Array ==> return as is ([doc1, doc2, doc3, ...])
                 * if single document ==> return array with that document ([singleDoc])
                 * if null ==>  return null
                 */
                let documents = isArray(response[1]) ? response[1] : response[1] ? [response[1]] : response[1];
                return resolve(<IResourceListResponse>{ totalDocuments, documents });
            })
            .catch(err => reject(err));
    });
}
