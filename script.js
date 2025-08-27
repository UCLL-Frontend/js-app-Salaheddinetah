import { basicRecipes } from './recipes.js';
console.log(document.querySelector('section.recipe-article'));


let allRecipes = JSON.parse(localStorage.getItem('savedRecipes')) || basicRecipes;


const recipeSection = document.querySelector('section.recipe-article')


const update = 'recipe-update';

// Checkbox event listeners
const checkboxes = document.querySelectorAll('input[name=allergy]')
checkboxes.forEach(checkbox => {
    checkbox.addEventListener('change', () => {
        recipeSection.dispatchEvent(new CustomEvent(update))
    })
})

// get list of selected allergies
function allergyList() {
    const allAllergy = []
    checkboxes.forEach(checkbox => {
        if (checkbox.checked) {
            allAllergy.push(checkbox.value)
        }
    })
    return allAllergy;
}

// correct event listener
recipeSection.addEventListener(update, showInfo)

// function to create recipe articles
function addRecipe(recipe) {
    const recipeArticle = document.createElement('article');
    recipeArticle.innerHTML = `
        <img class="recipe-img" src="${recipe.image}" alt="recept afbeelding">
      
        <h3>${recipe.level}</h3>
        <h3>${recipe.allergy}</h3>
        <img class="delete" src="./img/delete.svg" alt="delete recipe"> 
        <a class="recipe-link ${recipe.allergy}" href="${recipe.link}">Recept link</a>
    `;
    recipeArticle.classList.add(...recipe.allergy.split(','));
    document.querySelector('.recipe-article').appendChild(recipeArticle);
    recipeArticle.querySelector('.delete').addEventListener('click', () => {
        deleteRecipe(recipe.title);
    });
}

// function delete a recipe
function deleteRecipe(deleteTitle) {
    const place = allRecipes.findIndex(recipe => recipe.title === deleteTitle);
    if (place !== -1) allRecipes.splice(place, 1);
    localStorage.setItem('savedRecipes', JSON.stringify(allRecipes));
    recipeSection.dispatchEvent(new CustomEvent(update));
    recipeNumber();
}

// function for recipesNumber
function recipeNumber() {
    document.querySelector('.numberRecipes').innerHTML = `Totaal aantal recepten: ${allRecipes.length}`;
}

// function to show all info
function showInfo() {
    const selectedAllergies = allergyList(); // to filter with allergy
    const searchValue = document.querySelector('.input-box').value.toLowerCase();
    document.querySelector('.recipe-article').innerHTML = ""; // clear recipes

    allRecipes.forEach(recipe => {
        const recipeAllergies = recipe.allergy.split(',');
        if (
            recipe.title.toLowerCase().includes(searchValue) &&
            (selectedAllergies.length === 0 || selectedAllergies.some(a => recipeAllergies.includes(a)))
        ) {
            addRecipe(recipe);
        }
    });

    recipeNumber();
}

// function to count characters
function countCharacters() {
    let numberLetters = document.querySelector('.input-box').value.length;
    document.querySelector('.number-characters').innerText = numberLetters;
}

// find using searchbox
document.querySelector('.input-box').addEventListener('input', () => {
    countCharacters();
    showInfo();
});

countCharacters();
showInfo();