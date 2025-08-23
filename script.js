

// array with recipes
const allRecipes = [{
    title: 'Zucchuni patties',
    allergy: 'gv',
    level: 'Super makkelijk'
},
    {
        title: 'Beef patties',
        allergy: 'lv',
        level: 'Makkelijk'
    }]

// filter with checkbox

const recipeSection = document.querySelector('section.recipe-article')

const checkboxes = document.querySelectorAll('input[name=allergy]')
checkboxes.forEach(checkbox => {
    checkbox.addEventListener('change', () => {
         recipeSection.dispatchEvent(new CustomEvent ('recipesUpdate'))
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

recipeSection.addEventListener('recipesUpdate', showInfo)

// function to create recipes articles

function addRecipe(recipe) {
    const recipeArticle = document.createElement('article');
    recipeArticle.innerHTML = `<img class="delete" src="./img/delete.svg" alt="delete recipe"> <h2>${recipe.title}</h2><h3>${recipe.level}</h3><h3>${recipe.allergy}</h3>`;
    recipeArticle.classList.add(`${recipe.allergy}`);
    document.querySelector('.recipe-article').appendChild(recipeArticle);
}


// function for recipesNumber


function recipeNumber() {
    document.querySelector('.numberRecipes').innerHTML = ` Totaal aantal recepten: ${allRecipes.length}`;
}

// function to show all info

function showInfo() {
    const selectedAllergies = allergyList(); // to filter with allergy
    const searchValue = document.querySelector('.input-box').value.toLowerCase();
    document.querySelector('.recipe-article').innerHTML = ""; // to use seach box

    allRecipes.forEach(recipe => {
        if (recipe.title.toLowerCase().includes(searchValue) && selectedAllergies.length === 0 || selectedAllergies.includes(recipe.allergy)) {
            addRecipe(recipe);
        }


        });

    recipeNumber();


}

// function to count characters


function countCharacters()  {
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

