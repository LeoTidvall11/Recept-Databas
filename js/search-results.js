// Hämtar sökordet från URL:en, t.ex. search.html?q=chicken ger searchTerm = "chicken"
const urlParams = new URLSearchParams(window.location.search);

const searchTerm = urlParams.get("q") ?? ""; // ?? "" betyder: använd tom sträng om inget ord finns
// Visar sökordet som en rubrik på sidan
document.getElementById("search-term").textContent = searchTerm;

// Visar "rensa sökning" länken om det finns ett sökord eller ett aktivt filter
if (searchTerm || urlParams.get("filter")) {
  const label = document.getElementById("search-query-label");
  const clearLink = document.createElement("a");
  clearLink.href = "search.html";
  clearLink.textContent = "✕ Clear search";
  clearLink.style.cssText =
    "margin-left: 1rem; font-size: 0.95rem; color: var(--accent-red); text-decoration: none;";
  label.appendChild(clearLink);
}

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

// Kategorier och sub-kategorier för filtrering
const CATEGORIES = [
  {
    label: "Starters",
    apiName: "Starter",
    subcategories: [],
  },
  {
    label: "Main Courses",
    apiName: null,
    subcategories: [
      { label: "Chicken", apiName: "Chicken" },
      { label: "Pasta", apiName: "Pasta" },
      { label: "Beef", apiName: "Beef" },
    ],
  },
  {
    label: "Desserts",
    apiName: "Dessert",
    subcategories: [],
  },
];

// Aktiva filter
const activeFilters = new Set();
const mealCache = {};

// pagination variables
let currentPage = 1;
const PAGE_SIZE = 12;
let currentMeals = [];

// Läser in aktiv filter från URL, till exemplel search.html?filter=Chicken
const presetFilter = urlParams.get("filter");
if (presetFilter) {
  activeFilters.add(presetFilter);
}

// bygga filter sidebar dynamiskt
function buildFilters() {
  const sidebar = document.getElementById("filter-sidebar");
  if (!sidebar) return;

  CATEGORIES.forEach((cat) => {
    if (cat.apiName) {
      sidebar.appendChild(
        createFilterBtn(cat.label, cat.apiName, "filter-btn"),
      );
    } else {
      const group = document.createElement("div");
      group.className = "filter-group";

      const title = document.createElement("span");
      title.className = "filter-group-title";
      title.textContent = cat.label;
      group.appendChild(title);

      const subWrap = document.createElement("div");
      subWrap.className = "filter-subgroup";
      cat.subcategories.forEach((sub) => {
        subWrap.appendChild(
          createFilterBtn(sub.label, sub.apiName, "filter-btn filter-btn--sub"),
        );
      });

      group.appendChild(subWrap);
      sidebar.appendChild(group);
    }
  });
}

function createFilterBtn(label, apiName, className) {
  const btn = document.createElement("button");
  btn.className = className;
  btn.dataset.api = apiName;
  btn.textContent = label;
  if (activeFilters.has(apiName)) btn.classList.add("active");
  btn.addEventListener("click", () => toggleFilter(apiName, btn));
  return btn;
}

function toggleFilter(apiName, btn) {
  if (activeFilters.has(apiName)) {
    activeFilters.delete(apiName);
    btn.classList.remove("active");
  } else {
    activeFilters.add(apiName);
    btn.classList.add("active");
  }
  applyAndRender();
}

// Hämtar alla recept per kategori
async function getMealsForCategory(apiName) {
  if (mealCache[apiName]) return mealCache[apiName];
  const meals = await fetchMeals(apiName);
  meals.forEach((m) => {
    m._category = apiName;
  });
  mealCache[apiName] = meals;
  return meals;
}

function allLeafApiNames() {
  const names = [];
  CATEGORIES.forEach((cat) => {
    if (cat.apiName) names.push(cat.apiName);
    cat.subcategories.forEach((s) => names.push(s.apiName));
  });
  return names;
}

function wantedApiNames() {
  if (activeFilters.size === 0) return allLeafApiNames();
  return [...activeFilters];
}

