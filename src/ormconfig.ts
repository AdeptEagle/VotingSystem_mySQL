import { DataSource } from "typeorm";
import { Student } from "../entities/student";
import { Candidate } from "../entities/candidate";
import { Position } from "../entities/position";
import { Partylist } from "../entities/partylist";
import { Vote } from "../entities/vote";
import dotenv from "dotenv";

// Load environment variables
dotenv.config();

export const AppDataSource = new DataSource({
  type: "mysql",
  host: "localhost",
  port: 3306,
  username: "root",
  password: "",  // Update this if your MySQL has a password
  database: "voting_system",
  entities: [Student, Candidate, Position, Partylist, Vote],
  synchronize: true,  // This will create tables automatically
  logging: true
});
