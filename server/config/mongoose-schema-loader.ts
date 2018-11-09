import { UserSchema, PageSchema, PostSchema } from "@server/models";
import { MODEL_NAME_DEFINITIONS } from "@server/utils/constants";

export const MODEL_SCHEMAS = {
    [MODEL_NAME_DEFINITIONS.USER]: UserSchema,
    [MODEL_NAME_DEFINITIONS.PAGE]: PageSchema,
    [MODEL_NAME_DEFINITIONS.POST]: PostSchema
}