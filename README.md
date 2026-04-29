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
├── förrätter.html
├── huvudrätter.html
├── efterrätter.html
├── fattigariddare.html
├── grillmix.html
├── pizza.html
├── assets/
│   └── (bilder)
├── css/
│   ├── styles.css
│   ├── card.css
│   ├── categories.css
│   ├── favorite-recipes.css
│   ├── footer.css
│   ├── hero.css
│   └── nav.css
└── js/                         (skapas under projektets gång)
    ├── api.js                  (alla fetch-anrop mot TheMealDB)
    ├── index.js                (logik för startsidan – sökning)
    ├── huvudratter.js          (hämtar och visar recept för Huvudrätter)
    ├── forratter.js            (hämtar och visar recept för Förrätter)
    └── efterratter.js          (hämtar och visar recept för Efterrätter)
```
 
## Grupp
 
| Namn | GitHub |
|------|--------|
| Leo | [@LeoTidvall11](https://github.com/LeoTidvall11) |
| Sali | @SaliSammoArtin(https://github.com/SaliSammoArtin) |
| Ekaterina |[@Snwrn](https://github.com/Snwrn) |
| Desirée | [@Triquatra](https://github.com/Triquatra) |
 
## Kursinformation
 
Projekt i kursen JavaScript — YH-utbildning Systemutvecklare.
