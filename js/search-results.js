const urlParams = new URLSearchParams(window.location.search);
const searchTerm = urlParams.get("q") ?? "";

document.getElementById("search-term").textContent = searchTerm;

const searchInput = document.getElementById("search-input");
if (searchInput) {
  searchInput.value = searchTerm;

  searchInput.addEventListener("keydown", (event) => {
    if (event.key === "Enter" && searchInput.value.trim()) {
      window.location.href = `search.html?q=${encodeURIComponent(searchInput.value.trim())}`;
    }
  });

  const searchIcon = document.querySelector(".search-icon");
  if (searchIcon) {
    searchIcon.addEventListener("click", () => {
      if (searchInput.value.trim()) {
        window.location.href = `search.html?q=${encodeURIComponent(searchInput.value.trim())}`;
      }
    });
  }
}

const resultsGrid = document.getElementById("results-grid");
const resultsCount = document.getElementById("results-count");

function renderCards(meals) {
  resultsGrid.innerHTML = "";

  if (meals.length === 0) {
    resultsGrid.innerHTML = `<p class="no-results">No recipes found for "${searchTerm}".</p>`;
    resultsCount.textContent = "";
    return;
  }

  resultsCount.textContent = `${meals.length} recipes found`;

  meals.forEach((meal) => {
    const link = document.createElement("a");
    link.href = `https://www.themealdb.com/meal/${meal.idMeal}`;
    link.classList.add("recipe-link");
    link.target = "_blank";
    link.rel = "noopener noreferrer";

    link.innerHTML = `
      <article class="recipe-card">
        <img src="${meal.strMealThumb}" alt="${meal.strMeal}" class="card-img" />
        <div class="card-content">
          <h3 class="card-header">${meal.strMeal}</h3>
          <p>${meal.strCategory} &mdash; ${meal.strArea}</p>
        </div>
      </article>
    `;

    resultsGrid.appendChild(link);
  });
}

if (searchTerm.length > 0) {
  searchMeals(searchTerm).then(renderCards);
} else {
  resultsGrid.innerHTML = `<p class="no-results">Use the search bar to find recipes.</p>`;
}
