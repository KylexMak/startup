import React from 'react';
//import './selection.css';

export function Form() {
    const dishName = document.querySelector("#dishName");
    const ingredients = document.querySelector("#ingredients");
    const steps = document.querySelector("#steps");
    localStorage.setItem("DishName", dishName.value);
    localStorage.setItem("Ingredients", ingredients.value);
    localStorage.setItem("Steps", steps.value);
    saveRecipes(dishName.value, ingredients.value, steps.value);

function getUsername(){
  const userName = localStorage.getItem('Username');
  return userName;
}

async function saveRecipes(dishName, ingredients, steps){
  const userName = getUsername();
    const recipe = {Username: userName, name: dishName, materials: ingredients, instructions: steps}

    try {
        const response = await fetch('/api/recipe', {
          method: 'POST',
          headers: {'content-type': 'application/json'},
          body: JSON.stringify(recipe),
        });
  
        // Store what the service gave us as the high scores
        const food = await response.json();
        localStorage.setItem('recipe', JSON.stringify(food));
      } catch {
        // If there was an error then just track scores locally
        this.updateRecipeLocal(recipe);
      }
}

function updateRecipeLocal(newRecipe){
  let recipe = [];
    const recipeText = localStorage.getItem('recipe');
    if (recipeTextText) {
      recipe = JSON.parse(recipeText);
    }

    recipe.push(newRecipe);

    localStorage.setItem('recipe', JSON.stringify(recipe));
}
  return (
    <main>
      <div style="padding: 20px;">
        <div>
          <h1>Add a New Dish Recipe</h1>
        </div>
      <div>
          <form action='instructions.html' id="post" onsubmit="loadInstructions()">
            <div className="form-outline mb-4">
              <label for="dishName">Dish Name:</label>
              <input type="text" id="dishName" name="dishName" required/>
            </div>


            <label for="ingredients">Ingredients:</label>
            <textarea id="ingredients" name="ingredients" rows="4" cols="50" placeholder="Hit enter after each Ingredient" required></textarea>

            <label for="cookingSteps">Cooking Steps:</label>
              <textarea type="text" id="steps" rows="4" cols="50" placeholder="Hit enter after each step in the recipe" required></textarea>

                <input type="submit" className="btn btn-outline-primary" value="Submit Recipe"/>
          </form>
        </div>
      </div>
    </main>
  );
}