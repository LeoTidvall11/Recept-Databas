fetch("https://www.themealdb.com/api/json/v1/1/filter.php?c=Starter")
  .then(response => response.json())
  .then(data => {

    const meals = data.meals;

    // Våra egna sub-kategorier
    const summerStarterIds = ["52841", "52779", "52840"];
    const quickStarterIds = ["53173", "52842", "53169"];

    // Filtrera ut rätt meals
    const summerMeals = meals.filter(meal =>
      summerStarterIds.includes(meal.idMeal)
    );

    const quickMeals = meals.filter(meal =>
      quickStarterIds.includes(meal.idMeal)
    );

    // Använd funktionerna från ui.js
    renderCards(summerMeals, "summer-container");
    renderCards(quickMeals, "quick-container");

  })
  .catch(error => {
    console.log(error);

    showError(
      "Could not load summer starters.",
      "summer-container"
    );

    showError(
      "Could not load quick starters.",
      "quick-container"
    );
  });