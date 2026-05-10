// Hämtar och visar ett recept baserat på id från URL:en
async function init() {
    try {
        // Hämtar id från URL:en
const params = new URLSearchParams(window.location.search)
const id = params.get("id")
// Hämtar receptet från API:et med id:t
const meal = await getMealById(id)

// Hämtar namn
document.getElementById("meal-name").innerHTML = `<h1>${meal.strMeal}</h1>`
// Hämtar bild
document.getElementById("meal-image").innerHTML = `<img src="${meal.strMealThumb}" alt="${meal.strMeal}">`
// Hämtar kategori
document.getElementById("meal-category").innerHTML = `<h1>${meal.strCategory}</h1>`
// Hämtar instruktioner
document.getElementById("meal-instructions").innerHTML = `<p>${meal.strInstructions}</p>`
// Hämtar ingridienser
let ingredientsList = ""

for (let i = 1; i <= 20; i++) {
    const ingredient = meal[`strIngredient${i}`]
    const measure = meal[`strMeasure${i}`]
    if (ingredient) {
        // Hämtar mängd från API:et
        ingredientsList += `<p>${measure} ${ingredient}</p>`
    }
}
document.getElementById("meal-ingredients").innerHTML = ingredientsList

} catch(error) {
    // Om det misslyckas, visa felmeddelande
showError("Could not load recipe.", "meal-name")
}
}

init()