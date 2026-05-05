const suggestionsBox = document.getElementById("suggestions-box");
const suggestionsList = document.querySelector("#suggestions-box ul");
const searchInput = document.getElementById("search-input");

searchInput.addEventListener("input", async (event) => {
  const query = event.target.value;
  if (query.length <= 2) {
    suggestionsList.innerHTML = "";
    suggestionsBox.classList.remove("active");
    return;
  }

  const meals = await searchMeals(query);
  suggestionsList.innerHTML = "";

  if (meals.length > 0) {
    suggestionsBox.classList.add("active");
    meals.slice(0, 7).forEach((meal) => {
      const suggestionItem = document.createElement("li");
      suggestionItem.textContent = meal.strMeal;
      suggestionItem.classList.add("suggestion-item");
      suggestionItem.addEventListener("click", () => {
        window.location.href = `search.html?q=${encodeURIComponent(meal.strMeal)}`;
      });
      suggestionsList.appendChild(suggestionItem);
    });
  } else {
    suggestionsBox.classList.remove("active");
  }
});

searchInput.addEventListener("keydown", (event) => {
  if (event.key === "Enter") {
    window.location.href = `search.html?q=${encodeURIComponent(searchInput.value)}`;
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
