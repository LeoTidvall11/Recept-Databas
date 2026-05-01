const summerContainer = document.getElementById("summer-container");
const quickContainer = document.getElementById("quick-container");

fetch("https://www.themealdb.com/api/json/v1/1/filter.php?c=Starter")
  .then(response => response.json())
  .then(data => {

    const meals = data.meals;

    // Filtrera mer för våra egna sub-kategorier
    const summerStarterIds = ["52841", "52779", "52840"];
    const quickStarterIds = ["53173", "52842", "53169"];

    // Filtrera meals array för att få meals med ids som vi skrev övanför
    const summerMeals = meals.filter(meal =>
      summerStarterIds.includes(meal.idMeal)
    );

    const quickMeals = meals.filter(meal =>
      quickStarterIds.includes(meal.idMeal)
    );

    // Visa sommar förrätter
    summerMeals.forEach(meal => {

      summerContainer.innerHTML += `
        <a href="#" class="recipe-link">
          <article class="recipe-card">

            <img
              src="${meal.strMealThumb}"
              alt="${meal.strMeal}"
              class="card-img"
            />

            <div class="card-content">
              <h3 class="card-header">${meal.strMeal}</h3>

              <p>
                ${meal.strArea} cuisine
              </p>
            </div>

          </article>
        </a>
      `;

    });

    // Visa snabba förrätter
    quickMeals.forEach(meal => {

      quickContainer.innerHTML += `
        <a href="#" class="recipe-link">
          <article class="recipe-card">

            <img
              src="${meal.strMealThumb}"
              alt="${meal.strMeal}"
              class="card-img"
            />

            <div class="card-content">
              <h3 class="card-header">${meal.strMeal}</h3>

              <p>
                ${meal.strArea} cuisine
              </p>
            </div>

          </article>
        </a>
      `;

    });

  })
  .catch(error => {
    console.log(error);
  });