
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
        alt="${meal.strMeal}" class="card-image">
        <div class="card-content">
        <h3>${meal.strMeal}</h3>
        </div>
        `;
        container.appendChild(card);
    });
}


function showError(message) {
    const container = document.getElementById("card-container-summer");
    container.innerHTML = `<p class="error-message">${message}</p>`;
}



// TESTDATA — tas bort när api.js är klar
const testData = [
    {
        strMeal: "Bruschetta",
        strMealThumb: "https://www.themealdb.com/images/media/meals/uuuspp1511297945.jpg"
    },
    {
        strMeal: "Poutine",
        strMealThumb: "https://www.themealdb.com/images/media/meals/uuyrrx1487327597.jpg"
    },
    {
        strMeal: "Smoked Haddock Kedgeree",
        strMealThumb: "https://www.themealdb.com/images/media/meals/1550441882.jpg"
    },
    {
        strMeal: "Timbits",
        strMealThumb: "https://www.themealdb.com/images/media/meals/txsupu1511815755.jpg"
    },
    {
        strMeal: "Wontons",
        strMealThumb: "https://www.themealdb.com/images/media/meals/1525876468.jpg"
    }
];
// testa visa 5 kort i varje sektion
renderCards(testData, "card-container-summer");
renderCards(testData, "card-container-quick");