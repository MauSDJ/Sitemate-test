const express = require("express");
const cors = require("cors");
const RestClient = require("./RestClient");
const server = new RestClient("http://server:8000/");
const app = express();
const port = 3000;

app.use(express.json());
app.use(cors());

// Route to create a new resource
app.post("/issues", async (req, res) => {
  try {
    const newResource = await server.post("/api/issues", req.body);
    res.json(newResource);
  } catch (error) {
    console.error(error);
    res.status(500).send("Error creating resource");
  }
});

// Route to read a resource
app.get("/issues/:id", async (req, res) => {
  try {
    const resource = await server.get(`/api/issues/${req.params.id}`);
    res.json(resource);
  } catch (error) {
    console.error(error);
    res.status(500).send("Error fetching resource");
  }
});

// Route to get all issues
app.get("/issues", async (req, res) => {
  try {
    const allIssues = await server.get("/api/issues");
    res.json(allIssues);
  } catch (error) {
    console.error(error);
    res.status(500).send("Error fetching all issues");
  }
});

// Route to update a resource
app.put("/issues/:id", async (req, res) => {
  try {
    const updatedResource = await server.put(
      `/api/issues/${req.params.id}`,
      req.body
    );
    res.json(updatedResource);
  } catch (error) {
    console.error(error);
    res.status(500).send("Error updating resource");
  }
});

// Route to delete a resource
app.delete("/issues/:id", async (req, res) => {
  try {
    const deletedResource = await server.delete(`/api/issues/${req.params.id}`);
    res.json(deletedResource);
  } catch (error) {
    console.error(error);
    res.status(500).send("Error deleting resource");
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}.`);
});
