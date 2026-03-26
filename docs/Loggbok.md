### Datum ### - Rubrik

- **Problem:** Beskriv vad som inte gick enligt plan.
- **Orsak:** Varför uppstod problemet?
- **Testade lösningar:** Vad försökte ni göra för att lösa det?
- **Slutgiltig lösning:** Hur ser resultatet ut nu?
- **Lärdom:** Vad gör vi annorlunda nästa gång?

### 2026-03-26 ### - Bakgrundsbild på hero section

- **Problem:** Vi ville skapa en hero-section med en rubrik och en sökruta centralt placerade ovanpå en bakgrundsbild.
- **Orsak:** Då det var första gången vi gjorde detta försökte vi använda en bild i HTML-koden. Detta skapade en komplex struktur med för många containers, vilket gjorde det svårt att få bilden att täcka hela bredden eftersom den begränsades av en omslutande div.
- **Testade lösningar:** Vi experimenterade med position: relative och absolute för att försöka lägga innehållet ovanpå bilden. Vi lyckades skala om bilden, men insåg att vi var tvungna att börja rensa i vår container-struktur för att nå önskat resultat.
- **Slutgiltig lösning:** Genom research (youtube kevin powell) insåg vi att bilden borde ligga i CSS:n istället för i HTML:n. Genom att använda background-image med background-size: cover täckte bilden hela sektionen direkt. Vi kunde då ta bort onödiga containers och enkelt centrera sökrutan med Flexbox (justify-center och align-center).
- **Lärdom:** Vi ska sträva efter att minimera antalet containrar – det är bättre att lägga till dem i efterhand vid behov än att börja med för många. Vi lärde oss också att dekorativa bakgrundsbilder hanteras bäst via CSS. Vi lärde oss också att  man kan använda padding istället för en fast height på hero-containern kan vi direkt skapa en responsiv hero-section.

```html
<section class="hero">
  <div class="hero-content">
    <h2>Sök efter recept</h2>
    <div class="search-container">
      <input type="text" placeholder="Sök efter recept..." id="search-input">
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="search-icon">
        <path stroke-linecap="round" stroke-linejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
      </svg>
    </div>
  </div>
</section>
```

```css
/* CSS-styling */
.hero {
  background-image: url(../assets/matBild.background.jpg);
  background-color: #fbffed;
  background-repeat: no-repeat;
  background-size: cover;
  background-blend-mode: multiply;
  border-radius: 15px;
  padding: 12rem 0;

  /* Centrerar innehållet */
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
}
```
