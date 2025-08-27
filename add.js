

import { basicRecipes } from './recipes.js';

let allRecipes = JSON.parse(localStorage.getItem('savedRecipes')) || basicRecipes;

// function notification
function notification(type, message) {
    document.querySelector('.notification').innerHTML = `<p class ="${type}">${message}</p>`;
}

// function for add.html form
function addPage() {
    const selectedAllergies = [];
    document.querySelectorAll('input[name="allergy"]:checked').forEach(cb => selectedAllergies.push(cb.value));

    const newRecipe = {
        title: document.querySelector('#title').value,
        image: document.querySelector('#image').value.trim(),
        link: document.querySelector('#link').value,
        allergy: selectedAllergies.join(','),
        level: document.querySelector('#level').value
    };

    if (newRecipe.title && newRecipe.link && newRecipe.level) {
        allRecipes.push(newRecipe);
        localStorage.setItem('savedRecipes', JSON.stringify(allRecipes));
        notification('ok', 'Recept toegevoegd!');
    } else {
        notification('error', 'Niet alle velden ingevuld!');
    }
}

document.querySelector('form.add').addEventListener('submit', (event) => {
    event.preventDefault();
    addPage();
});

