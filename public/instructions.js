class Recipe{
    constructor(){
        dishName = GetDishName();
        ingredientsList = GetDishIngredients();
        steps = GetDishSteps();
    }
}

function GetDishName(){
    return localStorage.getItem("DishName");
}

function GetDishIngredients(){
    return localStorage.getItem("Ingredients");
}

function GetDishSteps(){
    return localStorage.getItem("Steps");
}

function DisplayName(){
    return localStorage.getItem("DishName");
}

function DisplayIngredients(){
    const listContainer = document.getElementsByClassName("Ingredients-list")
    const IngredientsList = Recipe.ingredientsList;
    IngredientsList.array.forEach(element => {
        const listItem = document.createElement("li");
        listItem.textContent = element;
        listContainer.appendChild(listItem);
    });
}

function DisplaySteps(){
    const listContainer = document.getElementsByClassName("Step-list")
    const StepsList = Recipe.steps;
    StepsList.array.forEach(element => {
        const listItem = document.createElement("li");
        listItem.textContent = element;
        listContainer.appendChild(listItem);
    });
}

const showName = document.querySelector(".DishName");
showName.textContent = this.DisplayName();
const showName = document.querySelector(".DishIngredients");
showName.textContent = this.DisplayIngredients();
const showName = document.querySelector(".DishSteps");
showName.textContent = this.DisplaySteps();