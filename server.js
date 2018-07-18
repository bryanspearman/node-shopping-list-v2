
const express = require('express');
const router = express.Router();
const morgan = require('morgan');
const bodyParser = require('body-parser');
const {ShoppingList, Recipes} = require('./models');
const jsonParser = bodyParser.json();
const app = express();

app.use(morgan('common'));

// starter items
ShoppingList.create('beans', 2);
ShoppingList.create('tomatoes', 3);
ShoppingList.create('peppers', 4);

Recipes.create(
  'boiled white rice', ['1 cup white rice', '2 cups water', 'pinch of salt']);
Recipes.create(
  'milkshake', ['2 tbsp cocoa', '2 cups vanilla ice cream', '1 cup milk']);

// get routers for shopping list or recipes
app.get('/shopping-list', (req, res) => {
  res.json(ShoppingList.get());
});

app.get('/recipes', (req, res) => {
  res.json(Recipes.get());
})

// post routers for shopping list and recipes
app.post('/shopping-list', jsonParser, (req, res) => {
  // ensure `name` and `budget` are in request body
  const requiredFields = ['name', 'budget'];
  for (let i=0; i<requiredFields.length; i++) {
    const field = requiredFields[i];
    if (!(field in req.body)) {
      const message = `Missing \`${field}\` in request body`
      console.error(message);
      return res.status(400).send(message);
    }
  }

  const item = ShoppingList.create(req.body.name, req.body.budget);
  res.status(201).json(item);
});

app.post('/shopping-list', jsonParser, (req, res) => {
  // ensure `name` and `ingredients` are in request body
  const requiredFields = ['name', 'ingredients'];
  for (let i = 0; i < requiredFields.length; i++) {
    const field = requiredFields[i];
    if (!(field in req.body)) {
      const message = `Missing \`${field}\` in request body`
      console.error(message);
      return res.status(400).send(message);
    }
  }

  const item = Recipes.create(req.body.name, req.body.ingredients);
  res.status(201).json(item);
});




app.listen(process.env.PORT || 8080, () => {
  console.log(`Your app is listening on port ${process.env.PORT || 8080}`);
});
