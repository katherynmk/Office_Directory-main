//below is some complicated things for node/mongo/passport
//some of it will be the same for your, some of the things like our
//controllers such as const User = require('./user.js');, const ProfessorController = require("./controllers/ProfessorController");
//const Professor = require("./models/professor"); will change for you
//if you choose to follow the odel view controller theme, please update the 
//controllers file to work for you

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
//we use mongo to connect to our database
var MongoClient = require('mongodb').MongoClient;
//when on mongo, if you click connect and select the second option
//it will give you your own url for your own database to connect
var url = "mongodb+srv://lewis:lewis1234@cluster0.vvd1s.mongodb.net/?retryWrites=true&w=majority"
const client = new MongoClient(url);
const dbName = "OfficeDirectory";
mongoose.connect("mongodb+srv://lewis:lewis1234@cluster0.vvd1s.mongodb.net/?retryWrites=true&w=majority", {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

//we connect to our database, to a collection called 'professors'
const db = mongoose.connection;
const col = db.collection("professors");

//basic node things, your local host ports V
const port = process.env.PORT || 3000
const majorVersion = 1
const minorVersion = 2

app.use(express.static(__dirname + '/static'))
//directs to static folder, automatically opens index,main,login from static,
//later, ejs will use the 'views' folder, not static

/*
  AUTH CODE IS HERE, based off of https://heynode.com/tutorial/authenticate-users-node-expressjs-and-passportjs/
*/
app.use(session({
  secret: 'r8q,+&1LM3)CD*zAGpx1xm{NeQhc;#', 
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
//ejs is a special version of js in which we can actually get 
//database variables and display them with basic code

//with this handling method, we are directing our viewing to the views FOLDER
//all pathing in index.js will automatically look into the views folder for files
//you do not need to add views to the path

db.once("open", () => {
  console.log("Connected to MongoDB");
});
//this connects you to the database, if it is successfull, you should see a message in the terminal


app.get('/login', (req, res) => {
  res.sendFile(__dirname + '/static/login.html');
});
//here we can see we are looking at the static folder, in the file named login.html

//Handles redirects for when we succeed or fail our login.
app.post('/login', passport.authenticate('local', { failureRedirect: '/testAuthFail' }),  function(req, res) {
	console.log(req.user)
	res.redirect('/testAuth');
});
const UserDetails = require('./user');

//THIS CODE ADDS USER for authentication
app.post("/register", function (req, res) {
  UserDetails.register({ username: req.body.username, active: false }, req.body.password);
  res.json({"status":"Test"})
});

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

//here if you type into the url http://localhost:3000/professors/edit/Dr. Ray Klump we can see it uses
//our professor controller has a save professor function in which
//we search the database by a name, and edit their information and then save that to the database

app.get('/professors/edit/:name',ProfessorController.getProfessor,(req,res,next) => {
  res.render("editprof",{professors:req.data});
});
//the submit button will post the information to our save professor function and update the database
app.post("/saveprof", ProfessorController.saveProfessor);

//TODO: Does stuff when auth fails. Not sure how you want to display that.
app.get('/testAuthFail', (req,res,next) => {
  res.sendFile('static/testAuthFail.html', {root: __dirname });
});

//these are cards for the professors in the database
//we path to them by going to the static folder

app.get('/kim/professors/:name',ProfessorController.getProfessor,(req,res,next) => {
  res.render("kim",{professors:req.data});
});


app.get('/rayklump/professors/:name',ProfessorController.getProfessor,(req,res,next) => {
  res.render("rayklump",{professors:req.data});
});


app.listen(port, () => console.log(
  `Express started at \"http://localhost:${port}\"\n` +
  `press Ctrl-C to terminate.`)
)