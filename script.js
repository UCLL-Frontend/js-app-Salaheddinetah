


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

function addRecipe(recipe) {
    const recipeArticle = document.createElement('article');
    recipeArticle.innerHTML = `<h2>${recipe.title}</h2><h3>${recipe.level}</h3><h3>${recipe.allergy}</h3>`;
    recipeArticle.classList.add(`${recipe.allergy}`);
    document.querySelector('.recipe-article').appendChild(recipeArticle);
}

function countCharacters()  {
    let numberLetters = document.querySelector('.input-box').value.length;
        document.querySelector('.number-characters').innerText = numberLetters;
}

document.querySelector('.input-box').addEventListener('input', countCharacters);

function recipeNumber() {
    document.querySelector('.numberRecipes').innerHTML += `${allRecipes.length}`;
}

function showInfo(){
    allRecipes.forEach(addRecipe);
    recipeNumber();
    countCharacters();
}


showInfo();
