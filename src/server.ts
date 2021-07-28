import express from "express";
import router from "./router";
import path from "path";
const app = express();
app.set('view engine', 'ejs');
app.use(express.static('public'));
app.set('views', path.join(__dirname, 'views'));
app.use(express.urlencoded({extended: true}));
app.use(router);
app.listen(3000, () => console.log("[Rocket.Q] Server listening at localhost:3000"));