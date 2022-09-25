export default {
	host: process.env.APP_HOST as string,
	port: process.env.APP_PORT as unknown as number,
	db_host: process.env.DB_HOST as string,
	db_port: process.env.DB_PORT as unknown as number,
	db_username: process.env.DB_USERNAME as string,
	db_password: process.env.DB_PASSWORD as string,
	db_database: process.env.DB_DATABASE as string,
	db_logging: process.env.DB_LOGGING as unknown as boolean,
};