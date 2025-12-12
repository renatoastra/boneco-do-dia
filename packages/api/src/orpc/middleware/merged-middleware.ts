import { adminMiddleware } from "./admin-middleware";
import { authMiddleware } from "./auth-middleware";

export const authAndAdminMiddleware = authMiddleware.concat(adminMiddleware);
