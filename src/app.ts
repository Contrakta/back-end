// Importing all required libraries.
import "reflect-metadata";
import express  from "express";

// Importing all required routes.
import userRoutes from "./routes/userRoutes";

// Instacing the app.
const app = express();

// Only looks at requests where Content-Type header matches json.
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Setting up the application routes.
//app.use("/api/v1/user", userRoutes);

// Exporting app.
export { app };
