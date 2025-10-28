const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');

const app = express();
const PORT = 3000;

let todos = [];

app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public')));

app.get('/api/todos', (req, res) => {
  res.json(todos);
});

app.post('/api/todos', (req, res) => {
  const { text } = req.body;
  if (!text) return res.status(400).json({ error: 'text required' });

  const newItem = {
    id: Date.now(),
    text: text.trim(),
    done: false
  };
  todos.push(newItem);
  res.json(newItem);
});

app.delete('/api/todos/:id', (req, res) => {
  const id = Number(req.params.id);
  todos = todos.filter(t => t.id !== id);
  res.json({ success: true });
});

app.patch('/api/todos/:id', (req, res) => {
  const id = Number(req.params.id);
  const item = todos.find(t => t.id === id);
  if (!item) return res.status(404).json({ error: 'not found' });
  item.done = !item.done;
  res.json(item);
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});