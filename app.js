const express = require("express");
const app = express();
const path = require("path");
const fs = require('fs');

app.set("views", path.join(__dirname, "views"));
app.use(express.static(path.join(__dirname, "public")));

app.set("view engine", "ejs");


app.use(express.urlencoded({ extended: true }));

const multer  = require('multer');
const upload = multer({ dest: 'uploads/' });

const send = require("./sendmail");

app.get("/mail", (req, res) => {
  res.render("index.ejs")
});

app.post("/send", upload.array('data', 10), async (req, res) => {

  let data = req.files;
  data.forEach((f, i) => {data[i] = {filename: f.originalname, path : f.path}});
  await send(req.body.to, req.body.sub, req.body.msg, data).catch((err) => console.log(err));
  data.forEach((f) => {fs.unlinkSync(f.path);})
  res.redirect("/mail");
});

app.use("*", (req, res)=>{
  res.redirect("/mail");
});


app.listen(8080, ()=>{
  console.log("app is listening to port 8080");
});


