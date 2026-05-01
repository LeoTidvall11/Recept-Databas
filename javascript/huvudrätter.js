const chickenContainer = document.getElementById("chicken-container");
const pastaContainer = document.getElementById("pasta-container");
const beefContainer = document.getElementById("beef-container");


// Kyckling recept
fetch("https://www.themealdb.com/api/json/v1/1/filter.php?c=Chicken")
    .then(response => response.json())
    .then(data => {


        data.meals
            .sort(() => Math.random() - 0.5)
            .slice(0, 5)
            .forEach(meal => {

                chickenContainer.innerHTML += `
        <a href="#" class="recipe-link">

          <article class="recipe-card">

            <img
              src="${meal.strMealThumb}"
              alt="${meal.strMeal}"
              class="card-img"
            />

            <div class="card-content">
              <h3 class="card-header">
                ${meal.strMeal}
              </h3>
            </div>

          </article>

        </a>
      `;

            });

    })
    .catch(error => {

        console.log("Chicken API failed:", error);

        chickenContainer.innerHTML =
            "<p>Could not load chicken recipes.</p>";

    });




// Pasta recept
fetch("https://www.themealdb.com/api/json/v1/1/filter.php?c=Pasta")
    .then(response => response.json())
    .then(data => {

        data.meals.sort(() => Math.random() - 0.5)
            .slice(0, 5)
            .forEach(meal => {

                pastaContainer.innerHTML += `
        <a href="#" class="recipe-link">

          <article class="recipe-card">

            <img
              src="${meal.strMealThumb}"
              alt="${meal.strMeal}"
              class="card-img"
            />

            <div class="card-content">
              <h3 class="card-header">
                ${meal.strMeal}
              </h3>
            </div>

          </article>

        </a>
      `;

            });

    })
    .catch(error => {

        console.log("Pasta API failed:", error);

        pastaContainer.innerHTML =
            "<p>Could not load pasta recipes.</p>";

    });

// Nötkött recept
fetch("https://www.themealdb.com/api/json/v1/1/filter.php?c=Beef")
    .then(response => response.json())
    .then(data => {

        data.meals.sort(() => Math.random() - 0.5)
            .slice(0, 5)
            .forEach(meal => {

                beefContainer.innerHTML += `
        <a href="#" class="recipe-link">

          <article class="recipe-card">

            <img
              src="${meal.strMealThumb}"
              alt="${meal.strMeal}"
              class="card-img"
            />

            <div class="card-content">
              <h3 class="card-header">
                ${meal.strMeal}
              </h3>
            </div>

          </article>

        </a>
      `;

            });

    })
    .catch(error => {

        console.log("Beef API failed:", error);

        beefContainer.innerHTML =
            "<p>Could not load beef recipes.</p>";

    });
