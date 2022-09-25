// Importing all required libraries.
import "reflect-metadata";
import express  from "express";

// Importing all required routes.
import userRoutes from "./routes/userRoutes";
import bankAccountRoutes from "./routes/bankAccountRoutes";

// Instacing the app.
const app = express();

// Only looks at requests where Content-Type header matches json.
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Setting up the application routes.
app.use("/api/v1/user", userRoutes);
app.use("/api/v1/bank-account", bankAccountRoutes);

// Exporting app.
export { app };
