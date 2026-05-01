const summerContainer = document.getElementById("summer-container");
const quickContainer = document.getElementById("quick-container");

fetch("https://www.themealdb.com/api/json/v1/1/filter.php?c=Dessert")
  .then(response => response.json())
  .then(data => {

    const meals = data.meals;

    // Filtrera mer för våra egna sub-kategorier
    const summerDessertsIds = [  "52889", "53005", "53333", "52891", "53082", "53303", "53346", "53347", "52859", "52862", "53163", "53276", "53007", "53322", "53148", "52853", "53054", "53170", "53153", "53321"];
    const quickDessertsIds = ["52854", "52855", "52958", "52966", "52924", "52929", "53015", "52786", "52931", "53339", "53111", "53101", "52961", "52932", "52923", "53337", "52917", "52905", "53338", "53138"];

    // Filtrera meals array för att få meals med ids som vi skrev övanför
    const summerMeals = meals.filter(meal =>
      summerDessertsIds.includes(meal.idMeal)
    );

    const quickMeals = meals.filter(meal =>
      quickDessertsIds.includes(meal.idMeal)
    );

     const randomSummerMeals = summerMeals
      .sort(() => Math.random() - 0.5)
      .slice(0, 5);

    const randomQuickMeals = quickMeals
      .sort(() => Math.random() - 0.5)
      .slice(0, 5);

    // Visa sommar förrätter
    randomSummerMeals.forEach(meal => {

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
    randomQuickMeals.forEach(meal => {

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