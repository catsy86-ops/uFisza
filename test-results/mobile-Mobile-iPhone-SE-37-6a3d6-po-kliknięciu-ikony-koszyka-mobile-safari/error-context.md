# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: mobile.spec.ts >> Mobile (iPhone SE: 375x667) >> Koszyk — mobile drawer >> koszyk drawer otwiera się po kliknięciu ikony koszyka
- Location: e2e\mobile.spec.ts:47:7

# Error details

```
Error: expect(locator).toBeVisible() failed

Locator: locator('text=Koszyk')
Expected: visible
Error: strict mode violation: locator('text=Koszyk') resolved to 14 elements:
    1) <button tabindex="0" class="w-full flex items-center justify-center gap-2 px-4 py-3 rounded-xl btn-beer font-semibold text-sm group/btn relative overflow-hidden">…</button> aka getByRole('button', { name: 'Dodaj do koszyka' }).first()
    2) <button tabindex="0" class="w-full flex items-center justify-center gap-2 px-4 py-3 rounded-xl btn-beer font-semibold text-sm group/btn relative overflow-hidden">…</button> aka getByRole('button', { name: 'Dodaj do koszyka' }).nth(1)
    3) <button tabindex="0" class="w-full flex items-center justify-center gap-2 px-4 py-3 rounded-xl btn-beer font-semibold text-sm group/btn relative overflow-hidden">…</button> aka getByRole('button', { name: 'Dodaj do koszyka' }).nth(2)
    4) <button tabindex="0" class="w-full flex items-center justify-center gap-2 px-4 py-3 rounded-xl btn-beer font-semibold text-sm group/btn relative overflow-hidden">…</button> aka getByRole('button', { name: 'Dodaj do koszyka' }).nth(3)
    5) <button tabindex="0" class="w-full flex items-center justify-center gap-2 px-4 py-3 rounded-xl btn-beer font-semibold text-sm group/btn relative overflow-hidden">…</button> aka getByRole('button', { name: 'Dodaj do koszyka' }).nth(4)
    6) <button tabindex="0" class="w-full flex items-center justify-center gap-2 px-4 py-3 rounded-xl btn-beer font-semibold text-sm group/btn relative overflow-hidden">…</button> aka getByRole('button', { name: 'Dodaj do koszyka' }).nth(5)
    7) <button tabindex="0" class="w-full flex items-center justify-center gap-2 px-4 py-3 rounded-xl btn-beer font-semibold text-sm group/btn relative overflow-hidden">…</button> aka locator('div:nth-child(7) > .block.group > .relative.bg-card > .p-5 > .w-full')
    8) <button tabindex="0" class="w-full flex items-center justify-center gap-2 px-4 py-3 rounded-xl btn-beer font-semibold text-sm group/btn relative overflow-hidden">…</button> aka locator('div:nth-child(8) > .block.group > .relative.bg-card > .p-5 > .w-full')
    9) <button tabindex="0" class="w-full flex items-center justify-center gap-2 px-4 py-3 rounded-xl btn-beer font-semibold text-sm group/btn relative overflow-hidden">…</button> aka locator('div:nth-child(9) > .block.group > .relative.bg-card > .p-5 > .w-full')
    10) <button tabindex="0" class="w-full flex items-center justify-center gap-2 px-4 py-3 rounded-xl btn-beer font-semibold text-sm group/btn relative overflow-hidden">…</button> aka locator('div:nth-child(10) > .block.group > .relative.bg-card > .p-5 > .w-full')
    ...

Call log:
  - Expect "toBeVisible" with timeout 3000ms
  - waiting for locator('text=Koszyk')

```

# Page snapshot

