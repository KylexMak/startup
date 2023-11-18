const { MongoClient } = require('mongodb');
const config = require('./dbConfig.json');

const url = `mongodb+srv://${config.userName}:${config.password}@${config.hostname}`;
const client = new MongoClient(url);
const db = client.db('RecipeCollection');
const recipeCollection = db.collection('recipes');

(async function testConnection() {
    await client.connect();
    await db.command({ ping: 1 });
  })().catch((ex) => {
    console.log(`Unable to connect to database with ${url} because ${ex.message}`);
    process.exit(1);
  });

async function addRecipe(recipe) {
    const result = await recipeCollection.insertOne(recipe);
    return result;
}

async function getRecipes(userName){
  let query = {"Username": userName};
    const foundRecipes = recipeCollection.find(query);
    return foundRecipes.toArray();
}

module.exports = { addRecipe, getRecipes};