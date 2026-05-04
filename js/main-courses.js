// Kyckling recept
fetch("https://www.themealdb.com/api/json/v1/1/filter.php?c=Chicken")
    .then(response => response.json())
    .then(data => {

        // Förbestämda chicken recept
        const chickenIds = [
            "52795",
            "52940",
            "52831",
            "52846",
            "52934"
        ];

        const chickenMeals = data.meals.filter(meal =>
            chickenIds.includes(meal.idMeal)
        );

        renderCards(
            chickenMeals,
            "chicken-container",
            "Tasty chicken recipes."
        );

    })
    .catch(error => {

        console.log("Chicken API failed:", error);

        showError(
            "Could not load chicken recipes.",
            "chicken-container"
        );

    });




// Pasta recept
fetch("https://www.themealdb.com/api/json/v1/1/filter.php?c=Pasta")
    .then(response => response.json())
    .then(data => {

        // Förbestämda pasta recept
        const pastaIds = [
            "52839",
            "53064",
            "52835",
            "52829",
            "52987"
        ];

        const pastaMeals = data.meals.filter(meal =>
            pastaIds.includes(meal.idMeal)
        );

        renderCards(
            pastaMeals,
            "pasta-container",
            "Delicious pasta dishes."
        );

    })
    .catch(error => {

        console.log("Pasta API failed:", error);

        showError(
            "Could not load pasta recipes.",
            "pasta-container"
        );

    });




// Nötkött recept
fetch("https://www.themealdb.com/api/json/v1/1/filter.php?c=Beef")
    .then(response => response.json())
    .then(data => {

        // Förbestämda beef recept
        const beefIds = [
            "52874",
            "52878",
            "52997",
            "53013",
            "52824"
        ];

        const beefMeals = data.meals.filter(meal =>
            beefIds.includes(meal.idMeal)
        );

        renderCards(
            beefMeals,
            "beef-container",
            "Rich and hearty beef meals."
        );

    })
    .catch(error => {

        console.log("Beef API failed:", error);

        showError(
            "Could not load beef recipes.",
            "beef-container"
        );

    });