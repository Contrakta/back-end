// Importing the instancied app from server.ts.
import { app }  from "./app";

// Importing the application default config.
import config from "./config/default";

// Importing the app data source (database connection information).
import { AppDataSource } from "./database/data-source";

// Setting up the application default port and hostname.
const port = config.port as number;
const host = config.host as string;

// Setting up the server.
app.listen(port, host, () => {

	// Cleaning up the console.
	console.clear();
    
	// Sending a message.
	console.info(`🚀 Server started successfully. Listening at http://${host}:${port}/`);
    
});

// Initializing the database.
AppDataSource.initialize()
	.then(() => {

		// Sending a successful message case the connection started.
		console.info("🔒 Database connected successfully.");
	
	})
	.catch((error) => {

		// Cleaning up the console and sending an error message case connection refused.
		console.clear();
		console.log(`👎 There was an error while connecting to the database:\n\n   ${error}`);
	
	});