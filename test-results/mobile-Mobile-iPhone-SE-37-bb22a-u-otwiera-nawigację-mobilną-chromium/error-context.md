# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: mobile.spec.ts >> Mobile (iPhone SE: 375x667) >> Navbar — mobile menu >> hamburger menu otwiera nawigację mobilną
- Location: e2e\mobile.spec.ts:119:7

# Error details

```
Error: expect(locator).toBeVisible() failed

Locator:  locator('text=Dostawa').first()
Expected: visible
Received: hidden
Timeout:  3000ms

Call log:
  - Expect "toBeVisible" with timeout 3000ms
  - waiting for locator('text=Dostawa').first()
    7 × locator resolved to <a href="/dostawa" class="relative px-4 py-2 rounded-xl font-body font-semibold text-sm transition-all duration-200 flex items-center gap-1.5 group↵                  text-beer-foam/50 hover:text-beer-foam/80">Dostawa 🚚</a>
      - unexpected value "hidden"

```

```yaml
- region "Notifications (F8)":
  - list
- region "Notifications alt+T"
- navigation:
  - link "U Fisza U Fisza Sklep piwny ✦ Szczecin":
    - /url: /
    - img "U Fisza"
    - text: U Fisza Sklep piwny ✦ Szczecin
  - button:
    - img
  - button:
    - img
  - link "Produkty":
    - /url: /#produkty
    - img
    - text: Produkty
  - link "O nas":
    - /url: /#o-nas
  - link "Quiz 🎲":
    - /url: /quiz
  - link "Alkomat 🧪":
    - /url: /alkomat
  - link "Fisz vs AI 🤖":
    - /url: /fisz-vs-ai
  - link "Dostawa 🚚":
    - /url: /dostawa
  - link "VIP":
    - /url: /vip
    - img
    - text: VIP
    - img
  - link "Zaloguj się":
    - /url: /auth
    - img
    - text: Zaloguj się
- img "U Fisza logo"
- text: 🍺
- paragraph: 🍺 Sklep piwny & alkoholowy 🍺
- heading "U Fisza" [level=1]
- text: 🍻 🍻 🍻 🍻 🍻
- paragraph: Najlepszy alkohol w mieście — craft piwa, whisky, likiery i nie tylko.Zamów online i ciesz się dostawą prosto pod drzwi! 🐟
- link "Zobacz ofertę 🍻":
  - /url: "#produkty"
- link "O nas 📍":
  - /url: "#o-nas"
- img
- text: ul. Łucznicza, Szczecin
- img
- text: Pon–Sob 10:00–22:00
- img
- text: +48 91 000 00 00 Przewiń
- img
- img
- text: Dlaczego my?
- heading "Co nas wyróżnia" [level=2]
- paragraph: Fisz to nie tylko sklep — to filozofia dobrego trunku 🐟
- img
- text: 🍺
- heading "Selekcja Fisza" [level=3]
- paragraph: Każda butelka ręcznie wybrana przez naszego eksperta — gwarancja jakości.
- img
- text: 🚚
- heading "Szybka dostawa" [level=3]
- paragraph: Zamów online, a my dostarczymy Twoje ulubione trunki w 24h.
- img
- text: 🏆
- heading "Premium & Craft" [level=3]
- paragraph: Ekskluzywne piwa rzemieślnicze, whisky i wina z całego świata.
- img
- text: ⭐
- heading "Zaufanie klientów" [level=3]
- paragraph: Ponad 1000+ zadowolonych klientów. Sprawdź nasze recenzje!
- img
- text: 👑
- heading "Klub VIP" [level=3]
- paragraph: Dołącz do VIP i odkryj piwa z sekretnym składnikiem Fisza.
- img
- text: ✨
- heading "Unikalne smaki" [level=3]
- paragraph: Co tydzień nowe pozycje — nie przegap limitowanych edycji.
- text: ✦ ✦ ✦
- img
- text: Najwyżej oceniane
- img
- heading "Hity od Fisza 🏆" [level=2]
- paragraph: Produkty, które pokochali nasi klienci — sprawdź sam!
- link "#1 Złoty Fisz Lager Złoty Fisz Lager 4.8 8.99zł":
  - /url: /produkt/1
  - text: "#1"
  - img "Złoty Fisz Lager"
  - heading "Złoty Fisz Lager" [level=3]
  - img
  - img
  - img
  - img
  - img
  - text: 4.8 8.99zł
  - button:
    - img
- link "#2 Hipster IPA Hipster IPA 4.8 12.99zł":
  - /url: /produkt/2
  - text: "#2"
  - img "Hipster IPA"
  - heading "Hipster IPA" [level=3]
  - img
  - img
  - img
  - img
  - img
  - text: 4.8 12.99zł
  - button:
    - img
- link "#3 Mroczny Stout Boarthu Mroczny Stout Boarthu 4.8 14.99zł":
  - /url: /produkt/3
  - text: "#3"
  - img "Mroczny Stout Boarthu"
  - heading "Mroczny Stout Boarthu" [level=3]
  - img
  - img
  - img
  - img
  - img
  - text: 4.8 14.99zł
  - button:
    - img
- link "Pszeniczny Siłacz Pszeniczny Siłacz 4.8 10.99zł":
  - /url: /produkt/4
  - img "Pszeniczny Siłacz"
  - heading "Pszeniczny Siłacz" [level=3]
  - img
  - img
  - img
  - img
  - img
  - text: 4.8 10.99zł
  - button:
    - img
- link "Zobacz całą ofertę":
  - /url: "#produkty"
  - text: Zobacz całą ofertę
  - img
- text: ✦ ✦ ✦ Poznaj naszą maskotkę 🍺
- heading "Kufel Fisza tańczy!" [level=2]
- paragraph: Nasz tancerz nie może się doczekać Twojego zamówienia 🕺
- text: ✦ ✦ ✦
- img
- text: Premium Selection
- heading "Nasza Oferta" [level=2]
- paragraph: Ręcznie wyselekcjonowane trunki od Fisza. Wybierz swoje ulubione i zamów z dostawą! 🚚
- img
- textbox "Szukaj produktu po nazwie..."
- button:
  - img
- button "🍻 Wszystko"
- button "🍺 Piwo"
- button "🍷 Wino"
- button "🥃 Wódka"
- button "🥂 Whisky & Likiery"
- paragraph: 12 produktów w ofercie
- img
- button "Domyślne"
- button "Cena ↑"
- button "Cena ↓"
- button "ABV ↑"
- button "ABV ↓"
- button "A–Z"
- link "Złoty Fisz Lager 5% 🍺 Piwo Złoty Fisz Lager 8.99 zł Klasyczny lager, złocisty jak zachód słońca nad stawem pełnym ryb. 💡 Ten lager jest tak dobry, że nawet ryby wychodzą z wody żeby go spróbować! 🐟 Dodaj do koszyka":
  - /url: /produkt/1
  - img "Złoty Fisz Lager"
  - img
  - text: 5% 🍺 Piwo
  - button:
    - img
  - img
  - heading "Złoty Fisz Lager" [level=3]
  - text: 8.99 zł
  - paragraph: Klasyczny lager, złocisty jak zachód słońca nad stawem pełnym ryb.
  - text: 💡 Ten lager jest tak dobry, że nawet ryby wychodzą z wody żeby go spróbować! 🐟
  - button "Dodaj do koszyka":
    - img
    - text: Dodaj do koszyka
    - img
- link "Hipster IPA 6.5% 🍺 Piwo Hipster IPA 12.99 zł Chmielowe szaleństwo z wąsem i okularami. Zanim było modne. 💡 Piłem IPA zanim to było cool. Teraz jest ciepłe. 🕶️ Dodaj do koszyka":
  - /url: /produkt/2
  - img "Hipster IPA"
  - img
  - text: 6.5% 🍺 Piwo
  - button:
    - img
  - img
  - heading "Hipster IPA" [level=3]
  - text: 12.99 zł
  - paragraph: Chmielowe szaleństwo z wąsem i okularami. Zanim było modne.
  - text: 💡 Piłem IPA zanim to było cool. Teraz jest ciepłe. 🕶️
  - button "Dodaj do koszyka":
    - img
    - text: Dodaj do koszyka
    - img
- link "Mroczny Stout Boarthu 7.2% 🍺 Piwo Mroczny Stout Boarthu 14.99 zł Ciemny jak noc, mocny jak niedźwiedź. Z nutą czekolady i gniewu. 💡 Nie patrz mu w oczy. On nie lubi gdy na niego patrzysz. 😠 Dodaj do koszyka":
  - /url: /produkt/3
  - img "Mroczny Stout Boarthu"
  - img
  - text: 7.2% 🍺 Piwo
  - button:
    - img
  - img
  - heading "Mroczny Stout Boarthu" [level=3]
  - text: 14.99 zł
  - paragraph: Ciemny jak noc, mocny jak niedźwiedź. Z nutą czekolady i gniewu.
  - text: 💡 Nie patrz mu w oczy. On nie lubi gdy na niego patrzysz. 😠
  - button "Dodaj do koszyka":
    - img
    - text: Dodaj do koszyka
    - img
- link "Pszeniczny Siłacz 4.8% 🍺 Piwo Pszeniczny Siłacz 10.99 zł Piwo pszeniczne, które chodzi na siłownię. Białko w każdym łyku. 💡 Jedyne piwo z licencjonowanym trenerem personalnym 💪 Dodaj do koszyka":
  - /url: /produkt/4
  - img "Pszeniczny Siłacz"
  - img
  - text: 4.8% 🍺 Piwo
  - button:
    - img
  - img
  - heading "Pszeniczny Siłacz" [level=3]
  - text: 10.99 zł
  - paragraph: Piwo pszeniczne, które chodzi na siłownię. Białko w każdym łyku.
  - text: 💡 Jedyne piwo z licencjonowanym trenerem personalnym 💪
  - button "Dodaj do koszyka":
    - img
    - text: Dodaj do koszyka
    - img
- link "Wiking Amber Ale 5.8% 🍺 Piwo Wiking Amber Ale 11.99 zł Bursztynowe piwo w hełmie wikinga. Smakiem podbija nowe lądy! 💡 SKÅL! To piwo zdobyło już 3 kontynenty i 2 lodówki 🪓 Dodaj do koszyka":
  - /url: /produkt/5
  - img "Wiking Amber Ale"
  - img
  - text: 5.8% 🍺 Piwo
  - button:
    - img
  - img
  - heading "Wiking Amber Ale" [level=3]
  - text: 11.99 zł
  - paragraph: Bursztynowe piwo w hełmie wikinga. Smakiem podbija nowe lądy!
  - text: 💡 SKÅL! To piwo zdobyło już 3 kontynenty i 2 lodówki 🪓
  - button "Dodaj do koszyka":
    - img
    - text: Dodaj do koszyka
    - img
- 'link "Kwaśny Cytrynek 4.2% 🍺 Piwo Kwaśny Cytrynek 13.49 zł Sour ale z miną tak kwaśną, że aż ci się usta złożą w dziubek. 💡 Ostrzeżenie: po wypiciu twarz może pozostać w pozycji ''cytrynka'' na 5 minut 🍋 Dodaj do koszyka"':
  - /url: /produkt/6
  - img "Kwaśny Cytrynek"
  - img
  - text: 4.2% 🍺 Piwo
  - button:
    - img
  - img
  - heading "Kwaśny Cytrynek" [level=3]
  - text: 13.49 zł
  - paragraph: Sour ale z miną tak kwaśną, że aż ci się usta złożą w dziubek.
  - text: "💡 Ostrzeżenie: po wypiciu twarz może pozostać w pozycji 'cytrynka' na 5 minut 🍋"
  - button "Dodaj do koszyka":
    - img
    - text: Dodaj do koszyka
    - img
- link "Wino Kowboj 13.5% 🍷 Wino Wino Kowboj 29.99 zł Czerwone wino w kowbojskim kapeluszu. Yeehaw w każdym kieliszku! 💡 To wino przeszło Dziki Zachód i wróciło! 🤠 Dodaj do koszyka":
  - /url: /produkt/7
  - img "Wino Kowboj"
  - img
  - text: 13.5% 🍷 Wino
  - button:
    - img
  - img
  - heading "Wino Kowboj" [level=3]
  - text: 29.99 zł
  - paragraph: Czerwone wino w kowbojskim kapeluszu. Yeehaw w każdym kieliszku!
  - text: 💡 To wino przeszło Dziki Zachód i wróciło! 🤠
  - button "Dodaj do koszyka":
    - img
    - text: Dodaj do koszyka
    - img
- link "Wódka Góralska 40% 🥃 Wódka Wódka Góralska 39.99 zł Czysta jak górski potok, mocna jak góralska tradycja. Na zdrowie! 💡 Oficjalnie zatwierdzona przez góralskich duchów! 🏔️ Dodaj do koszyka":
  - /url: /produkt/8
  - img "Wódka Góralska"
  - img
  - text: 40% 🥃 Wódka
  - button:
    - img
  - img
  - heading "Wódka Góralska" [level=3]
  - text: 39.99 zł
  - paragraph: Czysta jak górski potok, mocna jak góralska tradycja. Na zdrowie!
  - text: 💡 Oficjalnie zatwierdzona przez góralskich duchów! 🏔️
  - button "Dodaj do koszyka":
    - img
    - text: Dodaj do koszyka
    - img
- link "Whisky Dżentelmen 43% 🥂 Premium Whisky Dżentelmen 89.99 zł Single malt z monoklą i muszką. Dla prawdziwych koneserów. 💡 Ta whisky ma lepsze maniery niż większość ludzi na imprezie 🎩 Dodaj do koszyka":
  - /url: /produkt/9
  - img "Whisky Dżentelmen"
  - img
  - text: 43% 🥂 Premium
  - button:
    - img
  - img
  - heading "Whisky Dżentelmen" [level=3]
  - text: 89.99 zł
  - paragraph: Single malt z monoklą i muszką. Dla prawdziwych koneserów.
  - text: 💡 Ta whisky ma lepsze maniery niż większość ludzi na imprezie 🎩
  - button "Dodaj do koszyka":
    - img
    - text: Dodaj do koszyka
    - img
- 'link "Bourbon Szeryf 45% 🥂 Premium Bourbon Szeryf 69.99 zł Bourbon z odznaką szeryfa. Utrzymuje porządek w barze od 1849. 💡 Wanted: Dead or Alive. Najlepiej on the rocks 🌵 Dodaj do koszyka"':
  - /url: /produkt/10
  - img "Bourbon Szeryf"
  - img
  - text: 45% 🥂 Premium
  - button:
    - img
  - img
  - heading "Bourbon Szeryf" [level=3]
  - text: 69.99 zł
  - paragraph: Bourbon z odznaką szeryfa. Utrzymuje porządek w barze od 1849.
  - text: "💡 Wanted: Dead or Alive. Najlepiej on the rocks 🌵"
  - button "Dodaj do koszyka":
    - img
    - text: Dodaj do koszyka
    - img
- link "Zielony Tancerz 35% 🥂 Premium Zielony Tancerz 54.99 zł Likier ziołowy, który nie może przestać tańczyć. 42 zioła w jednej butelce! 💡 Po jednym kieliszku ty też będziesz tańczyć jak on 💃 Dodaj do koszyka":
  - /url: /produkt/11
  - img "Zielony Tancerz"
  - img
  - text: 35% 🥂 Premium
  - button:
    - img
  - img
  - heading "Zielony Tancerz" [level=3]
  - text: 54.99 zł
  - paragraph: Likier ziołowy, który nie może przestać tańczyć. 42 zioła w jednej butelce!
  - text: 💡 Po jednym kieliszku ty też będziesz tańczyć jak on 💃
  - button "Dodaj do koszyka":
    - img
    - text: Dodaj do koszyka
    - img
- 'link "Wiśniówka Kawaii 18% 🥂 Premium Wiśniówka Kawaii 34.99 zł Najsłodszy likier wiśniowy. Tak uroczy, że aż szkoda pić! 💡 Uwaga: może powodować niekontrolowane mówienie ''kawaii!'' po każdym łyku 🍒 Dodaj do koszyka"':
  - /url: /produkt/12
  - img "Wiśniówka Kawaii"
  - img
  - text: 18% 🥂 Premium
  - button:
    - img
  - img
  - heading "Wiśniówka Kawaii" [level=3]
  - text: 34.99 zł
  - paragraph: Najsłodszy likier wiśniowy. Tak uroczy, że aż szkoda pić!
  - text: "💡 Uwaga: może powodować niekontrolowane mówienie 'kawaii!' po każdym łyku 🍒"
  - button "Dodaj do koszyka":
    - img
    - text: Dodaj do koszyka
    - img
- text: ✦ ✦ ✦
- img
- text: Kufel Wyroczni
- heading "Zapytaj Fisza o cokolwiek" [level=2]
- paragraph: Mistyczny kufel zna odpowiedź. Wpisz pytanie, potrząśnij i poznaj wyrok piany.
- button "Wyrocznia":
  - img
  - text: Wyrocznia
- button "Moje wróżby (0)":
  - img
  - text: Moje wróżby (0)
- textbox "Np. Czy dziś otworzyć stout?"
- button "Wróżby":
  - img
  - text: Wróżby
- paragraph: ✨ Piana milczy. Zadaj pytanie i potrząśnij kuflem ✨
- text: ✦ ✦ ✦
- img
- text: Rybi Horoskop
- heading "Co Fisz wróży Twojemu znakowi?" [level=2]
- paragraph: Wybierz znak zodiaku, a Fisz podpowie Ci dzisiejszy trunek 🐟🔮
- button "🐏 Baran"
- button "🐂 Byk"
- button "👯 Bliźnięta"
- button "🦞 Rak"
- button "🦁 Lew"
- button "🌾 Panna"
- button "⚖️ Waga"
- button "🦂 Skorpion"
- button "🏹 Strzelec"
- button "🐐 Koziorożec"
- button "🏺 Wodnik"
- button "🐟 Ryby"
- button "Losuj znak":
  - img
  - text: Losuj znak
- img
- paragraph: Wybierz swój znak, by poznać piwną przepowiednię
- text: "✦ ✦ ✦ ✦ ✦ ✦ 🍺 Do piątku 17:00: 6d 04:44:52 🍺"
- img
- text: Oferta specjalna
- img
- heading "Dołącz do Klubu VIP 👑" [level=2]
- paragraph: Tylko 5 zł/tydzień za dostęp do ekskluzywnych piw z sekretnym składnikiem Fisza 🐟
- img
- text: Limitowane edycje
- img
- text: Priorytetowa dostawa
- img
- text: Ekskluzywne smaki
- link "Sprawdź VIP":
  - /url: /vip
  - button "Sprawdź VIP":
    - text: Sprawdź VIP
    - img
- text: 🔒 Bezpieczne płatności 🔄 Anuluj kiedy chcesz 🍺 Nowe piwa co tydzień
- contentinfo:
  - img "U Fisza"
  - heading "U Fisza" [level=3]
  - paragraph: Sklep Piwny ✦ 2024
  - paragraph: Fisz od lat dostarcza najlepszy alkohol w mieście. Każda butelka ręcznie wybrana przez naszego eksperta-rybę. Na zdrowie! 🍻
  - paragraph: 1000+
  - paragraph: Klientów
  - paragraph: 50+
  - paragraph: Rodzajów piw
  - paragraph: 24h
  - paragraph: Dostawa
  - heading "Kontakt" [level=4]:
    - img
    - text: Kontakt
  - link "ul. Łucznicza 70-001 Szczecin":
    - /url: https://maps.google.com/?q=Łucznicza+Szczecin
    - img
    - text: ul. Łucznicza 70-001 Szczecin
    - img
  - link "+48 91 000 00 00":
    - /url: tel:+48910000000
    - img
    - text: +48 91 000 00 00
  - link "kontakt@ufisza.pl":
    - /url: mailto:kontakt@ufisza.pl
    - img
    - text: kontakt@ufisza.pl
  - link:
    - /url: "#"
    - img
  - link:
    - /url: "#"
    - img
  - heading "Godziny otwarcia" [level=4]:
    - img
    - text: Godziny otwarcia
  - text: Pon – Pt 10:00 – 22:00 Sobota 10:00 – 23:00 Niedziela Zamknięte
  - paragraph: 💡 Wiesz, że...
  - paragraph: Zamówienia online przyjmujemy 24/7!
  - heading "Znajdź nas na mapie" [level=4]:
    - img
    - text: Znajdź nas na mapie
  - iframe
  - img
  - paragraph: "ISO 9001: Piwo"
  - paragraph: Norma jakości
  - img
  - paragraph: Atest Rybactwa
  - paragraph: Fisz Approved™
  - img
  - paragraph: Towarzystwo Przyjaciół Pianki
  - paragraph: Członek honorowy
  - img
  - paragraph: Certyfikat Chmielu
  - paragraph: 100% naturalne
  - text: "🍺 Do piątku 17:00: 6d 04:44:52 🍺"
  - paragraph:
    - text: © 2026 Sklep Piwny U Fisza — zrobione z
    - img
    - text: w Szczecinie
  - paragraph: 🔞 Sprzedaż tylko dla osób pełnoletnich (18+)
- button "Mądrość Fisza": 🐟 🎩
- button "Fisz Radio":
  - img
- text: 🍺 🌿
- button "🐟"
- button "🍾"
- button "🍺"
- button "Włącz tryb imprezowy! 🎉":
  - img
- button "styl"
- button "🥴"
```

