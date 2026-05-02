   //Parametern tar emot en kategori, funktionen hämtar måltider från API:et
   async function fetchMeals(category) {
    //Funktionen väntar med att hämta svar från API:et med await
   const response = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${category}`)
   //Omvandlar datan till Json
   const data = await response.json()
   //Returnerar en lista med måltider
   return data.meals
   }