// Hämtar förrätter och visar dem på sidan
async function filterStarters() {
  try {
    showLoading("summer-container"); // Visar laddningsikonen medan vi hämtar data
    // Funktionen väntar med att hämta en lista med förrätter
    const meals = await fetchMeals("Starter");

    // Våra egna sub-kategorier
    const summerStarterIds = ["52841", "52779", "52840"];
    const quickStarterIds = ["53173", "52842", "53169"];

    // Filtrera ut rätt meals
    const summerMeals = meals.filter((meal) =>
      summerStarterIds.includes(meal.idMeal),
    );

    const quickMeals = meals.filter((meal) =>
      quickStarterIds.includes(meal.idMeal),
    );

    // Använd funktionerna från ui.js
    renderCards(summerMeals, "summer-container");
    renderCards(quickMeals, "quick-container");
  } catch (error) {
    showError("Could not load summer starters.", "summer-container");

    showError("Could not load quick starters.", "quick-container");
  } finally {
    hideLoading("summer-container"); // Döljer laddningsikonen när allt är klart
  }
}
filterStarters();
