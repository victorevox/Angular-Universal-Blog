export const ERROR_MESSAGES = {
    RESOURCE_NOT_FOUND: "Resource not found",
    ON_RESOURCE_FIND: "There was an error while searching for resource",
    ON_RESOURCE_SAVE: "There was an error while saving resource data",
    ON_RESOURCE_QUERY: "There was an error while querying database",
    ON_RESOURCE_UPDATE: "There was an error while updating resource",
    RESOURCE_ID_MISSING: "You must pass the resource id",
    RESOURCE_MISSING: "You must pass the resource: ",
    RESOURCE_DELETE: "There was an error while deleting requested resource",
    NO_QUERY: "No query was specified or bad request",
    BAD_REQUEST: "Bad request, please review your request and try again later",
    UNAUTHORIZED: "You don't have permission for this API",
    BAD_AUTHORIZATION: "Bad authentication, make sure your session is valid and try again",
    UNAUTHENTICATED: "You must be authenticated in order to access this API",
    RESOURCE_CANTBE_DELETED_BECAUSEOF_LINKED: 'Cannot delete this resource because, it\'s already linked to some other resources',
    INTERNAL_ERROR: "Internal error",
    USER_ALREADY_EXISTS: "User already exists on database, try again with other email or login with previous registered credentials",
    AUTHENTICATION_TOKEN_MISSING: "Authentication token not present on request, be sure to be authenticated"
}