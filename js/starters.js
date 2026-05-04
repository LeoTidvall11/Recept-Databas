// Funktionen hämtar förrätter från API:et och visar dem på sidan
async function init() {
    //Väntar på att fetchMeals hämtar förrätter från API:et
    const meals = await fetchMeals ("Starter")
    //Skickar måltiderna till renderCards funktionen som bygger korten på sidan
    renderCards(meals, "starters")
}
//Anropar init så att allt körs
init()