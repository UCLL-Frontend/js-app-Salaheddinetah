import { basicRecipes } from './recipes.js';
console.log(document.querySelector('section.recipe-article'));

let allRecipes = JSON.parse(localStorage.getItem('savedRecipes')) || basicRecipes;

const recipeSection = document.querySelector('section.recipe-article')

const update = 'recipe-update';

// Hier had ik Gemini gebruikt. Ik had mijn eigen functie maar ik had wat problemen ermee

const allergyMapping = {
    'gv': { name: 'Glutenvrij', color: '#FFA07A' },
    'lv': { name: 'Lactosevrij', color: '#ADD8E6' },
    'sv': { name: 'Suikervrij', color: '#90EE90' }
};

function getAllergyDisplayNames(allergyCodes) {
    return allergyCodes.split(',')
        .map(code => allergyMapping[code.trim()]?.name || code)
        .join(', ');
}

function getPrimaryAllergyColor(allergyCodes) {
    const firstAllergy = allergyCodes.split(',')[0].trim();
    return allergyMapping[firstAllergy]?.color || '#3bb371';
}

// Checkbox event listeners
const checkboxes = document.querySelectorAll('input[name=allergy]')
checkboxes.forEach(checkbox => {
    checkbox.addEventListener('change', () => {
        recipeSection.dispatchEvent(new CustomEvent(update))
    })
})

// list of selected allergies
function allergyList() {
    const allAllergy = []
    checkboxes.forEach(checkbox => {
        if (checkbox.checked) {
            allAllergy.push(checkbox.value)
        }
    })
    return allAllergy;
}

recipeSection.addEventListener(update, showInfo)



// function to create recipe articles
function addRecipe(recipe) {
    const recipeArticle = document.createElement('article');
    const allergyDisplayNames = getAllergyDisplayNames(recipe.allergy);
    const linkColor = getPrimaryAllergyColor(recipe.allergy);

    recipeArticle.innerHTML = `
        <h2>${recipe.title}</h2>
        <img class="recipe-img" src="${recipe.image}" alt="recept afbeelding">
        
        <p><strong>Niveau: </strong>${recipe.level} </p>
        <p><strong>Dieetwensen: </strong>${allergyDisplayNames} </p>
        <a class="recipe-link" href="${recipe.link}" style="border-color: ${linkColor}; color: ${linkColor};">Recept link</a>
        <img class="delete" src="./img/delete.svg" alt="delete recipe">
    `;
    recipeArticle.classList.add(...recipe.allergy.split(',').map(a => a.trim()));
    document.querySelector('.recipe-article').appendChild(recipeArticle);
    recipeArticle.querySelector('.delete').addEventListener('click', () => {
        deleteRecipe(recipe.title);
    });
}

//  checkboxes with difficulty
const difficultyCheckboxes = document.querySelectorAll('input[name=difficulty]')
difficultyCheckboxes.forEach(checkbox => {
    checkbox.addEventListener('change', () => {
        recipeSection.dispatchEvent(new CustomEvent(update))
    })
})

function difficultyList() {
    const selectedDifficulties = []
    difficultyCheckboxes.forEach(checkbox => {
        if (checkbox.checked) {
            selectedDifficulties.push(checkbox.value)
        }
    })
    return selectedDifficulties;
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
    const selectedAllergies = allergyList();
    const selectedDifficulties = difficultyList();
    const searchValue = document.querySelector('.input-box').value.toLowerCase();
    document.querySelector('.recipe-article').innerHTML = "";

    allRecipes.forEach(recipe => {
        const recipeAllergies = recipe.allergy.split(',').map(a => a.trim());
        if (
            recipe.title.toLowerCase().includes(searchValue) &&
            (selectedAllergies.length === 0 || selectedAllergies.some(a => recipeAllergies.includes(a))) &&
            (selectedDifficulties.length === 0 || selectedDifficulties.includes(recipe.level))
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
