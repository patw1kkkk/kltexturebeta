# KL Texture

KL Texture on Next.js App Routerilla rakennettu responsiivinen brändisivusto suomalaiselle hiustuotesarjalle. Sivusto käyttää mock-dataa ja Shopify Storefront Web Components -integraatiota, jotta ostoskori ja checkout voidaan liittää Shopifyyn ilman omaa checkoutia tai ostoskorilogiikkaa.

## Asennus

```bash
npm install
```

## Käynnistys paikallisesti

```bash
npm run dev
```

Sivusto avautuu oletuksena osoitteessa `http://localhost:3000`.

## Build

```bash
npm run build
npm run start
```

## Julkaisu Vercelissä

1. Vie projekti GitHub-repositorioon.
2. Luo uusi Vercel-projekti ja valitse tämä repo.
3. Framework-asetuksen pitäisi tunnistua automaattisesti: Next.js.
4. Build-komento: `npm run build`.
5. Lisää oma domain Vercelin Domain-asetuksista.

## Mock-data

Tuotteet löytyvät tiedostosta `data/products.ts`.

Rutiinit löytyvät tiedostosta `data/routines.ts`.

Before-after-esimerkit löytyvät tiedostosta `data/transformations.ts`.

## Kuvat ja videot

Logo vaihdetaan tiedostoon `public/images/logo/kl-texture-logo.svg` tai päivittämällä headerin tekstilogo oikeaan kuvaan.

Tuotekuvat vaihdetaan kansioon `public/images/products/`.

Hero-kuva vaihdetaan kansioon `public/images/hero/`.

Rutiini- ja social-kuvat vaihdetaan kansioihin `public/images/routines/` ja `public/videos/social/`.

Hero-video voidaan lisätä kansioon `public/videos/hero/`. Nykyinen toteutus käyttää laadukasta placeholder-kuvaa, jos videota ei ole vielä liitetty.

## Homepage 2026

Etusivu on rakennettu rauhalliseksi ja minimalistiseksi brändikokemukseksi komponentissa `components/home/EditorialHomePage.tsx`. Sivun järjestys on:

1. Hero.
2. Bestseller.
3. Product recommendation quiz.
4. Story timeline.
5. Creator results.
6. Usage guide preview.
7. Reviews.
8. FAQ.
9. Simple footer.

Hero ei sisällä quiz-teaseria. Etusivulla on vain yksi tuotesuosittelija, bestseller on pienempi editorial-osio ja vanha ennen-jälkeen-osio sekä tarvepohjainen tuotevalitsin on poistettu etusivulta.

Bestseller-valinta on tuotekohtaisesti konfiguroitavissa tiedostossa `data/products.ts` kentällä:

```ts
featuredSpotlight: true
```

Nykyinen spotlight-tuote on Texture Wax / Shopify Hair wax.

### Placeholder-kuvat

Etusivun editorial-kuvat ovat selkeästi nimettyjä placeholder-tiedostoja, jotka voi korvata oikeilla kuvilla ilman layout-muutoksia:

```txt
public/images/hero/hero-barber.jpg
public/images/story/story-chair.jpg
public/images/story/story-testing.jpg
public/images/story/article-screenshot.jpg
public/kostiartikkeli.png
public/images/story/story-products.jpg
public/images/story/story-finished-look.jpg
public/images/looks/fluffy-hair.jpg
public/images/looks/messy-texture.jpg
public/images/looks/clean-finish.jpg
public/images/looks/natural-volume.jpg
public/images/creators/creator-01.jpg
public/images/creators/creator-02.jpg
public/images/creators/creator-03.jpg
public/images/creators/creator-04.jpg
public/images/creators/creator-05.jpg
public/images/creators/creator-06.jpg
public/images/routines/fluffy-hair.jpg
public/images/routines/messy-texture.jpg
public/images/routines/clean-finish.jpg
```

Nykyinen story-toteutus käyttää vakaita SVG- ja CSS-placeholder-kuvia, jotta layout ei rikkoudu ennen oikeaa kuva-aineistoa. Kun oikeat JPG-kuvat lisätään, päivitä vastaavat polut komponentissa `components/story/StoryTimeline.tsx`. Tuotekuvat säilyvät kansiossa `public/images/products/`.

### Timeline ja creator results

