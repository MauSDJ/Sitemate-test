const express = require("express");
const cors = require("cors");
const app = express();
const port = 8000;

app.use(express.json());
app.use(cors());

let issues = [];

// Create
app.post("/api/issues", (req, res) => {
  const issue = req.body;
  issues.push(issue);
  console.log("Issue created:", issue);
  res.status(201).send(issue);
});

// Read
app.get("/api/issues", (req, res) => {
  res.send(issues);
});

app.get("/api/issues/:id", (req, res) => {
  const { id } = req.params;
  const issue = issues.find((issue) => issue.id === parseInt(id));
  if (issue) {
    console.log("Issue found:", issue);
    res.json(issue);
  } else {
    res.status(404).send("Issue not found");
  }
});

// Update
app.put("/api/issues/:id", (req, res) => {
  const { id } = req.params;
  const updatedIssue = req.body;
  const index = issues.findIndex((issue) => issue.id === parseInt(id));
  if (index !== -1) {
    issues[index] = updatedIssue;
    console.log("Issue updated:", updatedIssue);
    res.send(updatedIssue);
  } else {
    res.status(404).send("Issue not found");
  }
});

// Delete
app.delete("/api/issues/:id", (req, res) => {
  const { id } = req.params;
  const index = issues.findIndex((issue) => issue.id === parseInt(id));
  if (index !== -1) {
    const deletedIssue = issues.splice(index, 1);
    console.log("Issue deleted:", deletedIssue);
    res.send(deletedIssue);
  } else {
    res.status(404).send("Issue not found");
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}.`);
});
