// Hämtar och visar ett recept baserat på id från URL:en
async function renderRecipe() {
  showLoading("meal-name");
  try {
    // Hämtar id från URL:en
    const params = new URLSearchParams(window.location.search);
    const id = params.get("id");
    // Hämtar receptet från API:et med id:t
    const meal = await getMealById(id);

    const mealNameElement = document.getElementById("meal-name");
    mealNameElement.textContent = meal.strMeal;
    const mealImageElement = document.getElementById("meal-image");
    mealImageElement.src = meal.strMealThumb;

    const mealAreaElement = document.getElementById("meal-area");
    const areaIcon = document.createElement("i");
    areaIcon.className = "fa-solid fa-earth-americas";
    mealAreaElement.replaceChildren(areaIcon, ` ${meal.strArea}`);

    const mealCategoryElement = document.getElementById("meal-category");
    const categoryIcon = document.createElement("i");
    categoryIcon.className = "fa-solid fa-tag";
    mealCategoryElement.replaceChildren(categoryIcon, ` ${meal.strCategory}`);

    const mealInstructionsElement =
      document.getElementById("meal-instructions");
    mealInstructionsElement.innerHTML = "";

    const steps = meal.strInstructions.split("\r\n");

    steps.forEach((step) => {
      if (step.trim().length > 0) {
        const li = document.createElement("li");
        li.textContent = step;
        mealInstructionsElement.appendChild(li);
      }
    });

    const mealIngredientsList = document.getElementById("meal-ingredients");
    mealIngredientsList.innerHTML = "";

    for (let i = 1; i <= 20; i++) {
      const ingredient = meal[`strIngredient${i}`];
      const measure = meal[`strMeasure${i}`];

      if (ingredient && ingredient.trim() !== "") {
        const li = document.createElement("li");

        li.textContent = `${measure} ${ingredient}`;

        mealIngredientsList.appendChild(li);
      }
    }
    hideLoading("meal-name");
  } catch (error) {
    hideLoading("meal-name");
    // Om det misslyckas, visa felmeddelande
    showError("Could not load recipe.", "meal-name");
  }
}

renderRecipe();
