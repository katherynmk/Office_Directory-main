const express = require('express')
var bodyParser = require('body-parser');

const session = require('express-session'); 
const passport = require('passport');  
const connectEnsureLogin = require('connect-ensure-login');
const User = require('./user.js');

const app = express()
app.use(express.json());
app.use(bodyParser.urlencoded({extended : true}));
app.use(bodyParser.json());
const mongoose = require('mongoose');
const ProfessorController = require("./controllers/ProfessorController");
const ejs = require('ejs');
const { kStringMaxLength } = require('buffer');
const { name } = require('ejs');
var mongo = require('mongodb');
const Professor = require("./models/professor");

const passportLocalMongoose = require('passport-local-mongoose');

var MongoClient = require('mongodb').MongoClient;
var url = 'mongodb+srv://lewisTeam:lewis123@information.puksi.mongodb.net/OfficeDirectory?retryWrites=true&w=majority';
const client = new MongoClient(url);
const dbName = "OfficeDirectory";
mongoose.connect('mongodb+srv://lewisTeam:lewis123@information.puksi.mongodb.net/OfficeDirectory?retryWrites=true&w=majority', {
  useNewUrlParser: true,
  useUnifiedTopology: true
});
const db = mongoose.connection;
const col = db.collection("professors");

const port = process.env.PORT || 3000
const majorVersion = 1
const minorVersion = 2

app.use(express.static(__dirname + '/static'))

/*
  AUTH CODE IS HERE, based off of https://heynode.com/tutorial/authenticate-users-node-expressjs-and-passportjs/
*/
app.use(session({
  secret: 'r8q,+&1LM3)CD*zAGpx1xm{NeQhc;#', //TODO: This should probably be changed.
  resave: false,
  saveUninitialized: true,
  cookie: { maxAge: 60 * 60 * 1000 } // 1 hour long session.
}));

app.use(bodyParser.urlencoded({ extended: false }));
app.use(passport.initialize());
app.use(passport.session());
passport.use(User.createStrategy());

passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.set('view engine', 'ejs');

db.once("open", () => {
  console.log("Connected to MongoDB");
});


app.get('/login', (req, res) => {
  res.sendFile(__dirname + '/static/login.html');
});

//Handles redirects for when we succeed or fail our login.
app.post('/login', passport.authenticate('local', { failureRedirect: '/testAuthFail' }),  function(req, res) {
	console.log(req.user)
	res.redirect('/testAuth');
});
const UserDetails = require('./user');

//THIS CODE ADDS USER
app.post("/register", function (req, res) {
  UserDetails.register({ username: req.body.username, active: false }, req.body.password);
  res.json({"status":"Test"})
});

//TODO: Example page where you need to be logged in to view. Do what you want here. If someone tries to visit without 
//being logged in, they will be redirected to login page.
app.get('/testAuth', connectEnsureLogin.ensureLoggedIn(), (req, res) => {
  res.send(`Hello ${req.user.username}. Your session ID is ${req.sessionID} 
   and your session expires in ${req.session.cookie.maxAge} 
   milliseconds.<br><br>
   <a href="/logout">Log Out</a><br><br>
   <a href="/secret">Members Only</a>`);
});

app.get('/logout', function(req, res) {
  req.logout();
  res.redirect('/login');
});

app.get('/professors',ProfessorController.getAllProfessors, (req,res,next) => {
  res.render("professors",{professors:req.data});
});

app.get('/professors/edit/:name',ProfessorController.getProfessor,(req,res,next) => {
  res.render("editprof",{professors:req.data});
});

app.post("/saveprof", ProfessorController.saveProfessor);

//TODO: Does stuff when auth fails. Not sure how you want to display that.
app.get('/testAuthFail', (req,res,next) => {
  res.sendFile('static/testAuthFail.html', {root: __dirname });
});

//Katie and Izzys spot for our authentification linked pages
//this always directs to views/professors.ejs
//when you log in, will direct you to your link

app.get('/professors/klump/:name',ProfessorController.getProfessor,(req,res,next) => {
  res.render("editprof",{professors:req.data});
});
app.post("/saveprof", ProfessorController.saveProfessor);

app.get('/professors/ramsey/:name',ProfessorController.getProfessor,(req,res,next) => {
  res.render("professors",{professors:req.data});
});

