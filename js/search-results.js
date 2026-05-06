//parameter q används för att hämta sökordet från URL:en, t.ex. search.html?q=chicken
const urlParams = new URLSearchParams(window.location.search);
const searchTerm = urlParams.get("q") ?? "";
// Sätter sökordet i rubriken och i sökfältet
document.getElementById("search-term").textContent = searchTerm;

// Hanterar sökfältets funktionalitet
const searchInput = document.getElementById("search-input");
if (searchInput) {
  searchInput.value = searchTerm;
  //event listener för att hantera sökningar när användaren trycker på Enter eller klickar på sökikonen
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
// Funktion för att rendera sökresultaten på sidan
const resultsGrid = document.getElementById("results-grid");
const resultsCount = document.getElementById("results-count");
// Tar emot en array av måltider och skapar kort för varje måltid
function renderCards(meals) {
  resultsGrid.innerHTML = "";

  if (meals.length === 0) {
    const noResults = document.createElement("p");
    noResults.className = "no-results";
    noResults.textContent = `No recipes found for "${searchTerm}".`;
    resultsGrid.appendChild(noResults);
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

    const img = document.createElement("img");
    img.src = meal.strMealThumb;
    img.alt = meal.strMeal;
    img.className = "card-img";

    const h3 = document.createElement("h3");
    h3.className = "card-header";
    h3.textContent = meal.strMeal;

    const p = document.createElement("p");
    p.textContent = `${meal.strCategory} — ${meal.strArea}`;
    p.className = "card-description";

    link.appendChild(img);
    link.appendChild(h3);
    link.appendChild(p);
    resultsGrid.appendChild(link);
  });
}

if (searchTerm.length > 0) {
  searchMeals(searchTerm).then(renderCards);
} else {
  resultsGrid.innerHTML = `<p class="no-results">Use the search bar to find recipes.</p>`;
}
