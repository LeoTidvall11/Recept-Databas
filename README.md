# Receptdatabas
 
En webbapplikation där användare kan söka efter recept, filtrera på kategori och se detaljerade instruktioner för varje rätt. Projektet är byggt med HTML, CSS och JavaScript och hämtar data från ett externt API.
 
## API
 
Projektet använder [TheMealDB](https://www.themealdb.com/api.php) — en gratis, öppen receptdatabas med hundratals rätter från hela världen.
 
## Funktioner
 
- Sök recept på namn
- Filtrera recept per kategori (Förrätter, Huvudrätter, Efterrätter)
- Visa fullständiga receptdetaljer med ingredienser och instruktioner

 
## Filstruktur
 
```
Recept-Databas/
├── index.html
├── starters.html
├── main-courses.html
├── desserts.html
├── recipe.html
├── search.html
├── assets/
│   └── (bilder)
├── css/
│   ├── card.css
│   ├── categories.css
│   ├── footer.css
│   ├── hero.css
│   ├── nav.css
    ├── recipe.css
    ├── search.css
│   ├── styles.css
│   └── utility.css
└── js/                         
    ├── api.js                  (alla fetch-anrop mot TheMealDB)
    ├── desserts.js             (hämtar och visar recept för desserts.html)
    ├── index.js                (logik för startsidan – sökning)
    ├── main-courses.js         (hämtar och visar recept för main-courses.html)
    ├── recipe.js               (hämtar och visar recept baserat på id)
    ├── search-results.js       (hämtar och visar sökresultat)
    ├── search.js               (hanterar sökfältet, visar förslag)
    ├── starters.js             (hämtar och visar recept för starters.html)
    └── ui.js                   (renderCards, showError, showLoading)
```
 
## Grupp
 
| Namn | GitHub |
|------|--------|
| Leo | [@LeoTidvall11](https://github.com/LeoTidvall11) |
| Sali | [@SaliSammoArtin](https://github.com/SaliSammoArtin) |
| Ekaterina |[@Snwrn](https://github.com/Snwrn) |
| Desirée | [@Triquatra](https://github.com/Triquatra) |
 
## Kursinformation
 
Projekt i kursen JavaScript — YH-utbildning Systemutvecklare.