app.get('/professors/dupre/:name',ProfessorController.getProfessor,(req,res,next) => {
  res.render("professors",{professors:req.data});
});
app.get('/professors/martinez/:name',ProfessorController.getProfessor,(req,res,next) => {
  res.render("professors",{professors:req.data});
});
app.get('/professors/szczurek/:name',ProfessorController.getProfessor,(req,res,next) => {
  res.render("professors",{professors:req.data});
});
app.get('/professors/stephenson/:name',ProfessorController.getProfessor,(req,res,next) => {
  res.render("professors",{professors:req.data});
});
app.get('/professors/howard/:name',ProfessorController.getProfessor,(req,res,next) => {
  res.render("professors",{professors:req.data});
});
app.get('/professors/khasawneh/:name',ProfessorController.getProfessor,(req,res,next) => {
  res.render("professors",{professors:req.data});
});
app.get('/professors/plass/:name',ProfessorController.getProfessor,(req,res,next) => {
  res.render("professors",{professors:req.data});
});
app.get('/professors/aboumar/:name',ProfessorController.getProfessor,(req,res,next) => {
  res.render("professors",{professors:req.data});
});
app.get('/professors/mkhassaweneh/:name',ProfessorController.getProfessor,(req,res,next) => {
  res.render("professors",{professors:req.data});
});
app.get('/professors/dominiak/:name',ProfessorController.getProfessor,(req,res,next) => {
  res.render("professors",{professors:req.data});
});
app.get('/professors/lewis/:name',ProfessorController.getProfessor,(req,res,next) => {
  res.render("professors",{professors:req.data});
});
app.get('/professors/meyer/:name',ProfessorController.getProfessor,(req,res,next) => {
  res.render("professors",{professors:req.data});
});
app.get('/professors/ngalamou/:name',ProfessorController.getProfessor,(req,res,next) => {
  res.render("professors",{professors:req.data});
});
app.get('/professors/perry/:name',ProfessorController.getProfessor,(req,res,next) => {
  res.render("professors",{professors:req.data});
});
app.get('/professors/pogue/:name',ProfessorController.getProfessor,(req,res,next) => {
  res.render("professors",{professors:req.data});
});

//this is where the cards are going
//in the views folder, to every file EXCEPT professors.ejs


app.get('/aboumar/professors/:name',ProfessorController.getProfessor,(req,res,next) => {
  res.render("aboumar",{professors:req.data});
});

app.get('/al-khassaweneh/professors/:name',ProfessorController.getProfessor,(req,res,next) => {
  res.render("al-khassaweneh",{professors:req.data});
});

app.get('/dominiak/professors/:name',ProfessorController.getProfessor,(req,res,next) => {
  res.render("dominiak",{professors:req.data});
});

app.get('/dupre/professors/:name',ProfessorController.getProfessor,(req,res,next) => {
  res.render("dupre",{professors:req.data});
});

app.get('/harsy/professors/:name',ProfessorController.getProfessor,(req,res,next) => {
  res.render("harsy",{professors:req.data});
});

app.get('/howard/professors/:name',ProfessorController.getProfessor,(req,res,next) => {
  res.render("howard",{professors:req.data});
});

app.get('/khasawneh/professors/:name',ProfessorController.getProfessor,(req,res,next) => {
  res.render("khasawneh",{professors:req.data});
});

app.get('/kim/professors/:name',ProfessorController.getProfessor,(req,res,next) => {
  res.render("kim",{professors:req.data});
});

app.get('/lewis/professors/:name',ProfessorController.getProfessor,(req,res,next) => {
  res.render("lewis",{professors:req.data});
});

app.get('/martinez/professors/:name',ProfessorController.getProfessor,(req,res,next) => {
  res.render("martinez",{professors:req.data});
});

app.get('/meyer/professors/:name',ProfessorController.getProfessor,(req,res,next) => {
  res.render("meyer",{professors:req.data});
});

app.get('/ngalamou/professors/:name',ProfessorController.getProfessor,(req,res,next) => {
  res.render("ngalamou",{professors:req.data});
});

app.get('/omari/professors/:name',ProfessorController.getProfessor,(req,res,next) => {
  res.render("omari",{professors:req.data});
});

app.get('/perry/professors/:name',ProfessorController.getProfessor,(req,res,next) => {
  res.render("perry",{professors:req.data});
});

app.get('/plass/professors/:name',ProfessorController.getProfessor,(req,res,next) => {
  res.render("plass",{professors:req.data});
});

app.get('/pogue/professors/:name',ProfessorController.getProfessor,(req,res,next) => {
  res.render("pogue",{professors:req.data});
});

app.get('/rayklump/professors/:name',ProfessorController.getProfessor,(req,res,next) => {
  res.render("rayklump",{professors:req.data});
});

app.get('/smith/professors/:name',ProfessorController.getProfessor,(req,res,next) => {
  res.render("smith",{professors:req.data});
});

app.get('/stephenson/professors/:name',ProfessorController.getProfessor,(req,res,next) => {
  res.render("stephenson",{professors:req.data});
});

app.get('/szczurek/professors/:name',ProfessorController.getProfessor,(req,res,next) => {
  res.render("szczurek",{professors:req.data});
});




app.listen(port, () => console.log(
  `Express started at \"http://localhost:${port}\"\n` +
  `press Ctrl-C to terminate.`)
)