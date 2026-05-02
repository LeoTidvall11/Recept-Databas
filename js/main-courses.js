// Funktionen hämtar huvudrätter från API:et och visar dem på sidan
async function init() {
    //Väntar på att fetchMeals hämtar huvudrätter från API:et
    const meals = await fetchMeals ("Main Course") //Denna kategori existerar inte, behöver ändras?
    //Skickar måltiderna till renderCards funktionen som bygger korten på sidan
    renderCards(meals, "mains")
}
//Anropar init så att allt körs
init()