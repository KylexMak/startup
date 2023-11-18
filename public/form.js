async function redirect(){
    await loadInstructions();
    window.location.href= 'instructions.html';
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

async function saveRecipes(dishName, ingredients, steps){
    const recipe = {name: dishName, materials: ingredients, instructions: steps}

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
        this.updateScoresLocal(recipe);
      }
}
