// Hämtar sökordet från URL:en, t.ex. search.html?q=chicken ger searchTerm = "chicken"
const urlParams = new URLSearchParams(window.location.search);
const searchTerm = urlParams.get("q") ?? ""; // ?? "" betyder: använd tom sträng om inget ord finns

// Visar sökordet som en rubrik på sidan
document.getElementById("search-term").textContent = searchTerm;

// Fyller i sökfältet med sökordet så användaren ser vad de sökte på
const searchInput = document.getElementById("search-input");
if (searchInput) {
  searchInput.value = searchTerm;

  // Lyssnar på Enter och sökikonen så användaren kan söka igen
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

// Hämtar elementen där resultat och antal träffar ska visas
const resultsGrid = document.getElementById("results-grid");
const resultsCount = document.getElementById("results-count");

// Skapar och visar receptkort för varje måltid
function renderCards(meals) {
  resultsGrid.innerHTML = ""; // Tömmer gamla resultat innan nya visas

  // Om inga recept hittades visas ett meddelande
  if (meals.length === 0) {
    const noResults = document.createElement("p");
    noResults.className = "no-results";
    noResults.textContent = `No recipes found for "${searchTerm}".`;
    resultsGrid.appendChild(noResults);
    resultsCount.textContent = "";
    return;
  }

  resultsCount.textContent = `${meals.length} recipes found`;

  // Loopar igenom varje recept och skapar ett klickbart kort med bild och info
  meals.forEach((meal) => {
    const link = document.createElement("a");
    link.href = `https://www.themealdb.com/meal/${meal.idMeal}`;
    link.classList.add("recipe-link");
    link.target = "_blank"; // Öppnar receptet i en ny flik
    link.rel = "noopener noreferrer"; // Säkerhetsattribut för externa länkar

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

    // Lägger till bild, rubrik och beskrivning i länken, sedan länken i griden
    link.appendChild(img);
    link.appendChild(h3);
    link.appendChild(p);
    resultsGrid.appendChild(link);
  });
}

// Om ett sökord finns hämtas och visas resultat annars visas ett meddelande
if (searchTerm.length > 0) {
  searchMeals(searchTerm).then(renderCards);
} else {
  resultsGrid.innerHTML = `<p class="no-results">Use the search bar to find recipes.</p>`;
}
