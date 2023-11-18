const express = require('express');
const app = express();
const DB = require('./database.js');

// The service port. In production the frontend code is statically hosted by the service on the same port.
const port = process.argv.length > 2 ? process.argv[2] : 4000;

// JSON body parsing using built-in middleware
app.use(express.json());

// Serve up the frontend static content hosting
app.use(express.static('public'));

// Router for service endpoints
const apiRouter = express.Router();
app.use(`/api`, apiRouter);

//getRecipes
apiRouter.get('/recipes/:userName', async (_req, res) => {
    const recipe = await DB.getRecipes(_req.params.userName);
    res.send(recipe);
});

//Submit Recipes
apiRouter.post('/recipe', (req, res) => {
    DB.addRecipe(req.body)
    res.status(200);
});

app.use((_req, res) => {
    res.sendFile('index.html', {root: 'public'});
});

app.listen(port, () => {
    console.log(`Listening to port ${port}`);
});