// Hämtar olika kategorier för huvudrätter och visar dem på sidan
async function filterMainCourses() {
  try {
    showLoading(); // Visar laddningsikonen medan vi hämtar data
    // Funktionen väntar med att hämta en lista med olika måltider
    const chickenMeals = await fetchMeals("Chicken");
    const pastaMeals = await fetchMeals("Pasta");
    const beefMeals = await fetchMeals("Beef");

    // Förbestämda chicken recept
    const chickenIds = ["52795", "52940", "52831", "52846", "52934"];

    const filteredChicken = chickenMeals.filter((meal) =>
      chickenIds.includes(meal.idMeal),
    );

    renderCards(filteredChicken, "chicken-container", "Tasty chicken recipes.");

    // Förbestämda pasta recept
    const pastaIds = ["52839", "53064", "52835", "52829", "52987"];

    const filteredPasta = pastaMeals.filter((meal) =>
      pastaIds.includes(meal.idMeal),
    );

    renderCards(filteredPasta, "pasta-container", "Delicious pasta dishes.");

    // Förbestämda beef recept
    const beefIds = ["52874", "52878", "52997", "53013", "52824"];

    const filteredBeef = beefMeals.filter((meal) =>
      beefIds.includes(meal.idMeal),
    );

    renderCards(filteredBeef, "beef-container", "Rich and hearty beef meals.");
  } catch (error) {
    showError("Could not load chicken recipes.", "chicken-container");

    showError("Could not load pasta recipes.", "pasta-container");

    showError("Could not load beef recipes.", "beef-container");
  } finally {
    hideLoading(); // Döljer laddningsikonen när allt är klart
  }
}
  
filterMainCourses();
