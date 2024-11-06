const { createHash } = require('crypto');

const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient()
var express = require("express"),
  session = require("express-session"),
  bodyParser = require("body-parser"),  // Middleware to parse request bodies
  app = express(),
  MemcachedStore = require("connect-memcached")(session);


app.use(bodyParser.urlencoded({ extended: true }));

app.use(
  session({
    secret: "CatOnKeyboard",
    key: "test",
    proxy: "true",
    resave: false,
    saveUninitialized: false,
    store: new MemcachedStore({
      hosts: ["127.0.0.1:11211"],
      secret: "123, easy as ABC. ABC, easy as 123" // Memcached session encryption
    }),
    cookie: {
      maxAge: 86400000  // Cookie expiry time (1 day)
    }
  })
);

// Route to handle login
app.post("/login", async function(req, res) {
  const { username, password } = req.body;  // Get username and password from request
  //console.log(Hash('sha256').update(password).digest('hex'));
  const check = await authenticateUser(username, password);
    console.log(check);
  if (check) {
    req.session.username = username;  // Store username in session
    req.session.isAuthenticated = true;  // Add flag to indicate successful login
    res.send(`Login erfolgreich. Willkommen, ${username}!<br><a href="/memberbereich">Memberbereich</a><br><a href="/logout">Logout</a><br><a href="/">Home</a>`);

  } else {
    res.status(401).send("Login failed. Please provide a valid username and password or register. <a href='/loginpage'>go back</a>");
  }
});

// Route to display the number of views and username
app.get("/", function(req, res) {
  res.sendFile(`${__dirname}/index.html`);
});

app.post("/register", function(req, res) {
    const { username, password } = req.body;  // Get username and password from request

    createUser(username, password);
 
    req.session.username = username;
    req.session.isAuthenticated = true;

    res.send(`Benutzer erfolgreich eingeloggt<br><a href="/memberbereich">Memberbereich</a><br><a href="/logout">Logout</a><br><a href="/">Home</a>`);
});

app.get("/memberbereich", function(req, res) {
    if (!req.session.isAuthenticated) {
        return res.status(401).send("nicht eingeloggt <a href='/loginpage'>Login</a>");
    }
    
    res.send(`Welcome im Mitgleidsbereich, ${req.session.username}! Leider ist unser Programmierer zu faul um hier was zu machen. <a href='/logout'>Logout</a>`);
    });


app.get("/loginpage", function(req, res) {
    res.sendFile(`${__dirname}/login.html`);
});

// Logout route to destroy session
app.get("/logout", function(req, res) {
  req.session.destroy(function(err) {
    if (err) {
      return res.status(500).send("Logout failed.");
    }
    res.send("Erfolgreich ausgeloggt <a href='/'>Home</a>");
  });
});

// Start the server
app.listen(9341, function() {
  console.log("Listening on %d", this.address().port);
});


async function authenticateUser(username, password) {

 useablePwd = createHash('sha256').update(password).digest('hex'); 
 console.log(useablePwd);
 let something = 0;
 try {
    const information = await prisma.userdata.findFirst({
        where: {
          username: username,
          password: useablePwd
        }});
    console.log(information);
    if (information === null) { {
        console.log("User not found");
        something = 1;
        return false;
    }}
    console.log(information.username);
 } catch (error) {
    console.log("something went wrong "+error);
 }
 
 if (something === 1) {
    return false;
 }
 return true;
}

async function createUser(username, password) {
    useablePwd = createHash('sha256').update(password).digest('hex');
    await prisma.userdata.create({
        data: {
            username: username,
            password: useablePwd
        }
    });
}