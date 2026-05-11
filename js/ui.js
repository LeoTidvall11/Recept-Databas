// Den här filen hanterar allt som visas på sidan.
// Den skapar och visar receptkort och felmeddelanden i HTML:en.
console.log("ui.js loaded");

// FUNKTION: renderCards
// Tar emot en lista med recept och ett container-id,
// och bygger och visar ett kort per recept på sidan.
function renderCards(meals, containerId) {
  const container = document.getElementById(containerId);
  container.innerHTML = "";

  meals.forEach((meal) => {
    const card = document.createElement("div");
    card.className = "recipe-card";

    const link = document.createElement("a");
    link.href = `recipe.html?id=${meal.idMeal}`;
    link.className = "recipe-link";

    const img = document.createElement("img");
    img.src = meal.strMealThumb;
    img.alt = meal.strMeal;
    img.className = "card-img";

    const content = document.createElement("div");
    content.className = "card-content";

    const h3 = document.createElement("h3");
    h3.textContent = meal.strMeal;

    const p = document.createElement("p");
    p.textContent = meal.strCountry;
    p.className = "card-description";

    content.appendChild(h3);
    content.appendChild(p);
    link.appendChild(img);
    link.appendChild(content);
    card.appendChild(link);
    container.appendChild(card);
  });
}

function showError(message, containerId) {
  const container = document.getElementById(containerId);
  container.innerHTML = `<p class="error-message">${message}</p>`;
}
// Laddningsikon - skapas dynamiskt så att den fungerar på alla sidor
function getLoadingIcon(containerId) {
  let icon = document.getElementById("loading-icon");
  if (!icon) {
    icon = document.createElement("div");
    icon.id = "loading-icon";
    icon.className = "loading-icon";
    const parent =
      containerId ? document.getElementById(containerId) : document.body;
    if (parent) {
      parent.style.position = "relative";
      parent.appendChild(icon);
    } else {
      document.body.appendChild(icon);
    }
  }
  return icon;
}

function showLoading(containerId) {
  getLoadingIcon(containerId).style.display = "block";
}
function hideLoading(containerId) {
  getLoadingIcon(containerId).style.display = "none";
}
