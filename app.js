const express = require("express");
const app = express();
const path = require("path");
const fs = require('fs');

const session = require('express-session');
const flash = require('connect-flash');

app.set("views", path.join(__dirname, "views"));
app.use(express.static(path.join(__dirname, "public")));

app.set("view engine", "ejs");

app.use(session({
  secret: 'notUsefull',
  resave: false,
  saveUninitialized: true,
}));
app.use(flash());


app.use(express.urlencoded({ extended: true }));

const multer  = require('multer');
const upload = multer({ dest: 'uploads/' });

const send = require("./sendmail");

app.get("/mail", (req, res) => {  
  res.render("index.ejs", { message : req.flash('info')[0] })
});

app.post("/send", upload.array('data', 10), async (req, res) => {
  let data = req.files;
  data.forEach((f, i) => {data[i] = {filename: f.originalname, path : f.path}});
  await send(req.body.to, req.body.sub, req.body.msg, data).catch((err) => console.log(err));
  data.forEach((f) => {fs.unlinkSync(f.path)});
  req.flash('info', `${req.body.to}`);
  res.redirect("/mail");
});

app.use("*", (req, res)=>{
  res.redirect("/mail");
});


app.listen(8080, ()=>{
  console.log("app is listening to port 8080");
});


