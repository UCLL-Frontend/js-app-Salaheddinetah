


const allRecipes = [{
    title: 'Zucchuni patties',
    allergy: 'gv',
    level: 'Super makkelijk'
},
    {
        title: 'Zucchuni patties',
        allergy: 'g',
        level: 'Super makkelijk'
    }]

function addRecipe(recipe) {
    const recipeArticle = document.createElement('article');
    recipeArticle.innerHTML = `<h2>${recipe.title}</h2><h3>${recipe.level}</h3><h3>${recipe.allergy}</h3>`;
    recipeArticle.classList.add(`${recipe.allergy}`);
    document.querySelector('.recipe-article').appendChild(recipeArticle);
}

function recipeNumber() {
    document.querySelector('.numberRecipes').innerHTML += `${allRecipes.length}`;
}

function showInfo(){
    allRecipes.forEach(addRecipe);
    recipeNumber();
}


showInfo();
