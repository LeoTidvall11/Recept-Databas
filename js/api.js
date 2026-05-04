// Hämtar måltider från TheMealDB API
async function fetchMeals(category) {
    // Väntar på att fetch hämtar svar från API:et
    const response = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${category}`)
    // Omvandlar datan till JSON
    const data = await response.json()
    // Returnerar en lista med måltider
    return data.meals
}