Homepage-timeline näyttää kolme vaihetta: parturituolissa, testaus ja media. Desktopissa timeline on yksirivinen vaakarakenne. Rakenne käyttää scroll-progress-viivaa, aktiivista node-tilaa sekä kevyitä hover-, focus- ja reveal-tiloja ilman uusia animaatiokirjastoja.

Mobiilissa rakenne vaihtuu vasemman reunan pystyviivaksi, jotta teksti ja kuvat pysyvät luettavina ilman vaakaskrollia. Vaiheet ovat klikattavia ja näppäimistöllä fokusoitavia, ja `prefers-reduced-motion` pitää liikkeen hillittynä.

Median artikkelipaikka on timeline-rakenteen sisällä. Korvaa placeholder lisäämällä artikkelikuva polkuun:

```txt
public/images/story/article-screenshot.jpg
```

Timeline-osuuden alla on lisäksi hillitty Helsingin Sanomien media feature -nosto, joka jatkaa samaa tummaa story-visuaalisuutta. Se käyttää kuvaa:

```txt
public/kostiartikkeli.png
```

Artikkelin CTA avautuu uuteen välilehteen osoitteeseen:

```txt
https://www.hs.fi/feature/art-2000011750703.html
```

Etusivun tuotesuosittelija on sijoitettu samaan tummaan story-osioon suoraan Helsingin Sanomien feature-noston alle. Homepagella kyselyn erillinen intro-otsikko on tarkoituksella piilotettu, jotta näkyviin jää vain varsinainen kyselykortti.

Creator results -osio löytyy komponentista `components/creators/CreatorResults.tsx`. Se käyttää kuutta creator-kuvaa poluissa:

```txt
public/images/creators/creator-01.jpg
public/images/creators/creator-02.jpg
public/images/creators/creator-03.jpg
public/images/creators/creator-04.jpg
public/images/creators/creator-05.jpg
public/images/creators/creator-06.jpg
```

Nykyiset creator-kuvat ovat vakaita premium-placeholder-kuvia. Korvaa ne saman nimisillä JPG-kuvilla, kun oikeat creator-kuvat ovat valmiit. Osion `800+`-laskuri käynnistyy kerran, kun osio tulee näkyviin, ja näyttää arvon heti, jos käyttäjä suosii vähennettyä liikettä.

Creatorien tuotteet mapataan olemassa oleviin `Product`-olioihin joko tuotteen `slug`-arvolla tai Shopify-handlella, joten dataan ei luoda duplikaattituotteita. Tuoterivit käyttävät samaa Shopify Storefront Web Components -ostoskoripolkua kuin muut product card -painikkeet: live-hinta, `Lisää ostoskoriin` ja `Loppuunmyyty`-tila tulevat olemassa olevasta integraatiosta.

### Sosiaaliset linkit

Hero ja footer käyttävät näitä linkkejä:

```txt
Linktree: https://linktr.ee/kostilehtonen
Instagram: https://instagram.com
TikTok: https://tiktok.com
```

Instagram- ja TikTok-URL:t ovat placeholder-arvoja, jos tarkat tilikohtaiset osoitteet eivät ole vielä tiedossa. Vaihda ne komponentteihin `components/home/EditorialHomePage.tsx` ja `components/layout/Footer.tsx`.

### Päänavigaatio ja reitit

Päänavigaatiossa näytetään vain:

```txt
/
/tuotteet
/kayttoohjeet
```

Dynaamiset tuotesivut säilyvät muodossa `/tuotteet/[slug]`. Vanhat `/tarina` ja `/rutiinit` voivat olla olemassa, mutta niitä ei enää linkitetä päänavigaatiossa tai etusivun pääpolkuna.

Navigaation ja footerin näkyvä label käyttöohjesivulle on `Tutoriaalit`, mutta reitti pysyy muodossa `/kayttoohjeet`.

### Etusivun yhteisö ja tutoriaalikortti

Etusivun yhteisöosion otsikossa on animoitu `800+`-laskuri ilman verified-ikonia. Osio pysyy kevyenä community/feed-nostona.

