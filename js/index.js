Promise.all([
    fetch("https://www.themealdb.com/api/json/v1/1/filter.php?c=Dessert")
        .then(response => response.json()),

    fetch("https://www.themealdb.com/api/json/v1/1/filter.php?c=Starter")
        .then(response => response.json()),

    fetch("https://www.themealdb.com/api/json/v1/1/filter.php?c=Pasta")
        .then(response => response.json())
])

.then(([dessertData, starterData, pastaData]) => {

// 3 förbestämda recept:
// 1 dessert, 1 starter, 1 pasta
    // Förbestämda recept-ID:n
    const dessertId = "52893";
    const starterId = "52840";
    const pastaId = "52844";

    // Hittar recepten
    const dessertMeal = dessertData.meals.find(meal =>
        meal.idMeal === dessertId
    );

    const starterMeal = starterData.meals.find(meal =>
        meal.idMeal === starterId
    );

    const pastaMeal = pastaData.meals.find(meal =>
        meal.idMeal === pastaId
    );

    const favoriteMeals = [
        dessertMeal,
        starterMeal,
        pastaMeal
    ];

    // Visa recepten
    renderCards(
        favoriteMeals,
        "favorites-container",
        "Featured recipe of the week."
    );

})

.catch(error => {

    console.log(error);

    showError(
        "Could not load favorite recipes.",
        "favorite-container"
    );

});