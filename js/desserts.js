// Hämtar efterrätter och visar dem på sidan
async function filterDesserts() {
  try {
    showLoading(); // Visar laddningsikonen medan vi hämtar data
    // Funktionen väntar med att hämta en lista med efterrätter
    const meals = await fetchMeals("Dessert");

    // Förbestämda dessert-ID:n
    const summerDessertsIds = ["52889", "53005", "53333", "52891", "53082"];

    const quickDessertsIds = ["52854", "52855", "52958", "52966", "52924"];

    // Filtrera fram exakt de recepten vi vill visa
    const summerMeals = meals.filter((meal) =>
      summerDessertsIds.includes(meal.idMeal),
    );

    const quickMeals = meals.filter((meal) =>
      quickDessertsIds.includes(meal.idMeal),
    );

    // Rendera kort med ui.js
    renderCards(summerMeals, "summer-container", "Perfect summer desserts.");

    renderCards(quickMeals, "quick-container", "Quick and easy desserts.");
  } catch (error) {
    showError("Could not load summer desserts.", "summer-container");

    showError("Could not load quick desserts.", "quick-container");
  } finally {
    hideLoading(); // Döljer laddningsikonen när allt är klart
  }
}

filterDesserts();