Etusivun tutoriaalit-osio on yksi featured recipe card komponentissa `components/home/EditorialHomePage.tsx`. Osio käyttää tummaa taustaa, jotta se erottuu community-osiosta premium-editoriaalisena tutoriaalilukuna. Kortti nostaa esiin `Messy Textured Crop` -tutoriaalin yhteisestä datasta ja vie CTA:n edelleen reitille `/kayttoohjeet`.

Tutoriaalien yhteinen data sijaitsee tiedostossa `data/tutorials.ts`. Sama data ohjaa `/kayttoohjeet`-sivun neljää tutorial-korttia, etusivun kuukausittaista tutoriaalikorttia, tuotekartoitusta ja bundle-CTA:ta.

Tutoriaalisivun bundle-painike lisää kyseisen tyylin kaikki Shopify-tuotteet olemassa olevaan yhteiseen ostoskoriin käyttäen tuotteiden omia `shopify-context`-variantti- ja saatavuustietoja. Jos koko paketti ei ole saatavilla, bundle-CTA jää pois käytöstä ja yksittäiset saatavilla olevat tuotteet voi edelleen lisätä omista korteistaan.

Tutoriaalien ennen/jälkeen-kuvapolut:

```txt
public/images/tutorials/fluffy-fringe-before.jpg
public/images/tutorials/fluffy-fringe-after.jpg
public/images/tutorials/messy-textured-crop-before.jpg
public/images/tutorials/messy-textured-crop-after.jpg
public/images/tutorials/soft-curtains-before.jpg
public/images/tutorials/soft-curtains-after.jpg
public/images/tutorials/clean-slick-back-before.jpg
public/images/tutorials/clean-slick-back-after.jpg
```

Jos tiedosto puuttuu, komponentti näyttää rikkinäisen kuvan sijaan vakaan visuaalisen placeholderin. Korvaa placeholder lisäämällä JPG samaan polkuun ja asettamalla kyseisen tutorialin `imagesAvailable` arvoksi `true` tiedostossa `data/tutorials.ts`.

### Etusivun FAQ

Etusivun FAQ-osio löytyy komponentista `components/faq/FaqSection.tsx`. Se näytetään palautteiden jälkeen ja ennen footeria. Osio käyttää kompaktia accordion-rakennetta: kysymykset ovat suljettuina oletuksena, yksi vastaus avautuu kerrallaan ja avoimen kysymyksen voi sulkea uudelleen.

### Etusivun palautekuvat

Trust-osion review-korteissa on pienet asiakaskuvapaikat kortin alaosassa. Korvaa placeholderit lisäämällä kuvat näihin polkuihin:

```txt
public/images/reviews/review-01.jpg
public/images/reviews/review-02.jpg
public/images/reviews/review-03.jpg
public/images/reviews/review-04.jpg
```

Jos tiedostoja ei ole vielä lisätty, kortit näyttävät vakaat neutraalit placeholderit ilman rikkoutuneita kuvia.

## Shopify Storefront Web Components

Sivusto käyttää Shopifyn virallisia Storefront Web Components -komponentteja Buy Button -upotusten sijaan. Globaali scripti, kaupan asetukset ja yksi jaettu ostoskori löytyvät komponentista `components/shopify/ShopifyStorefront.tsx`.

Shopify-kauppa:

```txt
https://1izjtx-i8.myshopify.com
```

Integraatio ei käytä access tokenia tässä vaiheessa. Tuote yhdistetään Shopifyyn julkisella product handlella, joka lisätään normaalisti tiedostoon `data/products.ts` kenttään:

```ts
shopifyHandle: "hair-wax"
```

Nykyiset mock-tuotteet toimivat edelleen fallback-sisältönä. Vanhat Buy Button -kentät, kuten `shopifyProductId`, `shopifyEmbedCode` ja `shopifyContainerId`, ovat vain yhteensopivuutta varten eikä uusia tuotteita pidä liittää embed-koodilla.

Shopifyn tuotekohtainen saatavuus ohjaa ostamisen tilaa automaattisesti. Jos valittu tai ensimmäinen saatavilla oleva variantti ei ole ostettavissa, tuote pysyy näkyvissä sivustolla, mutta painikkeessa lukee `Loppuunmyyty` eikä tuotetta voi lisätä ostoskoriin. Varastosaldot ja myyntikelpoisuus hallitaan Shopify Adminissa.

### Uuden Shopify-tuotteen liittäminen

