const dishName = document.querySelector("#dishName");
const ingredients = document.querySelector("#ingredients");
const steps = document.querySelector(".steps");
localStorage.setItem("DishName", dishName.value);
localStorage.setItem("Ingredients", ingredients.value);
localStorage.setItem("Steps", steps.value);
