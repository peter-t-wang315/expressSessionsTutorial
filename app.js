const express = require("express");
const path = require("path");

const app = express();

app.use(express.urlencoded({ extended: true }));

app.use(express.static(path.join(__dirname, "public")));

app.get("/", (req, res) => {
  res.render(path.join(__dirname, "public", "login.ejs"));
});

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
  } else {
    res.render(path.join(__dirname, "public", "login.ejs"), {
      message: "Invalid Credentials",
    });
  }
});

app.get("/home", (req, res) => {});

app.get("/logout", (req, res) => {});

app.post("/logout", (req, res) => {});

app.post("/toggle-theme", (req, res) => {});

app.listen(3000, () => {
  console.log("Server running on port 3000");
});
