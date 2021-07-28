import sqlite3 from "sqlite3";
import { open } from "sqlite";

const Database = () => open({
    filename: "./src/database/rocketq.sqlite",
    driver: sqlite3.Database
});

export default Database;