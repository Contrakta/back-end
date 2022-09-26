// Importing all required libraries.
import "reflect-metadata";
import express  from "express";
import cors from "cors";

// Importing all required routes.
import userRoutes from "./routes/userRoutes";
import bankAccountRoutes from "./routes/bankAccountRoutes";
import productRoutes from "./routes/productRoutes";

// Instacing the app.
const app = express();

// Setting up cors.
app.use(cors());

// Only looks at requests where Content-Type header matches json.
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Setting up the application routes.
app.use("/api/v1/user", userRoutes);
app.use("/api/v1/bank-account", bankAccountRoutes);
app.use("/api/v1/product", productRoutes);

// Exporting app.
export { app };
