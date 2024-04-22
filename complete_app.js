const express = require("express");
const session = require("express-session"); // 1 ------------------------------------------------------
const path = require("path");

const app = express();

app.use(express.urlencoded({ extended: true }));

// 2 ------------------------------------------------------------------------------------------------------------
app.use(
  session({
    secret: "your_secret_key_here",
    resave: false,
    saveUninitialized: true,
  })
);

app.use(express.static(path.join(__dirname, "public")));

app.get("/", (req, res) => {
  res.render(path.join(__dirname, "public", "login.ejs"));
});

// 2.5 ------------------------------------------------------------------------------------------------------------
const users = [
  { id: 1, username: "user1", password: "user1" },
  { id: 2, username: "user2", password: "user2" },
];

app.post("/login", (req, res) => {
  const { username, password } = req.body;
  const user = users.find(
    (u) => u.username === username && u.password === password
  );

  if (user) {
    // 3 ------------------------------------------------------------------------------------------------------------
    req.session.loggedIn = true;
    req.session.username = username;
    req.session.theme = "light";
    res.redirect("/home");
  } else {
    res.render(path.join(__dirname, "public", "login.ejs"), {
      message: "Invalid Credentials",
    });
  }
});

app.get("/home", (req, res) => {
  // 4 ------------------------------------------------------------------------------------------------------------
  if (req.session.loggedIn) {
    const theme = req.session.theme;
    const username = req.session.username;
    res.render(path.join(__dirname, "public", "home.ejs"), {
      username: username,
      theme: theme,
    });
  } else {
    res.redirect("/");
  }
});

app.get("/logout", (req, res) => {
  // 5 ------------------------------------------------------------------------------------------------------------
  if (req.session.loggedIn) {
    const username = req.session.username;
    const theme = req.session.theme;
    res.render(path.join(__dirname, "public", "logout.ejs"), {
      username: username,
      theme: theme,
    });
  } else {
    res.redirect("/");
  }
});

app.post("/logout", (req, res) => {
  // 6 ------------------------------------------------------------------------------------------------------------
  req.session.destroy();
  res.redirect("/");
});

app.post("/toggle-theme", (req, res) => {
  // 7 ------------------------------------------------------------------------------------------------------------
  if (req.session.loggedIn) {
    if (req.session.theme === "dark") {
      req.session.theme = "light";
    } else {
      req.session.theme = "dark";
    }
    res.redirect("/home");
  } else {
    res.redirect("/");
  }
});

app.listen(3000, () => {
  console.log("Server running on port 3000");
});
