import { config } from "dotenv";
config();

//puerto de app
export const port = process.env.PORT;
//BD Mongo
export const uri = process.env.MONGO_URI;
//JWT
export const jwtSecret = process.env.JWT_SECRET;
export const jwtExpire = process.env.JWT_EXPIRES;
