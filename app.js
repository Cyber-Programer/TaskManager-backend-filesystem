const express = require("express");
const path = require("path");
const fs = require("fs");
const app = express();
const {
  ckDirAvailable,
  createFile,
  showAllFiles,
} = require("./JsFunctions/dir.js");
const port = 3000;
const user = "user11";

app.set("view engine", "ejs");
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));

// routes
app.get("/", async (req, res) => {
  try {
    let data = await showAllFiles(user);
    res.render("index", { data });
  } catch (err) {
    if (err.code === "ENOENT") {
      // If the directory does not exist, render the index page without data
      res.render("index", { data: null });
    } else {
      // Handle other errors
      console.error(err);
      res.status(500).send("Internal Server Error");
    }
  }
});

// show note details

app.get("/:username/:filename", async (req, res) => {
  const { username, filename } = req.params;
  const Path = path.join(__dirname, "Folder/" + username);
  const fileName = filename.trim() + ".txt";
  const filePath = path.join(Path, fileName);
  fs.readFile(filePath, "utf8", (err, data) => {
    if (err) {
      res.status(500).send("Error reading file");
    } else {
      res.render("noteDetails", { filename, data });
    }
  });
});

// add ntoes
app.post("/user/:username/addNote", async (req, res) => {
  const { username } = req.params;
  const { title, textarea } = req.body;
  const filePath = path.join(__dirname, "Folder/" + username);
  const fileName = title.trim().split(" ").join("-") + ".txt";
  const file = path.join(filePath, fileName);
  const message = await createFile(username, fileName, textarea);
  if (message === "File created") {
    res.redirect("/");
  } else {
    res.status(500).send(message);
  }
});

app.listen(port, () => console.log("server is running on port 3000"));
