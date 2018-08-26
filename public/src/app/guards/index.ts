import { UserAuthGuard } from "./user-auth.guard";
import { AdminAuthGuard } from "@appsrc/app/modules/admin/guards/admin-auth.guard";

export {
    UserAuthGuard,
    AdminAuthGuard
}

export const GUARDS = [
    UserAuthGuard
]