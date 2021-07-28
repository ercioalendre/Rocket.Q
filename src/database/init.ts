const Database = require("./config");
const initDb = {
    async init(){
        const db = await Database();

        await db.exec(`CREATE TABLE users (
            username TEXT PRIMARY KEY,
            email TEXT,
            password TEXT,
            name TEXT)`);

        await db.exec(`CREATE TABLE rooms (
            id INTEGER PRIMARY KEY,
            password TEXT)`);
            
        await db.exec(`CREATE TABLE questions (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            question TEXT,
            roomId INTEGER,
            isRead BOOLEAN NOT NULL CHECK (isRead IN (0, 1)))`);
        
        await db.close();
    }
}

initDb.init();