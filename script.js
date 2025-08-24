// array with recipes
const allRecipes = [{
    title: 'Zucchuni patties',
    text: ' Recipe text',
    allergy: 'gv',
    level: 'Super makkelijk'
},
    {
        title: 'Beef patties',
        allergy: 'lv',
        text: ' Recipe text',
        level: 'Makkelijk'
    }]

// filter with checkbox
const recipeSection = document.querySelector('section.recipe-article')

// event type string
const updateEventType = 'recipe-update';

const checkboxes = document.querySelectorAll('input[name=allergy]')
checkboxes.forEach(checkbox => {
    checkbox.addEventListener('change', () => {
        recipeSection.dispatchEvent(new CustomEvent(updateEventType))
    })
})

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
recipeSection.addEventListener(updateEventType, showInfo)

// function to create recipes articles
function addRecipe(recipe) {
    const recipeArticle = document.createElement('article');
    recipeArticle.innerHTML = `<img class="delete" src="./img/delete.svg" alt="delete recipe"> 
                               <h2>${recipe.title}</h2>
                               <p>${recipe.text}</p>
                               <h3>${recipe.level}</h3>
                               <h3>${recipe.allergy}</h3>`;
    recipeArticle.classList.add(`${recipe.allergy}`);
    document.querySelector('.recipe-article').appendChild(recipeArticle);
    recipeArticle.querySelector('.delete').addEventListener('click', () => {
        deleteRecipe(recipe.title);
    });
}

// function delete a recipe
function deleteRecipe(deleteTitle) {
    const place = allRecipes.findIndex(recipe => recipe.title === deleteTitle);
    if (place !== -1) allRecipes.splice(place, 1);
    recipeSection.dispatchEvent(new CustomEvent(updateEventType));
    recipeNumber();
}

// function notification
function notification(type, message) {
    document.querySelector('.notification').innerHTML = `<p class ="${type}">${message}</p>`;
}

// function for add.html form
function addPage() {
    const newRecipe = {
        title: document.querySelector('#title').value,
        text: document.querySelector('#text').value,
        allergy: document.querySelector('#allergy').value,
        level: document.querySelector('#level').value,
    }

    if (newRecipe.title && newRecipe.text && newRecipe.allergy && newRecipe.text) {
        allRecipes.push(newRecipe);

        recipeSection.dispatchEvent(new CustomEvent(updateEventType));
        notification('ok','Recept toegevoegd!');
    }  else {
        notification('error','Niet alle velden ingevuld!');
    }


}

document.querySelector('form.add').addEventListener('submit', (event) => {
    event.preventDefault();
    addPage();
});

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
        if (recipe.title.toLowerCase().includes(searchValue) &&
            (selectedAllergies.length === 0 || selectedAllergies.includes(recipe.allergy))) {
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
