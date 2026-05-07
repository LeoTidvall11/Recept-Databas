// Hämtar HTML-elementen från sidan så att vi kan ändra dem med JavaScript
const suggestionsBox = document.getElementById("suggestions-box");
const suggestionsList = document.querySelector("#suggestions-box ul");
const searchInput = document.getElementById("search-input");

// Debounce väntar tills användaren slutat skriva (300ms) innan funktionen körs.
// Om vi inte hade detta skulle ett API-anrop göras för varje bokstav som skrivs.
function debounce(fn, delay) {
  let timer;
  return function (...args) {
     clearTimeout(timer); // Nollställer timern om användaren skriver igen
    timer = setTimeout(() => fn(...args), delay);
  };
}

// Körs 300ms efter att användaren slutat skriva i sökfältet
const handleInput = debounce(async (event) => {
  const query = event.target.value;

  // Väntar tills användaren skrivit minst 3 tecken innan vi söker
  if (query.length <= 2) {
    suggestionsList.innerHTML = "";
    suggestionsBox.classList.remove("active");
    return;
  }

  // Anropar API:et och väntar på svaret (await pausar koden tills svaret kommit)
  const meals = await searchMeals(query);
  suggestionsList.innerHTML = ""; // Tömmer gamla förslag

  if (meals.length > 0) {
    suggestionsBox.classList.add("active");
    // Visar max 7 förslag som klickbara listobjekt
    meals.slice(0, 7).forEach((meal) => {
      const suggestionItem = document.createElement("li");
      suggestionItem.textContent = meal.strMeal;
      suggestionItem.classList.add("suggestion-item");
// När användaren klickar på ett förslag navigeras de till söksidan med det ordet
      suggestionItem.addEventListener("click", () => {
        window.location.href = `search.html?q=${encodeURIComponent(meal.strMeal)}`;
      });
      suggestionsList.appendChild(suggestionItem);
    });
  } else {
    suggestionsBox.classList.remove("active"); // Döljer rutan om inga träffar hittades
  }
}, 300);

// Lyssnar på tangenttryckningar och musklick i sökfältet
searchInput.addEventListener("input", handleInput);

searchInput.addEventListener("keydown", (event) => {
  if (event.key === "Enter") {
    window.location.href = `search.html?q=${encodeURIComponent(searchInput.value)}`;
  }
});

const searchIcon = document.querySelector(".search-icon");
if (searchIcon) {
  searchIcon.addEventListener("click", () => {
    // trim() tar bort mellanslag i början och slutet av sökordet
    if (searchInput.value.trim()) {
      window.location.href = `search.html?q=${encodeURIComponent(searchInput.value.trim())}`;
    }
  });
}
