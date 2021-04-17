import dotenv from "dotenv";
import findconfig from "find-config";
dotenv.config({
  path: findconfig(".env"),
});
import alt from 'alt-server';
import chalk from 'chalk';
import SQL from "../../../../database/database.mjs";
import { Account, Character } from "../schema/schemas.mjs";

alt.log(chalk.greenBright('Loaded: database/connection/connect'));

// Each Database Schema you create will need to be added to the array after your connection string.
// The database connection string goes as follows for postgres
// postgresql://username:password@localhost:5423/databaseName
const dbType = process.env.DBTYPE;
const dbHost = process.env.DBHOST;
const dbPort = process.env.DBPORT;
const dbUsername = process.env.DBUSER;
const dbPassword = process.env.DBPASS;
const dbName = process.env.DB;

// Must be in this specific order.
// dbType, dbHost, dbPort, dbUsername, dbPassword, dbName, entityArray
var database = new SQL(dbType, dbHost, dbPort, dbUsername, dbPassword, dbName, [
  Account,
  Character,
]);