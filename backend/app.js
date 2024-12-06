import express from "express";
import cors from "cors";

const app = express();

//корс заглушка
app.use(cors());
//отключение кеширования
app.enable('view cache');
app.set('view cache', false);
app.use(express.json());

const notes = [];
let nextId = 1;

app.get("/notes", (req, res) => {
  res.send(JSON.stringify(notes));
});

app.post("/notes", (req, res) => {
  notes.push({ ...req.body, id: nextId++ });
  res.status(204);
  res.end();
});

app.delete("/notes/:id", (req, res) => {
  const noteId = Number(req.params.id);
  const index = notes.findIndex((o) => o.id === noteId);
  if (index !== -1) {
    notes.splice(index, 1);
  }
  res.status(204);
  res.end();
});

const port = 6262;
app.listen(port, () => console.log(`The server is running on http://localhost:${port}`));