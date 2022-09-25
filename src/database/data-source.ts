// Importing all required libraries.
import "reflect-metadata";
import { DataSource } from "typeorm";

// Importing all required files.
import config from "../config/default";

// Exporting the AppDataSource.
export const AppDataSource = new DataSource({

	type: "postgres",
	synchronize: true,
	host: config.db_host,
	port: config.db_port,
	logging: config.db_logging,
	database: config.db_database || "contrakta",
	username: config.db_username || "postgres",
	password: config.db_password || "postgres",
	entities: ["src/database/entities/**/*{.ts,.js}"],
	migrations: ["src/database/migrations/**/*{.ts,.js}"],

});