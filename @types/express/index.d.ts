import { User } from "../../src/database/entities/User";

declare global{
    namespace Express {
        interface Request {
            user ?: User
        }
    }
}