# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: mobile.spec.ts >> Mobile (Pixel 5: 393x830) >> Koszyk — mobile drawer >> koszyk drawer otwiera się po kliknięciu ikony koszyka
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
          - img "U Fisza logo" [ref=e46]
          - generic [ref=e47]: 🍺
        - paragraph [ref=e48]: 🍺 Sklep piwny & alkoholowy 🍺
        - heading "U Fisza" [level=1] [ref=e49]
        - generic [ref=e50]:
          - generic [ref=e51]: 🍻
          - generic [ref=e52]: 🍻
          - generic [ref=e53]: 🍻
          - generic [ref=e54]: 🍻
          - generic [ref=e55]: 🍻
        - paragraph [ref=e56]: Najlepszy alkohol w mieście — craft piwa, whisky, likiery i nie tylko. Zamów online i ciesz się dostawą prosto pod drzwi! 🐟
        - generic [ref=e57]:
          - link "Zobacz ofertę 🍻" [ref=e58]:
            - /url: "#produkty"
          - link "O nas 📍" [ref=e59]:
            - /url: "#o-nas"
        - generic [ref=e60]:
          - generic [ref=e61]:
            - img [ref=e62]
            - generic [ref=e65]: ul. Łucznicza, Szczecin
          - generic [ref=e66]:
            - img [ref=e67]
            - generic [ref=e70]: Pon–Sob 10:00–22:00
          - generic [ref=e71]:
            - img [ref=e72]
            - generic [ref=e74]: +48 91 000 00 00
      - generic [ref=e75]:
        - generic [ref=e76]: Przewiń
        - img [ref=e78]
    - generic [ref=e85]:
      - generic [ref=e86]:
        - generic [ref=e87]:
          - img [ref=e88]
          - text: Dlaczego my?
        - heading "Co nas wyróżnia" [level=2] [ref=e90]
        - paragraph [ref=e91]: Fisz to nie tylko sklep — to filozofia dobrego trunku 🐟
      - generic [ref=e92]:
        - generic [ref=e96]:
          - generic [ref=e97]:
            - img [ref=e99]
            - generic [ref=e103]: 🍺
          - heading "Selekcja Fisza" [level=3] [ref=e104]
          - paragraph [ref=e105]: Każda butelka ręcznie wybrana przez naszego eksperta — gwarancja jakości.
        - generic [ref=e109]:
          - generic [ref=e110]:
            - img [ref=e112]
            - generic [ref=e117]: 🚚
          - heading "Szybka dostawa" [level=3] [ref=e118]
          - paragraph [ref=e119]: Zamów online, a my dostarczymy Twoje ulubione trunki w 24h.
        - generic [ref=e123]:
          - generic [ref=e124]:
            - img [ref=e126]
            - generic [ref=e129]: 🏆
          - heading "Premium & Craft" [level=3] [ref=e130]
          - paragraph [ref=e131]: Ekskluzywne piwa rzemieślnicze, whisky i wina z całego świata.
        - generic [ref=e135]:
          - generic [ref=e136]:
            - img [ref=e138]
            - generic [ref=e141]: ⭐
          - heading "Zaufanie klientów" [level=3] [ref=e142]
          - paragraph [ref=e143]: Ponad 1000+ zadowolonych klientów. Sprawdź nasze recenzje!
        - generic [ref=e147]:
          - generic [ref=e148]:
            - img [ref=e150]
            - generic [ref=e155]: 👑
          - heading "Klub VIP" [level=3] [ref=e156]
          - paragraph [ref=e157]: Dołącz do VIP i odkryj piwa z sekretnym składnikiem Fisza.
        - generic [ref=e161]:
          - generic [ref=e162]:
            - img [ref=e164]
            - generic [ref=e166]: ✨
          - heading "Unikalne smaki" [level=3] [ref=e167]
          - paragraph [ref=e168]: Co tydzień nowe pozycje — nie przegap limitowanych edycji.
    - generic [ref=e169]:
      - generic: ✦ ✦ ✦
    - generic [ref=e175]:
      - generic [ref=e176]:
        - generic [ref=e177]:
          - img [ref=e178]
          - text: Najwyżej oceniane
          - img [ref=e184]
        - heading "Hity od Fisza 🏆" [level=2] [ref=e186]
        - paragraph [ref=e187]: Produkty, które pokochali nasi klienci — sprawdź sam!
      - generic [ref=e188]:
        - link "#1 Złoty Fisz Lager Złoty Fisz Lager 4.8 8.99zł" [ref=e190]:
          - /url: /produkt/1
          - generic [ref=e191]:
            - generic [ref=e192]:
              - generic: "#1"
            - img "Złoty Fisz Lager" [ref=e198]
            - generic [ref=e199]:
              - heading "Złoty Fisz Lager" [level=3] [ref=e200]
              - generic [ref=e201]:
                - generic [ref=e202]:
                  - img [ref=e203]
                  - img [ref=e205]
                  - img [ref=e207]
                  - img [ref=e209]
                  - img [ref=e211]
                - generic [ref=e213]: "4.8"
              - generic [ref=e214]:
                - generic [ref=e215]: 8.99zł
                - button [ref=e216] [cursor=pointer]:
                  - img [ref=e217]
        - link "#2 Hipster IPA Hipster IPA 4.8 12.99zł" [ref=e221]:
          - /url: /produkt/2
          - generic [ref=e222]:
            - generic [ref=e223]:
              - generic: "#2"
            - img "Hipster IPA" [ref=e229]
            - generic [ref=e230]:
              - heading "Hipster IPA" [level=3] [ref=e231]
              - generic [ref=e232]:
                - generic [ref=e233]:
                  - img [ref=e234]
                  - img [ref=e236]
                  - img [ref=e238]
                  - img [ref=e240]
                  - img [ref=e242]
                - generic [ref=e244]: "4.8"
              - generic [ref=e245]:
                - generic [ref=e246]: 12.99zł
                - button [ref=e247] [cursor=pointer]:
                  - img [ref=e248]
        - link "#3 Mroczny Stout Boarthu Mroczny Stout Boarthu 4.8 14.99zł" [ref=e252]:
          - /url: /produkt/3
          - generic [ref=e253]:
            - generic [ref=e254]:
              - generic: "#3"
            - img "Mroczny Stout Boarthu" [ref=e260]
            - generic [ref=e261]:
              - heading "Mroczny Stout Boarthu" [level=3] [ref=e262]
              - generic [ref=e263]:
                - generic [ref=e264]:
                  - img [ref=e265]
                  - img [ref=e267]
                  - img [ref=e269]
                  - img [ref=e271]
                  - img [ref=e273]
                - generic [ref=e275]: "4.8"
              - generic [ref=e276]:
                - generic [ref=e277]: 14.99zł
                - button [ref=e278] [cursor=pointer]:
                  - img [ref=e279]
        - link "Pszeniczny Siłacz Pszeniczny Siłacz 4.8 10.99zł" [ref=e283]:
          - /url: /produkt/4
          - generic [ref=e284]:
            - img "Pszeniczny Siłacz" [ref=e290]
            - generic [ref=e291]:
              - heading "Pszeniczny Siłacz" [level=3] [ref=e292]
              - generic [ref=e293]:
                - generic [ref=e294]:
                  - img [ref=e295]
                  - img [ref=e297]
                  - img [ref=e299]
                  - img [ref=e301]
                  - img [ref=e303]
                - generic [ref=e305]: "4.8"
              - generic [ref=e306]:
                - generic [ref=e307]: 10.99zł
                - button [ref=e308] [cursor=pointer]:
                  - img [ref=e309]
      - link "Zobacz całą ofertę" [ref=e313]:
        - /url: "#produkty"
        - text: Zobacz całą ofertę
        - img [ref=e314]
    - generic [ref=e316]:
      - generic: ✦ ✦ ✦
    - generic [ref=e326]:
      - generic [ref=e327]: Poznaj naszą maskotkę 🍺
      - heading "Kufel Fisza tańczy!" [level=2] [ref=e329]
      - paragraph [ref=e330]: Nasz tancerz nie może się doczekać Twojego zamówienia 🕺
    - generic [ref=e337]:
      - generic: ✦ ✦ ✦
    - generic [ref=e342]:
      - generic [ref=e343]:
        - generic [ref=e344]:
          - img [ref=e345]
          - text: Premium Selection
        - heading "Nasza Oferta" [level=2] [ref=e347]
        - paragraph [ref=e348]: Ręcznie wyselekcjonowane trunki od Fisza. Wybierz swoje ulubione i zamów z dostawą! 🚚
      - generic [ref=e350]:
        - img [ref=e351]
        - textbox "Szukaj produktu po nazwie..." [ref=e354]
        - button [ref=e355] [cursor=pointer]:
          - img [ref=e356]
      - generic [ref=e357]:
        - button "🍻 Wszystko" [ref=e358] [cursor=pointer]:
          - generic [ref=e359]: 🍻
          - text: Wszystko
        - button "🍺 Piwo" [ref=e360] [cursor=pointer]:
          - generic [ref=e361]: 🍺
          - text: Piwo
        - button "🍷 Wino" [ref=e362] [cursor=pointer]:
          - generic [ref=e363]: 🍷
          - text: Wino
        - button "🥃 Wódka" [ref=e364] [cursor=pointer]:
          - generic [ref=e365]: 🥃
          - text: Wódka
        - button "🥂 Whisky & Likiery" [ref=e366] [cursor=pointer]:
          - generic [ref=e367]: 🥂
          - text: Whisky & Likiery
      - generic [ref=e368]:
        - paragraph [ref=e369]: 12 produktów w ofercie
        - generic [ref=e370]:
          - img [ref=e371]
          - button "Domyślne" [ref=e374] [cursor=pointer]: Domyślne
          - button "Cena ↑" [ref=e376] [cursor=pointer]
          - button "Cena ↓" [ref=e377] [cursor=pointer]
          - button "ABV ↑" [ref=e378] [cursor=pointer]
          - button "ABV ↓" [ref=e379] [cursor=pointer]
          - button "A–Z" [ref=e380] [cursor=pointer]
      - generic [ref=e381]:
        - link "Złoty Fisz Lager 5% 🍺 Piwo Złoty Fisz Lager 8.99 zł Klasyczny lager, złocisty jak zachód słońca nad stawem pełnym ryb. 💡 Ten lager jest tak dobry, że nawet ryby wychodzą z wody żeby go spróbować! 🐟 Dodaj do koszyka" [ref=e383]:
          - /url: /produkt/1
          - generic [ref=e384]:
            - generic [ref=e385]:
              - img "Złoty Fisz Lager" [ref=e392]
              - generic [ref=e393]:
                - img [ref=e394]
                - text: 5%
              - generic [ref=e397]: 🍺 Piwo
              - generic [ref=e398]:
                - button [ref=e399] [cursor=pointer]:
                  - img [ref=e400]
                - img [ref=e403]
            - generic [ref=e406]:
              - generic [ref=e407]:
                - heading "Złoty Fisz Lager" [level=3] [ref=e408]
                - generic [ref=e409]:
                  - generic [ref=e410]: "8.99"
                  - text: zł
              - paragraph [ref=e411]: Klasyczny lager, złocisty jak zachód słońca nad stawem pełnym ryb.
              - generic [ref=e412]: 💡 Ten lager jest tak dobry, że nawet ryby wychodzą z wody żeby go spróbować! 🐟
              - button "Dodaj do koszyka" [ref=e413] [cursor=pointer]:
                - img [ref=e414]
                - text: Dodaj do koszyka
                - img [ref=e418]
        - link "Hipster IPA 6.5% 🍺 Piwo Hipster IPA 12.99 zł Chmielowe szaleństwo z wąsem i okularami. Zanim było modne. 💡 Piłem IPA zanim to było cool. Teraz jest ciepłe. 🕶️ Dodaj do koszyka" [ref=e421]:
          - /url: /produkt/2
          - generic [ref=e422]:
            - generic [ref=e423]:
              - img "Hipster IPA" [ref=e430]
              - generic [ref=e431]:
                - img [ref=e432]
                - text: 6.5%
              - generic [ref=e435]: 🍺 Piwo
              - generic [ref=e436]:
                - button [ref=e437] [cursor=pointer]:
                  - img [ref=e438]
                - img [ref=e441]
            - generic [ref=e444]:
              - generic [ref=e445]:
                - heading "Hipster IPA" [level=3] [ref=e446]
                - generic [ref=e447]:
                  - generic [ref=e448]: "12.99"
                  - text: zł
              - paragraph [ref=e449]: Chmielowe szaleństwo z wąsem i okularami. Zanim było modne.
              - generic [ref=e450]: 💡 Piłem IPA zanim to było cool. Teraz jest ciepłe. 🕶️
              - button "Dodaj do koszyka" [ref=e451] [cursor=pointer]:
                - img [ref=e452]
                - text: Dodaj do koszyka
                - img [ref=e456]
        - link "Mroczny Stout Boarthu 7.2% 🍺 Piwo Mroczny Stout Boarthu 14.99 zł Ciemny jak noc, mocny jak niedźwiedź. Z nutą czekolady i gniewu. 💡 Nie patrz mu w oczy. On nie lubi gdy na niego patrzysz. 😠 Dodaj do koszyka" [ref=e459]:
          - /url: /produkt/3
          - generic [ref=e460]:
            - generic [ref=e461]:
              - img "Mroczny Stout Boarthu" [ref=e468]
              - generic [ref=e469]:
                - img [ref=e470]
                - text: 7.2%
              - generic [ref=e473]: 🍺 Piwo
              - generic [ref=e474]:
                - button [ref=e475] [cursor=pointer]:
                  - img [ref=e476]
                - img [ref=e479]
            - generic [ref=e482]:
              - generic [ref=e483]:
                - heading "Mroczny Stout Boarthu" [level=3] [ref=e484]
                - generic [ref=e485]:
                  - generic [ref=e486]: "14.99"
                  - text: zł
              - paragraph [ref=e487]: Ciemny jak noc, mocny jak niedźwiedź. Z nutą czekolady i gniewu.
              - generic [ref=e488]: 💡 Nie patrz mu w oczy. On nie lubi gdy na niego patrzysz. 😠
              - button "Dodaj do koszyka" [ref=e489] [cursor=pointer]:
                - img [ref=e490]
                - text: Dodaj do koszyka
                - img [ref=e494]
        - link "Pszeniczny Siłacz 4.8% 🍺 Piwo Pszeniczny Siłacz 10.99 zł Piwo pszeniczne, które chodzi na siłownię. Białko w każdym łyku. 💡 Jedyne piwo z licencjonowanym trenerem personalnym 💪 Dodaj do koszyka" [ref=e497]:
          - /url: /produkt/4
          - generic [ref=e498]:
            - generic [ref=e499]:
              - img "Pszeniczny Siłacz" [ref=e506]
              - generic [ref=e507]:
                - img [ref=e508]
                - text: 4.8%
              - generic [ref=e511]: 🍺 Piwo
              - generic [ref=e512]:
                - button [ref=e513] [cursor=pointer]:
                  - img [ref=e514]
                - img [ref=e517]
            - generic [ref=e520]:
              - generic [ref=e521]:
                - heading "Pszeniczny Siłacz" [level=3] [ref=e522]
                - generic [ref=e523]:
                  - generic [ref=e524]: "10.99"
                  - text: zł
              - paragraph [ref=e525]: Piwo pszeniczne, które chodzi na siłownię. Białko w każdym łyku.
              - generic [ref=e526]: 💡 Jedyne piwo z licencjonowanym trenerem personalnym 💪
              - button "Dodaj do koszyka" [ref=e527] [cursor=pointer]:
                - img [ref=e528]
                - text: Dodaj do koszyka
                - img [ref=e532]
        - link "Wiking Amber Ale 5.8% 🍺 Piwo Wiking Amber Ale 11.99 zł Bursztynowe piwo w hełmie wikinga. Smakiem podbija nowe lądy! 💡 SKÅL! To piwo zdobyło już 3 kontynenty i 2 lodówki 🪓 Dodaj do koszyka" [ref=e535]:
          - /url: /produkt/5
          - generic [ref=e536]:
            - generic [ref=e537]:
              - img "Wiking Amber Ale" [ref=e544]
              - generic [ref=e545]:
                - img [ref=e546]
                - text: 5.8%
              - generic [ref=e549]: 🍺 Piwo
              - generic [ref=e550]:
                - button [ref=e551] [cursor=pointer]:
                  - img [ref=e552]
                - img [ref=e555]
            - generic [ref=e558]:
              - generic [ref=e559]:
                - heading "Wiking Amber Ale" [level=3] [ref=e560]
                - generic [ref=e561]:
                  - generic [ref=e562]: "11.99"
                  - text: zł
              - paragraph [ref=e563]: Bursztynowe piwo w hełmie wikinga. Smakiem podbija nowe lądy!
              - generic [ref=e564]: 💡 SKÅL! To piwo zdobyło już 3 kontynenty i 2 lodówki 🪓
              - button "Dodaj do koszyka" [ref=e565] [cursor=pointer]:
                - img [ref=e566]
                - text: Dodaj do koszyka
                - img [ref=e570]
        - 'link "Kwaśny Cytrynek 4.2% 🍺 Piwo Kwaśny Cytrynek 13.49 zł Sour ale z miną tak kwaśną, że aż ci się usta złożą w dziubek. 💡 Ostrzeżenie: po wypiciu twarz może pozostać w pozycji ''cytrynka'' na 5 minut 🍋 Dodaj do koszyka" [ref=e573]':
          - /url: /produkt/6
          - generic [ref=e574]:
            - generic [ref=e575]:
              - img "Kwaśny Cytrynek" [ref=e582]
              - generic [ref=e583]:
                - img [ref=e584]
                - text: 4.2%
              - generic [ref=e587]: 🍺 Piwo
              - generic [ref=e588]:
                - button [ref=e589] [cursor=pointer]:
                  - img [ref=e590]
                - img [ref=e593]
            - generic [ref=e596]:
              - generic [ref=e597]:
                - heading "Kwaśny Cytrynek" [level=3] [ref=e598]
                - generic [ref=e599]:
                  - generic [ref=e600]: "13.49"
                  - text: zł
              - paragraph [ref=e601]: Sour ale z miną tak kwaśną, że aż ci się usta złożą w dziubek.
              - generic [ref=e602]: "💡 Ostrzeżenie: po wypiciu twarz może pozostać w pozycji 'cytrynka' na 5 minut 🍋"
              - button "Dodaj do koszyka" [ref=e603] [cursor=pointer]:
                - img [ref=e604]
                - text: Dodaj do koszyka
                - img [ref=e608]
        - link "Wino Kowboj 13.5% 🍷 Wino Wino Kowboj 29.99 zł Czerwone wino w kowbojskim kapeluszu. Yeehaw w każdym kieliszku! 💡 To wino przeszło Dziki Zachód i wróciło! 🤠 Dodaj do koszyka" [ref=e611]:
          - /url: /produkt/7
          - generic [ref=e612]:
            - generic [ref=e613]:
              - img "Wino Kowboj" [ref=e620]
              - generic [ref=e621]:
                - img [ref=e622]
                - text: 13.5%
              - generic [ref=e625]: 🍷 Wino
              - generic [ref=e626]:
                - button [ref=e627] [cursor=pointer]:
                  - img [ref=e628]
                - img [ref=e631]
            - generic [ref=e634]:
              - generic [ref=e635]:
                - heading "Wino Kowboj" [level=3] [ref=e636]
                - generic [ref=e637]:
                  - generic [ref=e638]: "29.99"
                  - text: zł
              - paragraph [ref=e639]: Czerwone wino w kowbojskim kapeluszu. Yeehaw w każdym kieliszku!
              - generic [ref=e640]: 💡 To wino przeszło Dziki Zachód i wróciło! 🤠
              - button "Dodaj do koszyka" [ref=e641] [cursor=pointer]:
                - img [ref=e642]
                - text: Dodaj do koszyka
                - img [ref=e646]
        - link "Wódka Góralska 40% 🥃 Wódka Wódka Góralska 39.99 zł Czysta jak górski potok, mocna jak góralska tradycja. Na zdrowie! 💡 Oficjalnie zatwierdzona przez góralskich duchów! 🏔️ Dodaj do koszyka" [ref=e649]:
          - /url: /produkt/8
          - generic [ref=e650]:
            - generic [ref=e651]:
              - img "Wódka Góralska" [ref=e658]
              - generic [ref=e659]:
                - img [ref=e660]
                - text: 40%
              - generic [ref=e663]: 🥃 Wódka
              - generic [ref=e664]:
                - button [ref=e665] [cursor=pointer]:
                  - img [ref=e666]
                - img [ref=e669]
            - generic [ref=e672]:
              - generic [ref=e673]:
                - heading "Wódka Góralska" [level=3] [ref=e674]
                - generic [ref=e675]:
                  - generic [ref=e676]: "39.99"
                  - text: zł
              - paragraph [ref=e677]: Czysta jak górski potok, mocna jak góralska tradycja. Na zdrowie!
              - generic [ref=e678]: 💡 Oficjalnie zatwierdzona przez góralskich duchów! 🏔️
              - button "Dodaj do koszyka" [ref=e679] [cursor=pointer]:
                - img [ref=e680]
                - text: Dodaj do koszyka
                - img [ref=e684]
        - link "Whisky Dżentelmen 43% 🥂 Premium Whisky Dżentelmen 89.99 zł Single malt z monoklą i muszką. Dla prawdziwych koneserów. 💡 Ta whisky ma lepsze maniery niż większość ludzi na imprezie 🎩 Dodaj do koszyka" [ref=e687]:
          - /url: /produkt/9
          - generic [ref=e688]:
            - generic [ref=e689]:
              - img "Whisky Dżentelmen" [ref=e696]
              - generic [ref=e697]:
                - img [ref=e698]
                - text: 43%
              - generic [ref=e701]: 🥂 Premium
              - generic [ref=e702]:
                - button [ref=e703] [cursor=pointer]:
                  - img [ref=e704]
                - img [ref=e707]
            - generic [ref=e710]:
              - generic [ref=e711]:
                - heading "Whisky Dżentelmen" [level=3] [ref=e712]
                - generic [ref=e713]:
                  - generic [ref=e714]: "89.99"
                  - text: zł
              - paragraph [ref=e715]: Single malt z monoklą i muszką. Dla prawdziwych koneserów.
              - generic [ref=e716]: 💡 Ta whisky ma lepsze maniery niż większość ludzi na imprezie 🎩
              - button "Dodaj do koszyka" [ref=e717] [cursor=pointer]:
                - img [ref=e718]
                - text: Dodaj do koszyka
                - img [ref=e722]
        - 'link "Bourbon Szeryf 45% 🥂 Premium Bourbon Szeryf 69.99 zł Bourbon z odznaką szeryfa. Utrzymuje porządek w barze od 1849. 💡 Wanted: Dead or Alive. Najlepiej on the rocks 🌵 Dodaj do koszyka" [ref=e725]':
          - /url: /produkt/10
          - generic [ref=e726]:
            - generic [ref=e727]:
              - img "Bourbon Szeryf" [ref=e734]
              - generic [ref=e735]:
                - img [ref=e736]
                - text: 45%
              - generic [ref=e739]: 🥂 Premium
              - generic [ref=e740]:
                - button [ref=e741] [cursor=pointer]:
                  - img [ref=e742]
                - img [ref=e745]
            - generic [ref=e748]:
              - generic [ref=e749]:
                - heading "Bourbon Szeryf" [level=3] [ref=e750]
                - generic [ref=e751]:
                  - generic [ref=e752]: "69.99"
                  - text: zł
              - paragraph [ref=e753]: Bourbon z odznaką szeryfa. Utrzymuje porządek w barze od 1849.
              - generic [ref=e754]: "💡 Wanted: Dead or Alive. Najlepiej on the rocks 🌵"
              - button "Dodaj do koszyka" [ref=e755] [cursor=pointer]:
                - img [ref=e756]
                - text: Dodaj do koszyka
                - img [ref=e760]
        - link "Zielony Tancerz 35% 🥂 Premium Zielony Tancerz 54.99 zł Likier ziołowy, który nie może przestać tańczyć. 42 zioła w jednej butelce! 💡 Po jednym kieliszku ty też będziesz tańczyć jak on 💃 Dodaj do koszyka" [ref=e763]:
          - /url: /produkt/11
          - generic [ref=e764]:
            - generic [ref=e765]:
              - img "Zielony Tancerz" [ref=e772]
              - generic [ref=e773]:
                - img [ref=e774]
                - text: 35%
              - generic [ref=e777]: 🥂 Premium
              - generic [ref=e778]:
                - button [ref=e779] [cursor=pointer]:
                  - img [ref=e780]
                - img [ref=e783]
            - generic [ref=e786]:
              - generic [ref=e787]:
                - heading "Zielony Tancerz" [level=3] [ref=e788]
                - generic [ref=e789]:
                  - generic [ref=e790]: "54.99"
                  - text: zł
              - paragraph [ref=e791]: Likier ziołowy, który nie może przestać tańczyć. 42 zioła w jednej butelce!
              - generic [ref=e792]: 💡 Po jednym kieliszku ty też będziesz tańczyć jak on 💃
              - button "Dodaj do koszyka" [ref=e793] [cursor=pointer]:
                - img [ref=e794]
                - text: Dodaj do koszyka
                - img [ref=e798]
        - 'link "Wiśniówka Kawaii 18% 🥂 Premium Wiśniówka Kawaii 34.99 zł Najsłodszy likier wiśniowy. Tak uroczy, że aż szkoda pić! 💡 Uwaga: może powodować niekontrolowane mówienie ''kawaii!'' po każdym łyku 🍒 Dodaj do koszyka" [ref=e801]':
          - /url: /produkt/12
          - generic [ref=e802]:
            - generic [ref=e803]:
              - img "Wiśniówka Kawaii" [ref=e810]
              - generic [ref=e811]:
                - img [ref=e812]
                - text: 18%
              - generic [ref=e815]: 🥂 Premium
              - generic [ref=e816]:
                - button [ref=e817] [cursor=pointer]:
                  - img [ref=e818]
                - img [ref=e821]
            - generic [ref=e824]:
              - generic [ref=e825]:
                - heading "Wiśniówka Kawaii" [level=3] [ref=e826]
                - generic [ref=e827]:
                  - generic [ref=e828]: "34.99"
                  - text: zł
              - paragraph [ref=e829]: Najsłodszy likier wiśniowy. Tak uroczy, że aż szkoda pić!
              - generic [ref=e830]: "💡 Uwaga: może powodować niekontrolowane mówienie 'kawaii!' po każdym łyku 🍒"
              - button "Dodaj do koszyka" [ref=e831] [cursor=pointer]:
                - img [ref=e832]
                - text: Dodaj do koszyka
                - img [ref=e836]
    - generic [ref=e838]:
      - generic: ✦ ✦ ✦
    - generic [ref=e841]:
      - generic [ref=e842]:
        - generic [ref=e843]:
          - img [ref=e844]
          - text: Kufel Wyroczni
        - heading "Zapytaj Fisza o cokolwiek" [level=2] [ref=e846]
        - paragraph [ref=e847]: Mistyczny kufel zna odpowiedź. Wpisz pytanie, potrząśnij i poznaj wyrok piany.
      - generic [ref=e848]:
        - generic [ref=e850]:
          - button "Wyrocznia" [ref=e851] [cursor=pointer]:
            - img [ref=e852]
            - text: Wyrocznia
          - button "Moje wróżby (0)" [ref=e855] [cursor=pointer]:
            - img [ref=e856]
            - text: Moje wróżby (0)
        - generic [ref=e859]:
          - generic [ref=e861]: 🍺
          - generic [ref=e862]:
            - textbox "Np. Czy dziś otworzyć stout?" [ref=e863]
            - button "Wróżby" [ref=e864] [cursor=pointer]:
              - img
              - text: Wróżby
          - paragraph [ref=e865]: ✨ Piana milczy. Zadaj pytanie i potrząśnij kuflem ✨
    - generic [ref=e866]:
      - generic: ✦ ✦ ✦
    - generic [ref=e869]:
      - generic [ref=e870]:
        - generic [ref=e871]:
          - img [ref=e872]
          - text: Rybi Horoskop
        - heading "Co Fisz wróży Twojemu znakowi?" [level=2] [ref=e874]
        - paragraph [ref=e875]: Wybierz znak zodiaku, a Fisz podpowie Ci dzisiejszy trunek 🐟🔮
      - generic [ref=e876]:
        - generic [ref=e877]:
          - button "🐏 Baran" [ref=e878] [cursor=pointer]:
            - generic [ref=e879]: 🐏
            - generic [ref=e880]: Baran
          - button "🐂 Byk" [ref=e881] [cursor=pointer]:
            - generic [ref=e882]: 🐂
            - generic [ref=e883]: Byk
          - button "👯 Bliźnięta" [ref=e884] [cursor=pointer]:
            - generic [ref=e885]: 👯
            - generic [ref=e886]: Bliźnięta
          - button "🦞 Rak" [ref=e887] [cursor=pointer]:
            - generic [ref=e888]: 🦞
            - generic [ref=e889]: Rak
          - button "🦁 Lew" [ref=e890] [cursor=pointer]:
            - generic [ref=e891]: 🦁
            - generic [ref=e892]: Lew
          - button "🌾 Panna" [ref=e893] [cursor=pointer]:
            - generic [ref=e894]: 🌾
            - generic [ref=e895]: Panna
          - button "⚖️ Waga" [ref=e896] [cursor=pointer]:
            - generic [ref=e897]: ⚖️
            - generic [ref=e898]: Waga
          - button "🦂 Skorpion" [ref=e899] [cursor=pointer]:
            - generic [ref=e900]: 🦂
            - generic [ref=e901]: Skorpion
          - button "🏹 Strzelec" [ref=e902] [cursor=pointer]:
            - generic [ref=e903]: 🏹
            - generic [ref=e904]: Strzelec
          - button "🐐 Koziorożec" [ref=e905] [cursor=pointer]:
            - generic [ref=e906]: 🐐
            - generic [ref=e907]: Koziorożec
          - button "🏺 Wodnik" [ref=e908] [cursor=pointer]:
            - generic [ref=e909]: 🏺
            - generic [ref=e910]: Wodnik
          - button "🐟 Ryby" [ref=e911] [cursor=pointer]:
            - generic [ref=e912]: 🐟
            - generic [ref=e913]: Ryby
        - button "Losuj znak" [ref=e915] [cursor=pointer]:
          - img
          - text: Losuj znak
        - generic [ref=e916]:
          - img [ref=e917]
          - paragraph [ref=e919]: Wybierz swój znak, by poznać piwną przepowiednię
    - generic [ref=e920]:
      - generic: ✦ ✦ ✦
    - generic [ref=e921]:
      - generic: ✦ ✦ ✦
    - generic [ref=e924]:
      - generic [ref=e925]: "🍺 Do piątku 17:00:"
      - generic [ref=e926]: 6d 04:41:36
      - generic [ref=e927]: 🍺
    - generic [ref=e940]:
      - generic [ref=e942]:
        - img [ref=e943]
        - text: Oferta specjalna
        - img [ref=e946]
      - heading "Dołącz do Klubu VIP 👑" [level=2] [ref=e948]
      - paragraph [ref=e949]: Tylko 5 zł/tydzień za dostęp do ekskluzywnych piw z sekretnym składnikiem Fisza 🐟
      - generic [ref=e950]:
        - generic [ref=e951]:
          - img [ref=e952]
          - text: Limitowane edycje
        - generic [ref=e956]:
          - img [ref=e957]
          - text: Priorytetowa dostawa
        - generic [ref=e959]:
          - img [ref=e960]
          - text: Ekskluzywne smaki
      - link "Sprawdź VIP" [ref=e963]:
        - /url: /vip
        - button "Sprawdź VIP" [ref=e964] [cursor=pointer]:
          - text: Sprawdź VIP
          - img [ref=e965]
      - generic [ref=e967]:
        - generic [ref=e968]: 🔒 Bezpieczne płatności
        - generic [ref=e969]: 🔄 Anuluj kiedy chcesz
        - generic [ref=e970]: 🍺 Nowe piwa co tydzień
    - contentinfo [ref=e971]:
      - generic [ref=e975]:
        - generic [ref=e976]:
          - generic [ref=e977]:
            - generic [ref=e978]:
              - img "U Fisza" [ref=e981]
              - generic [ref=e982]:
                - heading "U Fisza" [level=3] [ref=e983]
                - paragraph [ref=e984]: Sklep Piwny ✦ 2024
            - paragraph [ref=e985]: Fisz od lat dostarcza najlepszy alkohol w mieście. Każda butelka ręcznie wybrana przez naszego eksperta-rybę. Na zdrowie! 🍻
            - generic [ref=e986]:
              - generic [ref=e987]:
                - paragraph [ref=e988]: 1000+
                - paragraph [ref=e989]: Klientów
              - generic [ref=e990]:
                - paragraph [ref=e991]: 50+
                - paragraph [ref=e992]: Rodzajów piw
              - generic [ref=e993]:
                - paragraph [ref=e994]: 24h
                - paragraph [ref=e995]: Dostawa
          - generic [ref=e996]:
            - heading "Kontakt" [level=4] [ref=e997]:
              - img [ref=e998]
              - text: Kontakt
            - generic [ref=e1002]:
              - link "ul. Łucznicza 70-001 Szczecin" [ref=e1003]:
                - /url: https://maps.google.com/?q=Łucznicza+Szczecin
                - img [ref=e1004]
                - generic [ref=e1007]:
                  - text: ul. Łucznicza
                  - text: 70-001 Szczecin
                - img [ref=e1008]
              - link "+48 91 000 00 00" [ref=e1012]:
                - /url: tel:+48910000000
                - img [ref=e1013]
                - generic [ref=e1015]: +48 91 000 00 00
              - link "kontakt@ufisza.pl" [ref=e1016]:
                - /url: mailto:kontakt@ufisza.pl
                - img [ref=e1017]
                - generic [ref=e1020]: kontakt@ufisza.pl
            - generic [ref=e1021]:
              - link [ref=e1022]:
                - /url: "#"
                - img [ref=e1023]
              - link [ref=e1026]:
                - /url: "#"
                - img [ref=e1027]
          - generic [ref=e1029]:
            - heading "Godziny otwarcia" [level=4] [ref=e1030]:
              - img [ref=e1031]
              - text: Godziny otwarcia
            - generic [ref=e1034]:
              - generic [ref=e1035]:
                - generic [ref=e1036]: Pon – Pt
                - generic [ref=e1037]: 10:00 – 22:00
              - generic [ref=e1039]:
                - generic [ref=e1040]: Sobota
                - generic [ref=e1041]: 10:00 – 23:00
              - generic [ref=e1043]:
                - generic [ref=e1044]: Niedziela
                - generic [ref=e1045]: Zamknięte
            - generic [ref=e1046]:
              - paragraph [ref=e1047]: 💡 Wiesz, że...
              - paragraph [ref=e1048]: Zamówienia online przyjmujemy 24/7!
        - generic [ref=e1049]:
          - heading "Znajdź nas na mapie" [level=4] [ref=e1050]:
            - img [ref=e1051]
            - text: Znajdź nas na mapie
          - iframe [ref=e1055]
        - generic [ref=e1057]:
          - generic [ref=e1058]:
            - img [ref=e1059]
            - generic [ref=e1062]:
              - paragraph [ref=e1063]: "ISO 9001: Piwo"
              - paragraph [ref=e1064]: Norma jakości
          - generic [ref=e1065]:
            - img [ref=e1066]
            - generic [ref=e1069]:
              - paragraph [ref=e1070]: Atest Rybactwa
              - paragraph [ref=e1071]: Fisz Approved™
          - generic [ref=e1072]:
            - img [ref=e1073]
            - generic [ref=e1075]:
              - paragraph [ref=e1076]: Towarzystwo Przyjaciół Pianki
              - paragraph [ref=e1077]: Członek honorowy
          - generic [ref=e1078]:
            - img [ref=e1079]
            - generic [ref=e1083]:
              - paragraph [ref=e1084]: Certyfikat Chmielu
              - paragraph [ref=e1085]: 100% naturalne
        - generic [ref=e1088]:
          - generic [ref=e1089]: "🍺 Do piątku 17:00:"
          - generic [ref=e1090]: 6d 04:41:36
          - generic [ref=e1091]: 🍺
        - generic [ref=e1092]:
          - paragraph [ref=e1093]:
            - text: © 2026 Sklep Piwny U Fisza — zrobione z
            - img [ref=e1094]
            - text: w Szczecinie
          - paragraph [ref=e1096]: 🔞 Sprzedaż tylko dla osób pełnoletnich (18+)
    - generic [ref=e1098]:
      - generic [ref=e1102]:
        - generic [ref=e1103]:
          - img [ref=e1105]
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
      - generic: 🌿
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