import "reflect-metadata";
import { DataSource } from "typeorm";
import { User } from "../users/user.entity"; 

export const AppDataSource = new DataSource({
    type: "mysql",
    host: process.env.DB_HOST || "localhost",
    port: Number(process.env.DB_PORT) || 3306,
    username: process.env.DB_USER || "root",
    password: process.env.DB_PASS || "root",
    database: process.env.DB_NAME || "votingsys",
    entities: [User], // Ensure your entity files are co  rrectly referenced
    synchronize: true, // Creates tables automatically
    migrations: [],
    logging: true, // Shows queries in the console for debugging
    extra: {
        createDatabaseIfNotExist: true, // Automatically creates the database
    },  
});

AppDataSource.initialize()
    .then(() => {
        console.log("📌 Database Connected!");
    })
    .catch((error) => console.error("Database Connection Error:", error));
