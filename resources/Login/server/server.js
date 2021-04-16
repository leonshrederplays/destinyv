import dotenv from 'dotenv';
import findconfig from 'find-config';
dotenv.config({
    path: findconfig(".env")
});
import * as alt from 'alt'
import chat from 'chat';
import SQL from '../../database/database.mjs';
import { Account, Character } from './entities/entities.mjs';

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
    Character
]);

// This is an event called when the database is connected.
// You don't need to use this; but it helps understand the current state of the db connection.
alt.on('ConnectionComplete', () => {
    var Account = {
        username: 'stuyk',
        password: '123'
    };

    // Update or Insert a new document.
    database.upsertData(Account, 'Account', result => {
        // Fetch data by field name, field value, and repo name.
        database.fetchData('username', 'stuyk', 'Account', res => {
            if (res === undefined) {
                console.log('This user was not found.');
                return;
            }

            console.log(res);
        });

        // Fetch a document by ID.
        database.fetchByIds(1, 'Account', res => {
            if (res === undefined) {
                console.log('The document with the id was not found.');
                return;
            }

            console.log('Fetched Document for ID: ' + res[0].id);
            console.log(res[0]);

            // The result is going to be an array if it finds the document.
            // If you're expecting 1 result. Then use call [0] on res.
            console.log('Attempting to Update Data...');
            database.updatePartialData(
                res[0].id,
                { username: 'NewUsername' },
                'Account',
                res => {
                    // Will return an object if successfull.
                    if (typeof res !== 'object') {
                        console.log('Failed to find and update document.');
                        return;
                    }

                    console.log('Updated Successfully');
                }
            );
        });

        // Returns an array of all documents with all data.
        // If no documents exist; it'll be undefined.
        database.fetchAllData('Account', res => {
            console.log('Fetched all documents for table ACCOUNT');
            console.log(res);
        });

        // Selects all data and returns just usernames.
        database.selectData('Account', ['username'], res => {
            console.log('Selected by USERNAME');
            console.log(res);
        });

        // Delete by ID
        setTimeout(() => {
            database.deleteByIds(1, 'Account', res => {
                console.log('Deleted ID 1');
                console.log(res);
            });
        }, 5000);
    });
});