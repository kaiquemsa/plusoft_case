import "reflect-metadata";
import { DataSource } from "typeorm";

import Gadgets from "../entities/Gadgets";
import Sold from "../entities/Sold";
import Users from "../entities/Users";

export const AppDataSource = new DataSource({
  type: "postgres",
  host: process.env.DATABASE_HOST,
  port: parseInt(process.env.DATABASE_PORT),
  username: process.env.DATABASE_USERNAME,
  password: process.env.DATABASE_PASSWORD,
  database: process.env.DATABASE_NAME,
  synchronize: true,
  entities: [Gadgets, Sold, Users],
});