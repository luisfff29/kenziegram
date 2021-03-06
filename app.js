const express = require("express");
const fs = require("fs");
const multer = require("multer");
const ejs = require("ejs");

const path = "./public/uploads";
const app = express();
const port = 3000;
templates = {
    titleHeader: "Kenziegram Project",
    title: "<h1>KenzieGram</h1>",
    posted: false,
};
const upload = multer({ dest: path });

app.set("view engine", "ejs");

app.use(express.static("./public"));

fs.readdir(path, (err, files) => {
    templates.pics = files;
});

app.get("/", (req, res) => {
    templates.posted = false;
    res.render("index", templates);
});

app.post("/upload", upload.single("myImage"), (req, res, next) => {
    templates.posted = true;
    templates.pics.unshift(req.file.filename);
    templates.pic_uploaded = req.file.filename;
    res.render("index", templates);
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
