const Username = document.querySelector(".user");
Username.textContent = this.GetUserNameDisplay();

function GetUserNameDisplay(){
  return localStorage.getItem("Username") ?? "Unknown";
}

function getUsername(){
    const userName = localStorage.getItem('Username');
    return userName;
  }
async function loadRecipes(){
    let recipe = [];
    const userName = getUsername();
    try{
        const response = await fetch(`/api/recipes/${userName}`);
        recipe = await response.json();

        localStorage.setItem('dishName', recipe.name);
        localStorage.setItem('ingredients', recipe.materials);
        localStorage.setItem('steps', recipe.instructions);
    }
    catch{
        const recipeName = localStorage.getItem('dishName');
        const recipeIngredients = localStorage.getItem('ingredients');
        const recipeSteps = localStorage.getItem('steps');

        if(recipeName && recipeIngredients && recipeSteps){
            recipe = JSON.parse(recipeName, recipeIngredients, recipeSteps);
        }
    }
    if(recipe.length === 0){
        displayNoRecipe();
    }
    else {
        displayRecipe(recipe);
    }
}
loadRecipes();

function displayNoRecipe(){
    const cardContainer = document.querySelector('.card-container');
    const card = document.createElement('div');
    card.classList.add('card');
    card.innerHTML = `
    <h2>No Recipes Found</h2>
    `;
    cardContainer.appendChild(card);

}
function displayRecipe(recipe){
    const cardContainer = document.querySelector('.card-container');
    recipe.forEach(item => {
        const card = document.createElement('div');
        card.classList.add('card');

        let info = `
            <h2>${item.name}</h2>
            <h3>Ingredients</h3>
        `;
        let addIngredients = DisplayIngredients(item.materials);
        let addSteps = DisplaySteps(item.instructions);

        info += "\n<ul>\n";
        info += addIngredients;
        info += "</ul>\n";
        info += "<h3>Steps</h3>";
        info += "\n<ol>\n";
        info += addSteps;
        info += "</ol>";

        card.innerHTML = info;
        cardContainer.appendChild(card);
    });
}

function DisplayIngredients(listOfIngredients){
    let ret_string = '';
    let new_ingredients = listOfIngredients.split('\n');
    new_ingredients.forEach(ingredient => {
        ret_string += `<li>${ingredient}</li>\n`;
    });
    return ret_string;
}
function DisplaySteps(listOfSteps){
    let ret_string = '';
    let new_steps = listOfSteps.split('\n');
    new_steps.forEach(step => {
        ret_string += `<li>${step}</li>\n`;
    });
    return ret_string;
}