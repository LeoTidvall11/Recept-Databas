export async function searchMeals(searchQuery) {
  const response = await fetch(
    `https://www.themealdb.com/api/json/v1/1/search.php?s=${searchQuery}`,
  );
  const data = await response.json();
  return data.meals ?? [];
}
