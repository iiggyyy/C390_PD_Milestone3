const express = require("express");
const path = require("path");
const app = express();

// load project data
const projectData = require("./projectsData");

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.static(path.join(__dirname, "public")));

// main pages
app.get("/", (req, res) => res.render("index", { page: "home" }));
app.get("/portfolio", (req, res) => res.render("portfolio", { page: "portfolio" }));
app.get("/about", (req, res) => res.render("about", { page: "about" }));
app.get("/contact", (req, res) => res.render("contact", { page: "contact" }));
app.get("/certs", (req, res) => res.render("certs", { page: "certs" }));

// dynamic project pages
app.get("/project/:id", (req, res) => {
  const project = projectData.find(p => p.id === req.params.id);

  if (!project) {
    return res.status(404).send("Project not found");
  }

  res.render("project", { page: "project", project });
});

const PORT = 3000;
app.listen(PORT, () => console.log(`Server running at http://localhost:${PORT}`));
