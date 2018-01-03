import { UserAuthGuard } from "./user-auth.guard";
import { AdminAuthGuard } from "./admin-auth.guard";

export {
    UserAuthGuard,
    AdminAuthGuard
}

export const GUARDS = [
    UserAuthGuard
]