# Test source

```ts
  26  | 
  27  |       test("mapa nie overflow na mobile", async ({ page }) => {
  28  |         await page.goto("/dostawa");
  29  |         const map = page.locator("[class*='aspect-']").first();
  30  |         const box = await map.boundingBox();
  31  |         if (box) {
  32  |           expect(box.width).toBeLessThanOrEqual(viewport.width + 32);
  33  |         }
  34  |       });
  35  | 
  36  |       test("symulacja dostawy uruchamia się i pokazuje kroki", async ({ page }) => {
  37  |         await page.goto("/dostawa");
  38  |         const btn = page.locator("text=Rozpocznij śledzenie paczki");
  39  |         if (await btn.isVisible()) {
  40  |           await btn.click();
  41  |           await expect(page.locator("text=Status dostawy")).toBeVisible({ timeout: 3000 });
  42  |         }
  43  |       });
  44  |     });
  45  | 
  46  |     test.describe("Koszyk — mobile drawer", () => {
  47  |       test("koszyk drawer otwiera się po kliknięciu ikony koszyka", async ({ page }) => {
  48  |         await page.goto("/");
  49  |         await page.waitForTimeout(1500);
  50  |         const cartBtn = page.locator("button").filter({ has: page.locator("svg.lucide-shopping-cart") }).first();
  51  |         if (await cartBtn.isVisible({ timeout: 3000 }).catch(() => false)) {
  52  |           await cartBtn.click();
  53  |           await page.waitForTimeout(500);
  54  |           await expect(page.locator("text=Koszyk")).toBeVisible({ timeout: 3000 });
  55  |         }
  56  |       });
  57  | 
  58  |       test("body scroll jest zablokowany gdy koszyk otwarty", async ({ page }) => {
  59  |         await page.goto("/");
  60  |         await page.waitForTimeout(1500);
  61  |         const cartBtn = page.locator("button").filter({ has: page.locator("svg.lucide-shopping-cart") }).first();
  62  |         if (await cartBtn.isVisible({ timeout: 3000 }).catch(() => false)) {
  63  |           await cartBtn.click();
  64  |           await page.waitForTimeout(500);
  65  |           const overflow = await page.evaluate(() => document.body.style.overflow);
  66  |           expect(overflow).toBe("hidden");
  67  |         }
  68  |       });
  69  | 
  70  |       test("pusty koszyk pokazuje tekst zachęty", async ({ page }) => {
  71  |         await page.goto("/");
  72  |         await page.waitForTimeout(1500);
  73  |         const cartBtn = page.locator("button").filter({ has: page.locator("svg.lucide-shopping-cart") }).first();
  74  |         if (await cartBtn.isVisible({ timeout: 3000 }).catch(() => false)) {
  75  |           await cartBtn.click();
  76  |           await page.waitForTimeout(500);
  77  |           await expect(page.locator("text=Koszyk").first()).toBeVisible({ timeout: 3000 });
  78  |         }
  79  |       });
  80  |     });
  81  | 
  82  |     test.describe("ProductCard — mobile", () => {
  83  |       test("floating buttons są widoczne bez hover na mobile (opacity > 0)", async ({ page }) => {
  84  |         await page.goto("/#produkty");
  85  |         await page.waitForTimeout(2500);
  86  |         const hearts = page.locator("button").filter({ has: page.locator("svg.lucide-heart") });
  87  |         const count = await hearts.count();
  88  |         if (count > 0) {
  89  |           const opacity = await hearts.first().evaluate((el) => {
  90  |             return window.getComputedStyle(el).opacity;
  91  |           });
  92  |           expect(parseFloat(opacity)).toBeGreaterThan(0);
  93  |         }
  94  |       });
  95  | 
  96  |       test("Dodaj do koszyka button ma min 44px touch target", async ({ page }) => {
  97  |         await page.goto("/#produkty");
  98  |         await page.waitForTimeout(2500);
  99  |         const addBtns = page.locator("button:has-text('Dodaj do koszyka')").or(page.locator("button:has-text('Do koszyka')"));
  100 |         const count = await addBtns.count();
  101 |         if (count > 0) {
  102 |           const box = await addBtns.first().boundingBox();
  103 |           expect(box!.height).toBeGreaterThanOrEqual(44);
  104 |         }
  105 |       });
  106 |     });
  107 | 
  108 |     test.describe("OrderHistory — mobile", () => {
  109 |       test("tytuł responsywny (font-size <= 36px na mobile)", async ({ page }) => {
  110 |         await page.goto("/zamowienia");
  111 |         const heading = page.locator("h1").first();
  112 |         await expect(heading).toBeVisible({ timeout: 5000 }).catch(() => {});
  113 |         const fontSize = await heading.evaluate((el) => window.getComputedStyle(el).fontSize);
  114 |         expect(parseFloat(fontSize)).toBeLessThanOrEqual(36);
  115 |       });
  116 |     });
  117 | 
  118 |     test.describe("Navbar — mobile menu", () => {
  119 |       test("hamburger menu otwiera nawigację mobilną", async ({ page }) => {
  120 |         await page.goto("/");
  121 |         await page.waitForTimeout(1000);
  122 |         const hamburger = page.locator("button.md\\:hidden").first();
  123 |         if (await hamburger.isVisible({ timeout: 3000 }).catch(() => false)) {
  124 |           await hamburger.click();
  125 |           await page.waitForTimeout(500);
> 126 |           await expect(page.locator("text=Dostawa").first()).toBeVisible({ timeout: 3000 });
      |                                                              ^ Error: expect(locator).toBeVisible() failed
  127 |         }
  128 |       });
  129 |     });
  130 | 
  131 |     test.describe("Footer — iframe sandbox", () => {
  132 |       test("mapa iframe ma atrybut sandbox", async ({ page }) => {
  133 |         await page.goto("/");
  134 |         await page.waitForTimeout(1500);
  135 |         await page.locator("#o-nas").scrollIntoViewIfNeeded().catch(() => {});
  136 |         await page.waitForTimeout(1000);
  137 |         const iframe = page.locator("iframe[sandbox]");
  138 |         if (await iframe.count() > 0) {
  139 |           const sandbox = await iframe.first().getAttribute("sandbox");
  140 |           expect(sandbox).toContain("allow-scripts");
  141 |         }
  142 |       });
  143 |     });
  144 | 
  145 |     test.describe("Global layout — no horizontal scroll", () => {
  146 |       test("strona główna nie ma horizontal scroll", async ({ page }) => {
  147 |         await page.goto("/");
  148 |         await page.waitForTimeout(1500);
  149 |         const hasHScroll = await page.evaluate(() => {
  150 |           return document.documentElement.scrollWidth > document.documentElement.clientWidth + 2;
  151 |         });
  152 |         expect(hasHScroll).toBe(false);
  153 |       });
  154 | 
  155 |       test("strona dostawy nie ma horizontal scroll", async ({ page }) => {
  156 |         await page.goto("/dostawa");
  157 |         await page.waitForTimeout(1000);
  158 |         const hasHScroll = await page.evaluate(() => {
  159 |           return document.documentElement.scrollWidth > document.documentElement.clientWidth + 2;
  160 |         });
  161 |         expect(hasHScroll).toBe(false);
  162 |       });
  163 |     });
  164 |   });
  165 | }
```