```yaml
- generic [ref=e2]:
  - region "Notifications (F8)":
    - list
  - region "Notifications alt+T"
  - generic [ref=e4]:
    - navigation [ref=e5]:
      - generic [ref=e6]:
        - link "U Fisza U Fisza Sklep piwny ✦ Szczecin" [ref=e7]:
          - /url: /
          - img "U Fisza" [ref=e10]
          - generic [ref=e11]:
            - generic [ref=e12]: U Fisza
            - generic [ref=e13]: Sklep piwny ✦ Szczecin
        - generic [ref=e14]:
          - button [active] [ref=e15] [cursor=pointer]:
            - img [ref=e16]
          - button [ref=e20] [cursor=pointer]:
            - img [ref=e22]
    - generic [ref=e23]:
      - generic [ref=e34]:
        - generic [ref=e35]:
          - img "U Fisza logo" [ref=e45]
          - generic [ref=e46]: 🍺
        - paragraph [ref=e47]: 🍺 Sklep piwny & alkoholowy 🍺
        - heading "U Fisza" [level=1] [ref=e48]
        - generic [ref=e49]:
          - generic [ref=e50]: 🍻
          - generic [ref=e51]: 🍻
          - generic [ref=e52]: 🍻
          - generic [ref=e53]: 🍻
          - generic [ref=e54]: 🍻
        - paragraph [ref=e55]: Najlepszy alkohol w mieście — craft piwa, whisky, likiery i nie tylko. Zamów online i ciesz się dostawą prosto pod drzwi! 🐟
        - generic [ref=e56]:
          - link "Zobacz ofertę 🍻" [ref=e57]:
            - /url: "#produkty"
          - link "O nas 📍" [ref=e58]:
            - /url: "#o-nas"
        - generic [ref=e59]:
          - generic [ref=e60]:
            - img [ref=e61]
            - generic [ref=e64]: ul. Łucznicza, Szczecin
          - generic [ref=e65]:
            - img [ref=e66]
            - generic [ref=e69]: Pon–Sob 10:00–22:00
          - generic [ref=e70]:
            - img [ref=e71]
            - generic [ref=e73]: +48 91 000 00 00
      - generic [ref=e74]:
        - generic [ref=e75]: Przewiń
        - img [ref=e77]
    - generic [ref=e84]:
      - generic [ref=e85]:
        - generic [ref=e86]:
          - img [ref=e87]
          - text: Dlaczego my?
        - heading "Co nas wyróżnia" [level=2] [ref=e89]
        - paragraph [ref=e90]: Fisz to nie tylko sklep — to filozofia dobrego trunku 🐟
      - generic [ref=e91]:
        - generic [ref=e95]:
          - generic [ref=e96]:
            - img [ref=e98]
            - generic [ref=e102]: 🍺
          - heading "Selekcja Fisza" [level=3] [ref=e103]
          - paragraph [ref=e104]: Każda butelka ręcznie wybrana przez naszego eksperta — gwarancja jakości.
        - generic [ref=e108]:
          - generic [ref=e109]:
            - img [ref=e111]
            - generic [ref=e116]: 🚚
          - heading "Szybka dostawa" [level=3] [ref=e117]
          - paragraph [ref=e118]: Zamów online, a my dostarczymy Twoje ulubione trunki w 24h.
        - generic [ref=e122]:
          - generic [ref=e123]:
            - img [ref=e125]
            - generic [ref=e128]: 🏆
          - heading "Premium & Craft" [level=3] [ref=e129]
          - paragraph [ref=e130]: Ekskluzywne piwa rzemieślnicze, whisky i wina z całego świata.
        - generic [ref=e134]:
          - generic [ref=e135]:
            - img [ref=e137]
            - generic [ref=e140]: ⭐
          - heading "Zaufanie klientów" [level=3] [ref=e141]
          - paragraph [ref=e142]: Ponad 1000+ zadowolonych klientów. Sprawdź nasze recenzje!
        - generic [ref=e146]:
          - generic [ref=e147]:
            - img [ref=e149]
            - generic [ref=e154]: 👑
          - heading "Klub VIP" [level=3] [ref=e155]
          - paragraph [ref=e156]: Dołącz do VIP i odkryj piwa z sekretnym składnikiem Fisza.
        - generic [ref=e160]:
          - generic [ref=e161]:
            - img [ref=e163]
            - generic [ref=e165]: ✨
          - heading "Unikalne smaki" [level=3] [ref=e166]
          - paragraph [ref=e167]: Co tydzień nowe pozycje — nie przegap limitowanych edycji.
    - generic [ref=e168]:
      - generic: ✦ ✦ ✦
    - generic [ref=e174]:
      - generic [ref=e175]:
        - generic [ref=e176]:
          - img [ref=e177]
          - text: Najwyżej oceniane
          - img [ref=e183]
        - heading "Hity od Fisza 🏆" [level=2] [ref=e185]
        - paragraph [ref=e186]: Produkty, które pokochali nasi klienci — sprawdź sam!
      - generic [ref=e187]:
        - link "#1 Złoty Fisz Lager Złoty Fisz Lager 4.8 8.99zł" [ref=e189]:
          - /url: /produkt/1
          - generic [ref=e190]:
            - generic [ref=e191]:
              - generic: "#1"
            - img "Złoty Fisz Lager" [ref=e197]
            - generic [ref=e198]:
              - heading "Złoty Fisz Lager" [level=3] [ref=e199]
              - generic [ref=e200]:
                - generic [ref=e201]:
                  - img [ref=e202]
                  - img [ref=e204]
                  - img [ref=e206]
                  - img [ref=e208]
                  - img [ref=e210]
                - generic [ref=e212]: "4.8"
              - generic [ref=e213]:
                - generic [ref=e214]: 8.99zł
                - button [ref=e215] [cursor=pointer]:
                  - img [ref=e216]
        - link "#2 Hipster IPA Hipster IPA 4.8 12.99zł" [ref=e220]:
          - /url: /produkt/2
          - generic [ref=e221]:
            - generic [ref=e222]:
              - generic: "#2"
            - img "Hipster IPA" [ref=e228]
            - generic [ref=e229]:
              - heading "Hipster IPA" [level=3] [ref=e230]
              - generic [ref=e231]:
                - generic [ref=e232]:
                  - img [ref=e233]
                  - img [ref=e235]
                  - img [ref=e237]
                  - img [ref=e239]
                  - img [ref=e241]
                - generic [ref=e243]: "4.8"
              - generic [ref=e244]:
                - generic [ref=e245]: 12.99zł
                - button [ref=e246] [cursor=pointer]:
                  - img [ref=e247]
        - link "#3 Mroczny Stout Boarthu Mroczny Stout Boarthu 4.8 14.99zł" [ref=e251]:
          - /url: /produkt/3
          - generic [ref=e252]:
            - generic [ref=e253]:
              - generic: "#3"
            - img "Mroczny Stout Boarthu" [ref=e259]
            - generic [ref=e260]:
              - heading "Mroczny Stout Boarthu" [level=3] [ref=e261]
              - generic [ref=e262]:
                - generic [ref=e263]:
                  - img [ref=e264]
                  - img [ref=e266]
                  - img [ref=e268]
                  - img [ref=e270]
                  - img [ref=e272]
                - generic [ref=e274]: "4.8"
              - generic [ref=e275]:
                - generic [ref=e276]: 14.99zł
                - button [ref=e277] [cursor=pointer]:
                  - img [ref=e278]
        - link "Pszeniczny Siłacz Pszeniczny Siłacz 4.8 10.99zł" [ref=e282]:
          - /url: /produkt/4
          - generic [ref=e283]:
            - img "Pszeniczny Siłacz" [ref=e289]
            - generic [ref=e290]:
              - heading "Pszeniczny Siłacz" [level=3] [ref=e291]
              - generic [ref=e292]:
                - generic [ref=e293]:
                  - img [ref=e294]
                  - img [ref=e296]
                  - img [ref=e298]
                  - img [ref=e300]
                  - img [ref=e302]
                - generic [ref=e304]: "4.8"
              - generic [ref=e305]:
                - generic [ref=e306]: 10.99zł
                - button [ref=e307] [cursor=pointer]:
                  - img [ref=e308]
      - link "Zobacz całą ofertę" [ref=e312]:
        - /url: "#produkty"
        - text: Zobacz całą ofertę
        - img [ref=e313]
    - generic [ref=e315]:
      - generic: ✦ ✦ ✦
    - generic [ref=e325]:
      - generic [ref=e326]: Poznaj naszą maskotkę 🍺
      - heading "Kufel Fisza tańczy!" [level=2] [ref=e328]
      - paragraph [ref=e329]: Nasz tancerz nie może się doczekać Twojego zamówienia 🕺
    - generic [ref=e336]:
      - generic: ✦ ✦ ✦
    - generic [ref=e341]:
      - generic [ref=e342]:
        - generic [ref=e343]:
          - img [ref=e344]
          - text: Premium Selection
        - heading "Nasza Oferta" [level=2] [ref=e346]
        - paragraph [ref=e347]: Ręcznie wyselekcjonowane trunki od Fisza. Wybierz swoje ulubione i zamów z dostawą! 🚚
      - generic [ref=e349]:
        - img [ref=e350]
        - textbox "Szukaj produktu po nazwie..." [ref=e353]
        - button [ref=e354] [cursor=pointer]:
          - img [ref=e355]
      - generic [ref=e356]:
        - button "🍻 Wszystko" [ref=e357] [cursor=pointer]:
          - generic [ref=e358]: 🍻
          - text: Wszystko
        - button "🍺 Piwo" [ref=e359] [cursor=pointer]:
          - generic [ref=e360]: 🍺
          - text: Piwo
        - button "🍷 Wino" [ref=e361] [cursor=pointer]:
          - generic [ref=e362]: 🍷
          - text: Wino
        - button "🥃 Wódka" [ref=e363] [cursor=pointer]:
          - generic [ref=e364]: 🥃
          - text: Wódka
        - button "🥂 Whisky & Likiery" [ref=e365] [cursor=pointer]:
          - generic [ref=e366]: 🥂
          - text: Whisky & Likiery
      - generic [ref=e367]:
        - paragraph [ref=e368]: 12 produktów w ofercie
        - generic [ref=e369]:
          - img [ref=e370]
          - button "Domyślne" [ref=e373] [cursor=pointer]: Domyślne
          - button "Cena ↑" [ref=e375] [cursor=pointer]
          - button "Cena ↓" [ref=e376] [cursor=pointer]
          - button "ABV ↑" [ref=e377] [cursor=pointer]
          - button "ABV ↓" [ref=e378] [cursor=pointer]
          - button "A–Z" [ref=e379] [cursor=pointer]
      - generic [ref=e380]:
        - link "Złoty Fisz Lager 5% 🍺 Piwo Złoty Fisz Lager 8.99 zł Klasyczny lager, złocisty jak zachód słońca nad stawem pełnym ryb. 💡 Ten lager jest tak dobry, że nawet ryby wychodzą z wody żeby go spróbować! 🐟 Dodaj do koszyka" [ref=e382]:
          - /url: /produkt/1
          - generic [ref=e383]:
            - generic [ref=e384]:
              - img "Złoty Fisz Lager" [ref=e391]
              - generic [ref=e392]:
                - img [ref=e393]
                - text: 5%
              - generic [ref=e396]: 🍺 Piwo
              - generic [ref=e397]:
                - button [ref=e398] [cursor=pointer]:
                  - img [ref=e399]
                - img [ref=e402]
            - generic [ref=e405]:
              - generic [ref=e406]:
                - heading "Złoty Fisz Lager" [level=3] [ref=e407]
                - generic [ref=e408]:
                  - generic [ref=e409]: "8.99"
                  - text: zł
              - paragraph [ref=e410]: Klasyczny lager, złocisty jak zachód słońca nad stawem pełnym ryb.
              - generic [ref=e411]: 💡 Ten lager jest tak dobry, że nawet ryby wychodzą z wody żeby go spróbować! 🐟
              - button "Dodaj do koszyka" [ref=e412] [cursor=pointer]:
                - img [ref=e413]
                - text: Dodaj do koszyka
                - img [ref=e417]
        - link "Hipster IPA 6.5% 🍺 Piwo Hipster IPA 12.99 zł Chmielowe szaleństwo z wąsem i okularami. Zanim było modne. 💡 Piłem IPA zanim to było cool. Teraz jest ciepłe. 🕶️ Dodaj do koszyka" [ref=e420]:
          - /url: /produkt/2
          - generic [ref=e421]:
            - generic [ref=e422]:
              - img "Hipster IPA" [ref=e429]
              - generic [ref=e430]:
                - img [ref=e431]
                - text: 6.5%
              - generic [ref=e434]: 🍺 Piwo
              - generic [ref=e435]:
                - button [ref=e436] [cursor=pointer]:
                  - img [ref=e437]
                - img [ref=e440]
            - generic [ref=e443]:
              - generic [ref=e444]:
                - heading "Hipster IPA" [level=3] [ref=e445]
                - generic [ref=e446]:
                  - generic [ref=e447]: "12.99"
                  - text: zł
              - paragraph [ref=e448]: Chmielowe szaleństwo z wąsem i okularami. Zanim było modne.
              - generic [ref=e449]: 💡 Piłem IPA zanim to było cool. Teraz jest ciepłe. 🕶️
              - button "Dodaj do koszyka" [ref=e450] [cursor=pointer]:
                - img [ref=e451]
                - text: Dodaj do koszyka
                - img [ref=e455]
        - link "Mroczny Stout Boarthu 7.2% 🍺 Piwo Mroczny Stout Boarthu 14.99 zł Ciemny jak noc, mocny jak niedźwiedź. Z nutą czekolady i gniewu. 💡 Nie patrz mu w oczy. On nie lubi gdy na niego patrzysz. 😠 Dodaj do koszyka" [ref=e458]:
          - /url: /produkt/3
          - generic [ref=e459]:
            - generic [ref=e460]:
              - img "Mroczny Stout Boarthu" [ref=e467]
              - generic [ref=e468]:
                - img [ref=e469]
                - text: 7.2%
              - generic [ref=e472]: 🍺 Piwo
              - generic [ref=e473]:
                - button [ref=e474] [cursor=pointer]:
                  - img [ref=e475]
                - img [ref=e478]
            - generic [ref=e481]:
              - generic [ref=e482]:
                - heading "Mroczny Stout Boarthu" [level=3] [ref=e483]
                - generic [ref=e484]:
                  - generic [ref=e485]: "14.99"
                  - text: zł
              - paragraph [ref=e486]: Ciemny jak noc, mocny jak niedźwiedź. Z nutą czekolady i gniewu.
              - generic [ref=e487]: 💡 Nie patrz mu w oczy. On nie lubi gdy na niego patrzysz. 😠
              - button "Dodaj do koszyka" [ref=e488] [cursor=pointer]:
                - img [ref=e489]
                - text: Dodaj do koszyka
                - img [ref=e493]
        - link "Pszeniczny Siłacz 4.8% 🍺 Piwo Pszeniczny Siłacz 10.99 zł Piwo pszeniczne, które chodzi na siłownię. Białko w każdym łyku. 💡 Jedyne piwo z licencjonowanym trenerem personalnym 💪 Dodaj do koszyka" [ref=e496]:
          - /url: /produkt/4
          - generic [ref=e497]:
            - generic [ref=e498]:
              - img "Pszeniczny Siłacz" [ref=e505]
              - generic [ref=e506]:
                - img [ref=e507]
                - text: 4.8%
              - generic [ref=e510]: 🍺 Piwo
              - generic [ref=e511]:
                - button [ref=e512] [cursor=pointer]:
                  - img [ref=e513]
                - img [ref=e516]
            - generic [ref=e519]:
              - generic [ref=e520]:
                - heading "Pszeniczny Siłacz" [level=3] [ref=e521]
                - generic [ref=e522]:
                  - generic [ref=e523]: "10.99"
                  - text: zł
              - paragraph [ref=e524]: Piwo pszeniczne, które chodzi na siłownię. Białko w każdym łyku.
              - generic [ref=e525]: 💡 Jedyne piwo z licencjonowanym trenerem personalnym 💪
              - button "Dodaj do koszyka" [ref=e526] [cursor=pointer]:
                - img [ref=e527]
                - text: Dodaj do koszyka
                - img [ref=e531]
        - link "Wiking Amber Ale 5.8% 🍺 Piwo Wiking Amber Ale 11.99 zł Bursztynowe piwo w hełmie wikinga. Smakiem podbija nowe lądy! 💡 SKÅL! To piwo zdobyło już 3 kontynenty i 2 lodówki 🪓 Dodaj do koszyka" [ref=e534]:
          - /url: /produkt/5
          - generic [ref=e535]:
            - generic [ref=e536]:
              - img "Wiking Amber Ale" [ref=e543]
              - generic [ref=e544]:
                - img [ref=e545]
                - text: 5.8%
              - generic [ref=e548]: 🍺 Piwo
              - generic [ref=e549]:
                - button [ref=e550] [cursor=pointer]:
                  - img [ref=e551]
                - img [ref=e554]
            - generic [ref=e557]:
              - generic [ref=e558]:
                - heading "Wiking Amber Ale" [level=3] [ref=e559]
                - generic [ref=e560]:
                  - generic [ref=e561]: "11.99"
                  - text: zł
              - paragraph [ref=e562]: Bursztynowe piwo w hełmie wikinga. Smakiem podbija nowe lądy!
              - generic [ref=e563]: 💡 SKÅL! To piwo zdobyło już 3 kontynenty i 2 lodówki 🪓
              - button "Dodaj do koszyka" [ref=e564] [cursor=pointer]:
                - img [ref=e565]
                - text: Dodaj do koszyka
                - img [ref=e569]
        - 'link "Kwaśny Cytrynek 4.2% 🍺 Piwo Kwaśny Cytrynek 13.49 zł Sour ale z miną tak kwaśną, że aż ci się usta złożą w dziubek. 💡 Ostrzeżenie: po wypiciu twarz może pozostać w pozycji ''cytrynka'' na 5 minut 🍋 Dodaj do koszyka" [ref=e572]':
          - /url: /produkt/6
          - generic [ref=e573]:
            - generic [ref=e574]:
              - img "Kwaśny Cytrynek" [ref=e581]
              - generic [ref=e582]:
                - img [ref=e583]
                - text: 4.2%
              - generic [ref=e586]: 🍺 Piwo
              - generic [ref=e587]:
                - button [ref=e588] [cursor=pointer]:
                  - img [ref=e589]
                - img [ref=e592]
            - generic [ref=e595]:
              - generic [ref=e596]:
                - heading "Kwaśny Cytrynek" [level=3] [ref=e597]
                - generic [ref=e598]:
                  - generic [ref=e599]: "13.49"
                  - text: zł
              - paragraph [ref=e600]: Sour ale z miną tak kwaśną, że aż ci się usta złożą w dziubek.
              - generic [ref=e601]: "💡 Ostrzeżenie: po wypiciu twarz może pozostać w pozycji 'cytrynka' na 5 minut 🍋"
              - button "Dodaj do koszyka" [ref=e602] [cursor=pointer]:
                - img [ref=e603]
                - text: Dodaj do koszyka
                - img [ref=e607]
        - link "Wino Kowboj 13.5% 🍷 Wino Wino Kowboj 29.99 zł Czerwone wino w kowbojskim kapeluszu. Yeehaw w każdym kieliszku! 💡 To wino przeszło Dziki Zachód i wróciło! 🤠 Dodaj do koszyka" [ref=e610]:
          - /url: /produkt/7
          - generic [ref=e611]:
            - generic [ref=e612]:
              - img "Wino Kowboj" [ref=e619]
              - generic [ref=e620]:
                - img [ref=e621]
                - text: 13.5%
              - generic [ref=e624]: 🍷 Wino
              - generic [ref=e625]:
                - button [ref=e626] [cursor=pointer]:
                  - img [ref=e627]
                - img [ref=e630]
            - generic [ref=e633]:
              - generic [ref=e634]:
                - heading "Wino Kowboj" [level=3] [ref=e635]
                - generic [ref=e636]:
                  - generic [ref=e637]: "29.99"
                  - text: zł
              - paragraph [ref=e638]: Czerwone wino w kowbojskim kapeluszu. Yeehaw w każdym kieliszku!
              - generic [ref=e639]: 💡 To wino przeszło Dziki Zachód i wróciło! 🤠
              - button "Dodaj do koszyka" [ref=e640] [cursor=pointer]:
                - img [ref=e641]
                - text: Dodaj do koszyka
                - img [ref=e645]
        - link "Wódka Góralska 40% 🥃 Wódka Wódka Góralska 39.99 zł Czysta jak górski potok, mocna jak góralska tradycja. Na zdrowie! 💡 Oficjalnie zatwierdzona przez góralskich duchów! 🏔️ Dodaj do koszyka" [ref=e648]:
          - /url: /produkt/8
          - generic [ref=e649]:
            - generic [ref=e650]:
              - img "Wódka Góralska" [ref=e657]
              - generic [ref=e658]:
                - img [ref=e659]
                - text: 40%
              - generic [ref=e662]: 🥃 Wódka
              - generic [ref=e663]:
                - button [ref=e664] [cursor=pointer]:
                  - img [ref=e665]
                - img [ref=e668]
            - generic [ref=e671]:
              - generic [ref=e672]:
                - heading "Wódka Góralska" [level=3] [ref=e673]
                - generic [ref=e674]:
                  - generic [ref=e675]: "39.99"
                  - text: zł
              - paragraph [ref=e676]: Czysta jak górski potok, mocna jak góralska tradycja. Na zdrowie!
              - generic [ref=e677]: 💡 Oficjalnie zatwierdzona przez góralskich duchów! 🏔️
              - button "Dodaj do koszyka" [ref=e678] [cursor=pointer]:
                - img [ref=e679]
                - text: Dodaj do koszyka
                - img [ref=e683]
        - link "Whisky Dżentelmen 43% 🥂 Premium Whisky Dżentelmen 89.99 zł Single malt z monoklą i muszką. Dla prawdziwych koneserów. 💡 Ta whisky ma lepsze maniery niż większość ludzi na imprezie 🎩 Dodaj do koszyka" [ref=e686]:
          - /url: /produkt/9
          - generic [ref=e687]:
            - generic [ref=e688]:
              - img "Whisky Dżentelmen" [ref=e695]
              - generic [ref=e696]:
                - img [ref=e697]
                - text: 43%
              - generic [ref=e700]: 🥂 Premium
              - generic [ref=e701]:
                - button [ref=e702] [cursor=pointer]:
                  - img [ref=e703]
                - img [ref=e706]
            - generic [ref=e709]:
              - generic [ref=e710]:
                - heading "Whisky Dżentelmen" [level=3] [ref=e711]
                - generic [ref=e712]:
                  - generic [ref=e713]: "89.99"
                  - text: zł
              - paragraph [ref=e714]: Single malt z monoklą i muszką. Dla prawdziwych koneserów.
              - generic [ref=e715]: 💡 Ta whisky ma lepsze maniery niż większość ludzi na imprezie 🎩
              - button "Dodaj do koszyka" [ref=e716] [cursor=pointer]:
                - img [ref=e717]
                - text: Dodaj do koszyka
                - img [ref=e721]
        - 'link "Bourbon Szeryf 45% 🥂 Premium Bourbon Szeryf 69.99 zł Bourbon z odznaką szeryfa. Utrzymuje porządek w barze od 1849. 💡 Wanted: Dead or Alive. Najlepiej on the rocks 🌵 Dodaj do koszyka" [ref=e724]':
          - /url: /produkt/10
          - generic [ref=e725]:
            - generic [ref=e726]:
              - img "Bourbon Szeryf" [ref=e733]
              - generic [ref=e734]:
                - img [ref=e735]
                - text: 45%
              - generic [ref=e738]: 🥂 Premium
              - generic [ref=e739]:
                - button [ref=e740] [cursor=pointer]:
                  - img [ref=e741]
                - img [ref=e744]
            - generic [ref=e747]:
              - generic [ref=e748]:
                - heading "Bourbon Szeryf" [level=3] [ref=e749]
                - generic [ref=e750]:
                  - generic [ref=e751]: "69.99"
                  - text: zł
              - paragraph [ref=e752]: Bourbon z odznaką szeryfa. Utrzymuje porządek w barze od 1849.
              - generic [ref=e753]: "💡 Wanted: Dead or Alive. Najlepiej on the rocks 🌵"
              - button "Dodaj do koszyka" [ref=e754] [cursor=pointer]:
                - img [ref=e755]
                - text: Dodaj do koszyka
                - img [ref=e759]
        - link "Zielony Tancerz 35% 🥂 Premium Zielony Tancerz 54.99 zł Likier ziołowy, który nie może przestać tańczyć. 42 zioła w jednej butelce! 💡 Po jednym kieliszku ty też będziesz tańczyć jak on 💃 Dodaj do koszyka" [ref=e762]:
          - /url: /produkt/11
          - generic [ref=e763]:
            - generic [ref=e764]:
              - img "Zielony Tancerz" [ref=e771]
              - generic [ref=e772]:
                - img [ref=e773]
                - text: 35%
              - generic [ref=e776]: 🥂 Premium
              - generic [ref=e777]:
                - button [ref=e778] [cursor=pointer]:
                  - img [ref=e779]
                - img [ref=e782]
            - generic [ref=e785]:
              - generic [ref=e786]:
                - heading "Zielony Tancerz" [level=3] [ref=e787]
                - generic [ref=e788]:
                  - generic [ref=e789]: "54.99"
                  - text: zł
              - paragraph [ref=e790]: Likier ziołowy, który nie może przestać tańczyć. 42 zioła w jednej butelce!
              - generic [ref=e791]: 💡 Po jednym kieliszku ty też będziesz tańczyć jak on 💃
              - button "Dodaj do koszyka" [ref=e792] [cursor=pointer]:
                - img [ref=e793]
                - text: Dodaj do koszyka
                - img [ref=e797]
        - 'link "Wiśniówka Kawaii 18% 🥂 Premium Wiśniówka Kawaii 34.99 zł Najsłodszy likier wiśniowy. Tak uroczy, że aż szkoda pić! 💡 Uwaga: może powodować niekontrolowane mówienie ''kawaii!'' po każdym łyku 🍒 Dodaj do koszyka" [ref=e800]':
          - /url: /produkt/12
          - generic [ref=e801]:
            - generic [ref=e802]:
              - img "Wiśniówka Kawaii" [ref=e809]
              - generic [ref=e810]:
                - img [ref=e811]
                - text: 18%
              - generic [ref=e814]: 🥂 Premium
              - generic [ref=e815]:
                - button [ref=e816] [cursor=pointer]:
                  - img [ref=e817]
                - img [ref=e820]
            - generic [ref=e823]:
              - generic [ref=e824]:
                - heading "Wiśniówka Kawaii" [level=3] [ref=e825]
                - generic [ref=e826]:
                  - generic [ref=e827]: "34.99"
                  - text: zł
              - paragraph [ref=e828]: Najsłodszy likier wiśniowy. Tak uroczy, że aż szkoda pić!
              - generic [ref=e829]: "💡 Uwaga: może powodować niekontrolowane mówienie 'kawaii!' po każdym łyku 🍒"
              - button "Dodaj do koszyka" [ref=e830] [cursor=pointer]:
                - img [ref=e831]
                - text: Dodaj do koszyka
                - img [ref=e835]
    - generic [ref=e837]:
      - generic: ✦ ✦ ✦
    - generic [ref=e840]:
      - generic [ref=e841]:
        - generic [ref=e842]:
          - img [ref=e843]
          - text: Kufel Wyroczni
        - heading "Zapytaj Fisza o cokolwiek" [level=2] [ref=e845]
        - paragraph [ref=e846]: Mistyczny kufel zna odpowiedź. Wpisz pytanie, potrząśnij i poznaj wyrok piany.
      - generic [ref=e847]:
        - generic [ref=e849]:
          - button "Wyrocznia" [ref=e850] [cursor=pointer]:
            - img [ref=e851]
            - text: Wyrocznia
          - button "Moje wróżby (0)" [ref=e854] [cursor=pointer]:
            - img [ref=e855]
            - text: Moje wróżby (0)
        - generic [ref=e858]:
          - generic [ref=e860]: 🍺
          - generic [ref=e861]:
            - textbox "Np. Czy dziś otworzyć stout?" [ref=e862]
            - button "Wróżby" [ref=e863] [cursor=pointer]:
              - img
              - text: Wróżby
          - paragraph [ref=e864]: ✨ Piana milczy. Zadaj pytanie i potrząśnij kuflem ✨
    - generic [ref=e865]:
      - generic: ✦ ✦ ✦
    - generic [ref=e868]:
      - generic [ref=e869]:
        - generic [ref=e870]:
          - img [ref=e871]
          - text: Rybi Horoskop
        - heading "Co Fisz wróży Twojemu znakowi?" [level=2] [ref=e873]
        - paragraph [ref=e874]: Wybierz znak zodiaku, a Fisz podpowie Ci dzisiejszy trunek 🐟🔮
      - generic [ref=e875]:
        - generic [ref=e876]:
          - button "🐏 Baran" [ref=e877] [cursor=pointer]:
            - generic [ref=e878]: 🐏
            - generic [ref=e879]: Baran
          - button "🐂 Byk" [ref=e880] [cursor=pointer]:
            - generic [ref=e881]: 🐂
            - generic [ref=e882]: Byk
          - button "👯 Bliźnięta" [ref=e883] [cursor=pointer]:
            - generic [ref=e884]: 👯
            - generic [ref=e885]: Bliźnięta
          - button "🦞 Rak" [ref=e886] [cursor=pointer]:
            - generic [ref=e887]: 🦞
            - generic [ref=e888]: Rak
          - button "🦁 Lew" [ref=e889] [cursor=pointer]:
            - generic [ref=e890]: 🦁
            - generic [ref=e891]: Lew
          - button "🌾 Panna" [ref=e892] [cursor=pointer]:
            - generic [ref=e893]: 🌾
            - generic [ref=e894]: Panna
          - button "⚖️ Waga" [ref=e895] [cursor=pointer]:
            - generic [ref=e896]: ⚖️
            - generic [ref=e897]: Waga
          - button "🦂 Skorpion" [ref=e898] [cursor=pointer]:
            - generic [ref=e899]: 🦂
            - generic [ref=e900]: Skorpion
          - button "🏹 Strzelec" [ref=e901] [cursor=pointer]:
            - generic [ref=e902]: 🏹
            - generic [ref=e903]: Strzelec
          - button "🐐 Koziorożec" [ref=e904] [cursor=pointer]:
            - generic [ref=e905]: 🐐
            - generic [ref=e906]: Koziorożec
          - button "🏺 Wodnik" [ref=e907] [cursor=pointer]:
            - generic [ref=e908]: 🏺
            - generic [ref=e909]: Wodnik
          - button "🐟 Ryby" [ref=e910] [cursor=pointer]:
            - generic [ref=e911]: 🐟
            - generic [ref=e912]: Ryby
        - button "Losuj znak" [ref=e914] [cursor=pointer]:
          - img
          - text: Losuj znak
        - generic [ref=e915]:
          - img [ref=e916]
          - paragraph [ref=e918]: Wybierz swój znak, by poznać piwną przepowiednię
    - generic [ref=e919]:
      - generic: ✦ ✦ ✦
    - generic [ref=e920]:
      - generic: ✦ ✦ ✦
    - generic [ref=e923]:
      - generic [ref=e924]: "🍺 Do piątku 17:00:"
      - generic [ref=e925]: 6d 04:42:15
      - generic [ref=e926]: 🍺
    - generic [ref=e939]:
      - generic [ref=e941]:
        - img [ref=e942]
        - text: Oferta specjalna
        - img [ref=e945]
      - heading "Dołącz do Klubu VIP 👑" [level=2] [ref=e947]
      - paragraph [ref=e948]: Tylko 5 zł/tydzień za dostęp do ekskluzywnych piw z sekretnym składnikiem Fisza 🐟
      - generic [ref=e949]:
        - generic [ref=e950]:
          - img [ref=e951]
          - text: Limitowane edycje
        - generic [ref=e955]:
          - img [ref=e956]
          - text: Priorytetowa dostawa
        - generic [ref=e958]:
          - img [ref=e959]
          - text: Ekskluzywne smaki
      - link "Sprawdź VIP" [ref=e962]:
        - /url: /vip
        - button "Sprawdź VIP" [ref=e963] [cursor=pointer]:
          - text: Sprawdź VIP
          - img [ref=e964]
      - generic [ref=e966]:
        - generic [ref=e967]: 🔒 Bezpieczne płatności
        - generic [ref=e968]: 🔄 Anuluj kiedy chcesz
        - generic [ref=e969]: 🍺 Nowe piwa co tydzień
    - contentinfo [ref=e970]:
      - generic [ref=e974]:
        - generic [ref=e975]:
          - generic [ref=e976]:
            - generic [ref=e977]:
              - img "U Fisza" [ref=e980]
              - generic [ref=e981]:
                - heading "U Fisza" [level=3] [ref=e982]
                - paragraph [ref=e983]: Sklep Piwny ✦ 2024
            - paragraph [ref=e984]: Fisz od lat dostarcza najlepszy alkohol w mieście. Każda butelka ręcznie wybrana przez naszego eksperta-rybę. Na zdrowie! 🍻
            - generic [ref=e985]:
              - generic [ref=e986]:
                - paragraph [ref=e987]: 1000+
                - paragraph [ref=e988]: Klientów
              - generic [ref=e989]:
                - paragraph [ref=e990]: 50+
                - paragraph [ref=e991]: Rodzajów piw
              - generic [ref=e992]:
                - paragraph [ref=e993]: 24h
                - paragraph [ref=e994]: Dostawa
          - generic [ref=e995]:
            - heading "Kontakt" [level=4] [ref=e996]:
              - img [ref=e997]
              - text: Kontakt
            - generic [ref=e1001]:
              - link "ul. Łucznicza 70-001 Szczecin" [ref=e1002]:
                - /url: https://maps.google.com/?q=Łucznicza+Szczecin
                - img [ref=e1003]
                - generic [ref=e1006]:
                  - text: ul. Łucznicza
                  - text: 70-001 Szczecin
                - img [ref=e1007]
              - link "+48 91 000 00 00" [ref=e1011]:
                - /url: tel:+48910000000
                - img [ref=e1012]
                - generic [ref=e1014]: +48 91 000 00 00
              - link "kontakt@ufisza.pl" [ref=e1015]:
                - /url: mailto:kontakt@ufisza.pl
                - img [ref=e1016]
                - generic [ref=e1019]: kontakt@ufisza.pl
            - generic [ref=e1020]:
              - link [ref=e1021]:
                - /url: "#"
                - img [ref=e1022]
              - link [ref=e1025]:
                - /url: "#"
                - img [ref=e1026]
          - generic [ref=e1028]:
            - heading "Godziny otwarcia" [level=4] [ref=e1029]:
              - img [ref=e1030]
              - text: Godziny otwarcia
            - generic [ref=e1033]:
              - generic [ref=e1034]:
                - generic [ref=e1035]: Pon – Pt
                - generic [ref=e1036]: 10:00 – 22:00
              - generic [ref=e1038]:
                - generic [ref=e1039]: Sobota
                - generic [ref=e1040]: 10:00 – 23:00
              - generic [ref=e1042]:
                - generic [ref=e1043]: Niedziela
                - generic [ref=e1044]: Zamknięte
            - generic [ref=e1045]:
              - paragraph [ref=e1046]: 💡 Wiesz, że...
              - paragraph [ref=e1047]: Zamówienia online przyjmujemy 24/7!
        - generic [ref=e1048]:
          - heading "Znajdź nas na mapie" [level=4] [ref=e1049]:
            - img [ref=e1050]
            - text: Znajdź nas na mapie
          - iframe [ref=e1054]
        - generic [ref=e1056]:
          - generic [ref=e1057]:
            - img [ref=e1058]
            - generic [ref=e1061]:
              - paragraph [ref=e1062]: "ISO 9001: Piwo"
              - paragraph [ref=e1063]: Norma jakości
          - generic [ref=e1064]:
            - img [ref=e1065]
            - generic [ref=e1068]:
              - paragraph [ref=e1069]: Atest Rybactwa
              - paragraph [ref=e1070]: Fisz Approved™
          - generic [ref=e1071]:
            - img [ref=e1072]
            - generic [ref=e1074]:
              - paragraph [ref=e1075]: Towarzystwo Przyjaciół Pianki
              - paragraph [ref=e1076]: Członek honorowy
          - generic [ref=e1077]:
            - img [ref=e1078]
            - generic [ref=e1082]:
              - paragraph [ref=e1083]: Certyfikat Chmielu
              - paragraph [ref=e1084]: 100% naturalne
        - generic [ref=e1087]:
          - generic [ref=e1088]: "🍺 Do piątku 17:00:"
          - generic [ref=e1089]: 6d 04:42:15
          - generic [ref=e1090]: 🍺
        - generic [ref=e1091]:
          - paragraph [ref=e1092]:
            - text: © 2026 Sklep Piwny U Fisza — zrobione z
            - img [ref=e1093]
            - text: w Szczecinie
          - paragraph [ref=e1095]: 🔞 Sprzedaż tylko dla osób pełnoletnich (18+)
    - generic [ref=e1097]:
      - generic [ref=e1101]:
        - generic [ref=e1102]:
          - img [ref=e1104]
          - heading "Koszyk" [level=2] [ref=e1109]
        - button [ref=e1110] [cursor=pointer]:
          - img [ref=e1111]
      - generic [ref=e1115]:
        - generic [ref=e1118]: 🐟
        - paragraph [ref=e1119]: Koszyk jest pusty!
        - paragraph [ref=e1120]: Fisz czeka na Twoje zamówienie...
        - button "Przeglądaj produkty 🍺" [ref=e1121] [cursor=pointer]
    - button "Mądrość Fisza" [ref=e1122] [cursor=pointer]:
      - generic [ref=e1123]: 🐟
      - generic [ref=e1124]: 🎩
    - button "Fisz Radio" [ref=e1128] [cursor=pointer]:
      - img [ref=e1129]
    - generic:
      - generic: 🍺
      - generic: 🍺
  - button "🐟" [ref=e1135] [cursor=pointer]
  - button "🍾" [ref=e1136] [cursor=pointer]: 🍾
  - button "🍺" [ref=e1138] [cursor=pointer]: 🍺
  - button "Włącz tryb imprezowy! 🎉" [ref=e1140] [cursor=pointer]:
    - img [ref=e1142]
  - button "styl" [ref=e1146] [cursor=pointer]
  - button "🥴" [ref=e1147] [cursor=pointer]: 🥴
```

