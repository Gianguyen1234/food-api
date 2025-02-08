const express = require('express');
const app = express();
const port = 3000;

// Sample food data
const foods = [
  { id: 1, name: 'Pizza', type: 'Italian' },
  { id: 2, name: 'Sushi', type: 'Japanese' },
  { id: 3, name: 'Burger', type: 'American' },
];

// Middleware to parse JSON
app.use(express.json());

// Routes
// Get all foods
app.get('/api/foods', (req, res) => {
  res.json(foods);
});

// Get a food by ID
app.get('/api/foods/:id', (req, res) => {
  const food = foods.find((f) => f.id === parseInt(req.params.id));
  if (!food) return res.status(404).send('Food not found');
  res.json(food);
});

// Create a new food
app.post('/api/foods', (req, res) => {
  const food = {
    id: foods.length + 1,
    name: req.body.name,
    type: req.body.type,
  };
  foods.push(food);
  res.status(201).json(food);
});

// Update a food by ID
app.put('/api/foods/:id', (req, res) => {
  const food = foods.find((f) => f.id === parseInt(req.params.id));
  if (!food) return res.status(404).send('Food not found');

  food.name = req.body.name;
  food.type = req.body.type;
  res.json(food);
});

// Delete a food by ID
app.delete('/api/foods/:id', (req, res) => {
  const foodIndex = foods.findIndex((f) => f.id === parseInt(req.params.id));
  if (foodIndex === -1) return res.status(404).send('Food not found');

  const deletedFood = foods.splice(foodIndex, 1);
  res.json(deletedFood);
});

// Start the server
app.listen(port, () => {
  console.log(`Food API running at http://localhost:${port}`);
});
