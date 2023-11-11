const express = require('express');
const app = express();

// The service port. In production the frontend code is statically hosted by the service on the same port.
const port = process.argv.length > 2 ? process.argv[2] : 3000;

// JSON body parsing using built-in middleware
app.use(express.json());

// Serve up the frontend static content hosting
app.use(express.static('public'));

// Router for service endpoints
const apiRouter = express.Router();
app.use(`/api`, apiRouter);

//getRecipes
apiRouter.get('/recipes', (_req, res) => {
    res.send(recipes);
});

//Submit Recipes
apiRouter.post('/recipe', (req, res) => {
    recipe = updateRecipes(req.body, recipe);
    res.send(recipe);
});

app.use((_req, res) => {
    res.sendFile('index.html', {root: 'public'});
});

app.listen(port, () => {
    console.log('Listening on port ${port}');
});