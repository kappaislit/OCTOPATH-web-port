import express from "express";
import cors from "cors";

const app = express();
app.use(cors());
app.use(express.json());

let posts = [];

app.get("/posts", (req, res) => {
  res.json(posts);
});

app.post("/posts", (req, res) => {
  posts.unshift(req.body);
  res.json({ success: true });
});

app.delete("/posts/:id", (req, res) => {
  posts = posts.filter(p => p.id !== req.params.id);
  res.json({ success: true });
});

app.listen(3000);
