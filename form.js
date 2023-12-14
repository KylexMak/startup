const Username = document.querySelector(".user");
Username.textContent = this.GetUserNameDisplay();

function GetUserNameDisplay(){
  return localStorage.getItem("Username") ?? "Unknown";
}

async function redirect(){
  window.location.href= 'instructions.html';  
  await loadInstructions();
}

async function loadInstructions(){
    const dishName = document.querySelector("#dishName");
    const ingredients = document.querySelector("#ingredients");
    const steps = document.querySelector("#steps");
    localStorage.setItem("DishName", dishName.value);
    localStorage.setItem("Ingredients", ingredients.value);
    localStorage.setItem("Steps", steps.value);
    await saveRecipes(dishName.value, ingredients.value, steps.value);
}

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
