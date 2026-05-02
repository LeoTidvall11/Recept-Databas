// Funktionen hämtar efterrätter från API:et och visar dem på sidan
async function init() {
    //Väntar på att fetchMeals hämtar efterrätter från API:et
    const meals = await fetchMeals ("Dessert")
    //Skickar måltiderna till renderCards funktionen som bygger korten på sidan
    renderCards(meals, "desserts")
}
//Anropar init så att allt körs
init()