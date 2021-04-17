import dotenv from "dotenv";
import findconfig from "find-config";
dotenv.config({
  path: findconfig(".env"),
});
import * as alt from "alt";
import chat from "chat";
import SQL from "../../database/database.mjs";
import { Account, Character } from "./entities/entities.mjs";

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

let webview;

alt.onClient('SendRegisterCredentials:ToServer', (player, credentials) => {
  alt.log(credentials);
});

alt.on("playerConnect", (player) => {

     //Spawning the Player at the Weed Farm
     let spawnPos = {
        x: 2208.777,
        y: 5578.235,
        z: 53.735

    }

    player.model = "mp_m_freemode_01";
    player.spawn(spawnPos.x, spawnPos.y, spawnPos.z, 1000);
    alt.emitClient(player, 'Start:Login')

});