1. Luo tuote Shopifyssa.
2. Aseta tuote Active-tilaan.
3. Varmista, että tuote on julkisesti saatavilla storefrontissa.
4. Avaa tuotteen Shopify-URL.
5. Kopioi handle URL-osoitteesta:
   `/products/hair-wax`
   -> handle: `hair-wax`
6. Lisää handle vastaavaan tuotteeseen tiedostossa `data/products.ts`:
   `shopifyHandle: "hair-wax"`
7. Aja:
   `npm run build`
8. Testaa:
   product card -> Lisää ostoskoriin -> Ostoskori -> Siirry kassalle

Headless-kanava ja julkinen Storefront API access token kannattaa lisätä vasta myöhemmin, jos projekti tarvitsee ominaisuuksia kuten tarkka varastosaldo, custom-tuotedata tai oma Storefront API -kyselylogiikka.

### Nykyiset Shopify-handlet

```txt
Leave in conditioner: leave-in-conditioner
Texture spray: texture-spray
Hair glaze: hair-glaze
Sea salt spray: sea-salt-spray
Volume Powder: volume-powder
Texture Wax / Shopify Hair wax: hair-wax
```

## Tuotesuosittelija

Etusivulla on yksi kompakti hiustuotekysely komponentissa `components/quiz/HairProductQuiz.tsx`. Kysely näkyy tummassa story-osiossa Helsingin Sanomien feature-noston alla ilman erillistä homepage-introa. Kyselyn logiikka, sähköpostivaihe, tulokset ja Shopify-ostopolku ovat ennallaan.

Jokaisella tuotteella on `recommendationProfile`, jonka kentät kuvaavat tuotteen sopivuutta eri tavoitteisiin:

- `volume`
- `texture`
- `hold`
- `shine`
- `moisture`
- `smoothing`
- `fineHair`
- `thickHair`
- `wavyCurlyHair`
- `finish`
- `primaryUse`
- `recommendationText`

Pisteytys löytyy tiedostosta `lib/recommendations.ts`. Se muodostaa käyttäjän vastauksista tavoiteprofiilin, laskee tuotteille painotetun samankaltaisuuspisteen ja näyttää yhden parhaan tuotteen sekä kaksi muuta sopivaa tuotetta. Paras tuote näytetään aina `100 %` matchina, ja muut suhteutetaan parhaaseen tulokseen alle `100 %` näkyvällä arvolla.

Tuloksissa sisäisiä pisteitä tai profiiliarvoja ei näytetä asiakkaalle. Julkisessa UI:ssa näkyy vain normalisoitu match-prosentti, tuote, Shopify-livehinta ja ostotoiminto.

Personoitu selitys luodaan paikallisesti tiedostossa `lib/recommendationReason.ts`. Se käyttää determinististä template-logiikkaa käyttäjän vastausten, top-tuotteen ja tuotteen suositusprofiilin perusteella. Toteutus ei käytä AI API:a eikä ulkoisia palveluita.

Neljän kysymyksen jälkeen kysely näyttää erillisen sähköpostiaskeleen ennen tuloksia. Käyttäjä voi syöttää sähköpostin ja valita halutessaan erillisen markkinointisuostumuksen, tai siirtyä tuloksiin ilman sähköpostia painikkeella `Ei kiitos`. Markkinointisuostumus on aina vapaaehtoinen, tallennetaan erillisenä boolean-arvona eikä checkboxia esitäytetä.

Sähköpostin tallennus käyttää `POST /api/newsletter` -reittiä, jos Shopify Admin -asetukset on määritetty. Jos integraatiota ei ole konfiguroitu kehitysympäristöön, kysely päästää käyttäjän silti tuloksiin eikä väitä, että sähköposti olisi lähetetty tai tallennettu. Jos Shopify ilmoittaa tuotteen loppuunmyydyksi, tuote voi silti näkyä suosituksissa, mutta Storefront Web Components näyttää painikkeessa `Loppuunmyyty` eikä tuotetta voi lisätä ostoskoriin.

## Newsletter API

Sähköpostin tallennus tapahtuu server-side API-reitin kautta:

```txt
POST /api/newsletter
```

Toteutus löytyy tiedostosta `app/api/newsletter/route.ts`. Selain ei koskaan kutsu Shopify Admin API:a suoraan.