# Test source

```ts
  1   | import { test, expect } from "@playwright/test";
  2   | 
  3   | const MOBILE_VIEWPORTS = [
  4   |   { name: "iPhone SE", width: 375, height: 667 },
  5   |   { name: "iPhone 14", width: 390, height: 844 },
  6   |   { name: "Pixel 5", width: 393, height: 830 },
  7   | ];
  8   | 
  9   | for (const viewport of MOBILE_VIEWPORTS) {
  10  |   test.describe(`Mobile (${viewport.name}: ${viewport.width}x${viewport.height})`, () => {
  11  |     test.use({ viewport: { width: viewport.width, height: viewport.height } });
  12  | 
  13  |     test.describe("Dostawa — strona tracker", () => {
  14  |       test("strona dostawy ładuje się na mobile", async ({ page }) => {
  15  |         await page.goto("/dostawa");
  16  |         await expect(page.locator("text=Dostawca Fisz")).toBeVisible();
  17  |       });
  18  | 
  19  |       test("przycisk śledzenia ma min 44px wysokości (touch target)", async ({ page }) => {
  20  |         await page.goto("/dostawa");
  21  |         const btn = page.locator("text=Rozpocznij śledzenie paczki");
  22  |         await expect(btn).toBeVisible();
  23  |         const box = await btn.boundingBox();
  24  |         expect(box!.height).toBeGreaterThanOrEqual(44);
  25  |       });
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
> 54  |           await expect(page.locator("text=Koszyk")).toBeVisible({ timeout: 3000 });
      |                                                     ^ Error: expect(locator).toBeVisible() failed
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
  126 |           await expect(page.locator("text=Dostawa").first()).toBeVisible({ timeout: 3000 });
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
```