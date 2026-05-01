
// Den här filen hanterar allt som visas på sidan.
// Den skapar och visar receptkort och felmeddelanden i HTML:en.
console.log("ui.js loaded");

// FUNKTION: renderCards
// Tar emot en lista med recept och ett container-id,
// och bygger och visar ett kort per recept på sidan.
function renderCards(meals, containerId) {
    const container = document.getElementById(containerId);
    container.innerHTML = ""; 

    meals.forEach(meal => {
        const card = document.createElement("div");
        card.className = "recipe-card";
        card.innerHTML = `
        <img src="${meal.strMealThumb}" 
        alt="${meal.strMeal}" class="card-img">
        <div class="card-content">
        <h3>${meal.strMeal}</h3>
        </div>
        `;
        container.appendChild(card);
    });
}


function showError(message, containerId) {
    const container = document.getElementById(containerId);
    container.innerHTML = `<p class="error-message">${message}</p>`;
}