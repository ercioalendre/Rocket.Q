const express = require("express");
const Question = require("../controllers/Question");
const Room = require("../controllers/Room");
const router = express.Router();
router.get("/", (req, res) => res.render("index", {page: "manage-room"}));
router.get("/new-room", (req, res) => res.render("index", {page: "new-room"}));
router.post("/new-room/create-room", Room.create);
router.get("/room/not-found", (req, res) => res.render("index", {page: "room-not-found"}));
router.get("/room/:roomId", Room.index);
router.get("/room/:roomId/:go", Room.index);
router.post("/room/enter", Room.enter);
router.post("/room/:roomId/new-question", Question.create);
router.post("/room/:roomId/manage-question", Question.manage);
module.exports = router;