fetch("https://www.themealdb.com/api/json/v1/1/filter.php?c=Dessert")
  .then(response => response.json())
  .then(data => {

    const meals = data.meals;

    // Förbestämda dessert-ID:n
    const summerDessertsIds = [
      "52889",
      "53005",
      "53333",
      "52891",
      "53082"
    ];

    const quickDessertsIds = [
      "52854",
      "52855",
      "52958",
      "52966",
      "52924"
    ];

    // Filtrera fram exakt de recepten vi vill visa
    const summerMeals = meals.filter(meal =>
      summerDessertsIds.includes(meal.idMeal)
    );

    const quickMeals = meals.filter(meal =>
      quickDessertsIds.includes(meal.idMeal)
    );

    // Rendera kort med ui.js
    renderCards(
      summerMeals,
      "summer-container",
      "Perfect summer desserts."
    );

    renderCards(
      quickMeals,
      "quick-container",
      "Quick and easy desserts."
    );

  })
  .catch(error => {

    console.log(error);

    showError(
      "Could not load summer desserts.",
      "summer-container"
    );

    showError(
      "Could not load quick desserts.",
      "quick-container"
    );

  });