//Om filter ändras, dynamisk uppdaterar resultat
async function applyAndRender() {
  showLoading("results-wrapper");
  resultsGrid.innerHTML = "";
  resultsCount.textContent = "";

  const wanted = wantedApiNames();
  let allMeals = (await Promise.all(wanted.map(getMealsForCategory))).flat();

  if (searchTerm.trim()) {
    const q = searchTerm.toLowerCase();
    allMeals = allMeals.filter((m) => m.strMeal.toLowerCase().includes(q));
  }

  renderCards(allMeals);
  hideLoading("results-wrapper");
}

// Hämtar elementen där resultat och antal träffar ska visas
const resultsGrid = document.getElementById("results-grid");
const resultsCount = document.getElementById("results-count");
// Skapar och visar receptkort för varje måltid
function renderCards(meals) {
  currentMeals = meals;
  currentPage = 1;
  renderPage();
}

// Visar ett meddelande när inga resultat hittades
function showNoResults(message) {
  const noResults = document.createElement("p");
  noResults.className = "no-results";
  noResults.textContent = message;
  resultsGrid.appendChild(noResults);
}

function renderPage() {
  resultsGrid.innerHTML = ""; // Tömmer gamla resultat innan nya visas

  // Om inga recept hittades visas ett meddelande
  if (currentMeals.length === 0) {
    showNoResults(`No recipes found for "${searchTerm}".`);
    resultsCount.textContent = "";
    renderPagination();
    return;
  }

  const start = (currentPage - 1) * PAGE_SIZE;
  const pageMeals = currentMeals.slice(start, start + PAGE_SIZE);

  resultsCount.textContent = `${currentMeals.length} recipes found`;

  // Loopar igenom varje recept och skapar ett klickbart kort med bild och info
  pageMeals.forEach((meal) => {
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
    p.textContent =
      meal.strCategory ?
        `${meal.strCategory} — ${meal.strArea}`
      : `${meal._category} — ${meal.strArea}`;
    p.className = "card-description";
    link.appendChild(img);
    link.appendChild(h3);
    link.appendChild(p);
    resultsGrid.appendChild(link);
  });

  renderPagination();
}

// rendera pagination
function renderPagination() {
  const existing = document.getElementById("pagination");
  if (existing) existing.remove();

  const totalPages = Math.ceil(currentMeals.length / PAGE_SIZE);
  if (totalPages <= 1) return;

  const nav = document.createElement("div");
  nav.id = "pagination";

  function addBtn(i) {
    const btn = document.createElement("button");
    btn.textContent = i;
    btn.className = "page-btn" + (i === currentPage ? " active" : "");
    btn.addEventListener("click", () => {
      currentPage = i;
      renderPage();
      window.scrollTo({ top: 0, behavior: "smooth" });
    });
    nav.appendChild(btn);
  }

  function addDots() {
    const dots = document.createElement("span");
    dots.textContent = "…";
    dots.className = "page-dots";
    nav.appendChild(dots);
  }

  for (let i = 1; i <= totalPages; i++) {
    if (
      i === 1 || // alltid visa första sida
      i === totalPages || // alltid visa sista sida
      (i >= currentPage - 1 && i <= currentPage + 1) // visa närliggande sidor
    ) {
      addBtn(i);
    } else if (i === currentPage - 2 || i === currentPage + 2) {
      addDots();
    }
  }

  resultsGrid.after(nav);
}

// Om det finns ett sökord i URL:en, gör en sökning och visa resultaten
if (searchTerm.length > 0) {
  showLoading("results-wrapper");
  searchMeals(searchTerm)
    .then(renderCards)
    .finally(() => hideLoading("results-wrapper"));
} else {
  showNoResults(
    "Apply a category filter or use the search bar to find recipes.",
  );
}

// Bygga filter vid start
buildFilters();

// Om filter är förvalt via URL(Om kunden kommer från en kategori-sida), visar filtrerade recept direkt
if (activeFilters.size > 0 && searchTerm.length === 0) {
  applyAndRender();
}
