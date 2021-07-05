const Database = require("../database/config");

function RoomIdGenerator(){
    const roomId = Math.floor(100000 + Math.random() * 900000);
    return(roomId);
};

module.exports = {
    async isThereAnyQuestion(roomId){
        const db = await Database();
        const getAllQuestions = await module.exports.getQuestions("get-all", roomId);
        if(Array.isArray(getAllQuestions) && !getAllQuestions.length){
            return false;
        }else{
            return true;
        };
    },

    async CheckIfPasswordIsValid(password, roomId){
        const db = await Database();
        const query = await db.get(`SELECT * FROM rooms WHERE id = ${roomId} AND password = '${password}'`);
        await db.close();
        if(query != "undefined" && query != null && query.password == password){
            return true;
        }else{
            return false;
        };
    },

    async getQuestions(questionType, roomId){
        const db = await Database();
        if(questionType === "not-read"){
            let questions = await db.all(`SELECT * FROM questions WHERE roomId = ${roomId} AND isRead = 0`);
            db.close();
            return questions;
        }else if(questionType === "read"){
            let questions = await db.all(`SELECT * FROM questions WHERE roomId = ${roomId} AND isRead = 1`);
            db.close();
            return questions;
        }else if(questionType === "get-all"){
            let questions = await db.all(`SELECT * FROM questions WHERE roomId = ${roomId}`);
            db.close();
            return questions;
        }else{
            return;
        };
    },

    async checkIfRoomExists(roomId){
        const db = await Database();
        const query = await db.get(`SELECT id FROM rooms WHERE id = ${roomId}`);
        await db.close();
        if(query != "undefined" && query != null && query.id == roomId){
            return true;
        }else{
            return false;
        };
    },

    async enter(req, res){
        const db = await Database();
        const roomId = req.body.room;

        if(roomId === null || roomId === undefined){
            res.redirect(`/room/not-found`);
        };

        if(await module.exports.checkIfRoomExists(roomId)){
            res.redirect(`/room/${roomId}`);
        }else{
            res.redirect(`/room/not-found`);
        };
    },

    async index(req, res){
        const db = await Database();
        const roomId = req.params.roomId;
        let msgContent = "";
        let msgType = "";

        if(req.params.go){
            return res.redirect(`/room/${roomId}`);
        };

        if(await module.exports.checkIfRoomExists(roomId)){
            res.render("room", {roomId: roomId,  isThereAnyQuestion: await module.exports.isThereAnyQuestion(roomId), questions: await module.exports.getQuestions("not-read", roomId), questionsRead: await module.exports.getQuestions("read", roomId), msgType: msgType, msgContent: msgContent});
        }else{
            res.redirect(`/room/not-found`);
        };
    },

    async create(req, res){
        const db = await Database();
        roomId = await RoomIdGenerator();
        const password = req.body.password;
        let isRoomIdTaken;

        do {
            if(await module.exports.checkIfRoomExists(roomId)){
                roomId = RoomIdGenerator();
                isRoomIdTaken = true;
            }else{
                isRoomIdTaken = false;
            }
        } while(isRoomIdTaken);

        await db.run(`INSERT INTO rooms (id,password) VALUES (${roomId},${password})`);
        await db.close();
        res.redirect(`/room/${roomId}`);
    }
}