Tarvittavat ympäristömuuttujat:

```bash
SHOPIFY_STORE_DOMAIN=1izjtx-i8.myshopify.com
SHOPIFY_CLIENT_ID=...
SHOPIFY_CLIENT_SECRET=...
```

Shopify custom app tarvitsee oikeudet:

```txt
read_customers
write_customers
```

Admin API -tunnukset ovat salaisuuksia. Älä käytä `NEXT_PUBLIC_`-prefiksiä, älä lisää tunnuksia selaimen koodiin, äläkä commitoi niitä repositorioon.

Kun tunnuksia ei ole määritetty, sivusto ja build toimivat edelleen. Kysely näyttää tulokset normaalisti, mutta sähköpostilomakkeen lähetys palauttaa kehitysympäristöön selkeän Shopify-konfiguraatiovirheen.

### Testaus ilman Shopify Admin -tunnuksia

1. Aja `npm run dev`.
2. Avaa etusivu.
3. Tee tuotekysely loppuun.
4. Varmista, että sähköpostiaskeleen `Ei kiitos` näyttää suositukset ilman sähköpostia.
5. Lähetä sähköpostilomake testiosoitteella.
6. Varmista, että lomake etenee tuloksiin ja näyttää kehitysympäristön konfiguraatiohuomion, vaikka Shopify Admin -tunnuksia ei ole.

### Testaus Shopify-tunnuksilla

1. Luo Shopify custom app ja anna sille oikeudet `read_customers` ja `write_customers`.
2. Lisää ympäristömuuttujiin `SHOPIFY_STORE_DOMAIN`, `SHOPIFY_CLIENT_ID` ja `SHOPIFY_CLIENT_SECRET`.
3. Käynnistä sovellus uudelleen.
4. Tee kysely ja lähetä sähköpostilomake ilman markkinointisuostumusta.
5. Varmista Shopify Adminin Customers-näkymästä, että asiakas on luotu ja tageina näkyvät `hair-quiz` sekä `quiz-top-{handle}`.
6. Varmista, että markkinointisuostumus ei ole `SUBSCRIBED`, jos checkboxia ei valittu.
7. Tee testi uudella sähköpostilla ja valitse markkinointisuostumus.
8. Varmista Shopify Adminissa, että email marketing consent on `SUBSCRIBED`.

## Testaus

Perusbuild:

```bash
npm run build
```

Mobiilitestaus:

1. Aja `npm run dev`.
2. Avaa `http://localhost:3000`.
3. Tarkista viewportit 320 px, 375 px, 390 px, 430 px ja noin 768 px.
4. Tarkista hero, bestseller, quiz, timeline, community, tutoriaalit-kortti, reviews, footer ja Shopify cart.
5. Tarkista myös `/tuotteet`, `/kayttoohjeet` ja vähintään yksi `/tuotteet/[slug]`-sivu.
6. Varmista, että headerin cart-ikoni avaa saman Shopify-ostoskorin ja että checkout-linkki osoittaa Shopifyyn.
7. Shopify Adminissa hallittu varasto ohjaa `Loppuunmyyty`-tilaa automaattisesti. Tuote jää näkyviin, mutta sitä ei voi lisätä ostoskoriin, jos Shopify ilmoittaa variantin unavailable-tilaan.

## Bestseller-kuvat

Etusivun bestseller-galleria käyttää tällä hetkellä olemassa olevia vakaita kuvia, jotta sivulle ei tule rikkinäisiä kuvaelementtejä. Kun Texture Waxille lisätään omat tuotekuvat, suositellut polut ovat:

- `public/images/products/hair-wax/main.jpg`
- `public/images/products/hair-wax/detail.jpg`
- `public/images/products/hair-wax/texture.jpg`
- `public/images/products/hair-wax/styled-look.jpg`

## Shopify hallinnoi

- tuotteet
- hinnat
- varaston
- alennukset
- ostoskorin
- checkoutin
- maksut
- tilaukset

## Sivusto hallinnoi

- brändisivun rakenteen
- navigaation ja footerin
- etusivun sisältöosiot
- tuotelistausnäkymän
- dynaamiset tuotesivut
- käyttöohjesivun
- mock-datan ja placeholder-kuvat
- Shopify product handle -liitokset
