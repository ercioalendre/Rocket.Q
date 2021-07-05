const Database = require("../database/config");
const Room = require("./Room");

module.exports = {
    async manage(req, res){
        const db = await Database();
        const roomId = req.params.roomId;
        const questionId = req.body.questionId;
        const action = req.body.questionAction;
        const password = req.body.password;
        const checkPassword = await Room.CheckIfPasswordIsValid(password, roomId);
        const checkIfRoomExists = await Room.checkIfRoomExists(roomId);
        let msgContent = "";
        let msgType = "";

        if(checkIfRoomExists){
            if(checkPassword){
                if(action === "mark-as-read"){
                    await db.run(`UPDATE questions SET isRead = 1 WHERE id = ${questionId} AND roomId = ${roomId}`);
                    db.close();
                    msgType = "success";
                    msgContent = "Pergunta marcada como lida com sucesso!"
                }else if(action === "delete"){
                    await db.run(`DELETE FROM questions WHERE id = ${questionId} AND roomId = ${roomId}`);
                    db.close();
                    msgType = "success";
                    msgContent = "Pergunta excluída com sucesso!"
                };
            }else{
                msgType = "error";
                msgContent = "A senha que você digitou está incorreta!"
                await db.close();
            };
            res.render("room", {roomId: roomId, isThereAnyQuestion: await Room.isThereAnyQuestion(roomId), questions: await Room.getQuestions("not-read", roomId), questionsRead: await Room.getQuestions("read", roomId), msgType: msgType, msgContent: msgContent});
        }else{
            res.redirect(`/room/not-found`);
        };
    },

    async create(req, res){
        const db = await Database(); 
        const question = req.body.question;
        const roomId = req.params.roomId;

        await db.run(`INSERT INTO questions (question,roomId,isRead) VALUES ("${question}",${roomId},0)`);
        await db.close();
        msgType = "success";
        msgContent = "Pergunta enviada com sucesso!"
        res.render("room", {roomId: roomId, isThereAnyQuestion: await Room.isThereAnyQuestion(roomId), questions: await Room.getQuestions("not-read", roomId), questionsRead: await Room.getQuestions("read", roomId), msgType: msgType, msgContent: msgContent});
    }
}