export interface IResourceListResponse {
    documents: Array<any> | any
}

export interface IResourceCreateResponse {
    doc: any;
    message: string;
}

export interface IResourceUpdateResponse extends IResourceCreateResponse {}

export interface IResourceDeleteResponse extends IResourceCreateResponse {}