export type ProductListCategory = "Volyymi" | "Tekstuuri" | "Viimeistely" | "Hoito";

export type ProductListItem = {
  handle: string;
  categories: ProductListCategory[];
  tags: string[];
  headline: string;
  problemHeading: string;
  problemCopy: string;
  benefits: string[];
  suitableForHeading: string;
  suitableForCopy: string;
  usageHeading: string;
  usageCopy: string;
};

export const productFilterLabels = ["Kaikki tuotteet", "Volyymi", "Tekstuuri", "Viimeistely", "Hoito"] as const;
export type ProductFilter = (typeof productFilterLabels)[number];

export const productSortOptions = [
  { value: "recommended", label: "Suositellut" },
  { value: "price-asc", label: "Hinta: edullisin ensin" },
  { value: "price-desc", label: "Hinta: kallein ensin" },
  { value: "name-asc", label: "Nimi: A–Ö" }
] as const;

export type ProductSort = (typeof productSortOptions)[number]["value"];

export const recommendedProductOrder = [
  "texture-spray",
  "sea-salt-spray",
  "hair-wax",
  "volume-powder",
  "leave-in-conditioner",
  "hair-glaze"
] as const;

export const productListItems: ProductListItem[] = [
  {
    handle: "texture-spray",
    categories: ["Volyymi", "Tekstuuri"],
    tags: ["HYVÄ ENSIMMÄINEN TUOTE", "PÄIVITTÄISEEN KÄYTTÖÖN"],
    headline: "Kevyttä rakennetta ja volyymia ilman tahmeaa tunnetta.",
    problemHeading: "Kun hiukset latistuvat liian helposti.",
    problemCopy:
      "Hiukset voivat näyttää aamulla hyvältä mutta menettää muotonsa nopeasti. Texture Spray tekee muotoilusta helpompaa ja antaa hiuksille luonnollista ryhtiä ilman raskasta tuotetuntumaa.",
    benefits: ["Lisää ilmavaa rakennetta", "Helpottaa hiusten muotoilua", "Säilyttää luonnollisen tuntuman"],
    suitableForHeading: "Kenelle tämä sopii?",
    suitableForCopy:
      "Kun haluat yhden helpon tuotteen päivittäiseen käyttöön tai tarvitset kevyen pohjan ennen föönausta.",
    usageHeading: "Käytä näin",
    usageCopy: "Suihkuta pyyhekuiviin tai kuiviin hiuksiin ja työstä sormilla. Föönaa, kun haluat lisää volyymia."
  },
  {
    handle: "sea-salt-spray",
    categories: ["Tekstuuri", "Volyymi"],
    tags: ["RENTO RAKENNE"],
    headline: "Rouheampaa tekstuuria ja ilmavaa beach hair -fiilistä.",
    problemHeading: "Kun hiukset tuntuvat liian sileiltä.",
    problemCopy:
      "Liian pehmeisiin tai liukkaisiin hiuksiin on vaikea saada rentoa rakennetta. Sea Salt Spray lisää sopivasti karheutta ja tekee huolettomasta tyylistä helpommin rakennettavan.",
    benefits: [
      "Lisää rouheaa tekstuuria",
      "Toimii erityisen hyvin föönauksen alla",
      "Tekee rennosta tyylistä helpomman rakentaa"
    ],
    suitableForHeading: "Kenelle tämä sopii?",
    suitableForCopy: "Kun tavoitteena on fluffy fringe, messy hair tai luonnollisen huoleton lopputulos.",
    usageHeading: "Käytä näin",
    usageCopy:
      "Suihkuta kosteisiin hiuksiin erityisesti etuhiuksiin ja tyveen. Puristele hiuksia ja föönaa haluttuun muotoon."
  },
  {
    handle: "hair-wax",
    categories: ["Tekstuuri", "Viimeistely"],
    tags: ["PARTURIN VALINTA VIIMEISTELYYN"],
    headline: "Muotoiltavaa pitoa ja eroteltua rakennetta ilman kovaa tunnetta.",
    problemHeading: "Kun tyyli kaipaa viimeisen silauksen.",
    problemCopy:
      "Saat hiukset lähes oikeaan muotoon, mutta lopputulos hajoaa päivän aikana tai näyttää liian pehmeältä. Texture Wax auttaa viimeistelemään tyylin hallitusti ilman jäykkää vaikutelmaa.",
    benefits: ["Auttaa erottelemaan latvoja", "Pitää tyylin hallittuna", "Säilyttää hiusten luonnollisen liikkeen"],
    suitableForHeading: "Kenelle tämä sopii?",
    suitableForCopy:
      "Kun haluat viimeistellä messy cropin, taper-tyylin tai muun kampauksen, jossa tarvitaan rakennetta ja hallintaa.",
    usageHeading: "Käytä näin",
    usageCopy: "Lämmitä pieni määrä vahaa käsissä ja lisää erityisesti latvoihin. Aloita vähällä määrällä ja lisää tarvittaessa."
  },
  {
    handle: "volume-powder",
    categories: ["Volyymi"],
    tags: ["TYVEN NOSTO"],
    headline: "Nopea tapa nostaa hiukset irti tyvestä.",
    problemHeading: "Kun hiukset painuvat päivän aikana alas.",
    problemCopy:
      "Latistuvat hiukset saavat kampauksen näyttämään nopeasti väsyneeltä. Volume Powder antaa tyveen nostetta juuri sinne, missä sitä tarvitaan.",
    benefits: ["Lisää nopeasti volyymia", "Toimii erityisesti latistuviin hiuksiin", "Pieni määrä riittää pitkälle"],
    suitableForHeading: "Kenelle tämä sopii?",
    suitableForCopy: "Kun haluat ilmavamman lopputuloksen tai nopean korjauksen kesken päivän.",
    usageHeading: "Käytä näin",
    usageCopy: "Lisää pieni määrä kuiviin hiuksiin tyveen. Hiero kevyesti sormilla ja nosta hiukset haluttuun asentoon."
  },
  {
    handle: "leave-in-conditioner",
    categories: ["Hoito"],
    tags: ["HOITAVA POHJA"],
    headline: "Pehmeyttä ja helpompaa muotoiltavuutta ilman raskasta tunnetta.",
    problemHeading: "Kun hiukset eivät asetu siististi.",
    problemCopy:
      "Kuivat tai karheat hiukset voivat näyttää pörröisiltä ja tuntua vaikeilta muotoilla. Leave-in Conditioner tekee pohjasta pehmeämmän ja auttaa muita tuotteita toimimaan paremmin.",
    benefits: ["Auttaa pörröisyyteen", "Tekee hiuksista helpommin muotoiltavat", "Sopii myös päivittäiseen käyttöön"],
    suitableForHeading: "Kenelle tämä sopii?",
    suitableForCopy: "Kun hiukset tuntuvat kuivilta, karheilta tai vaikeasti hallittavilta ennen muotoilua.",
    usageHeading: "Käytä näin",
    usageCopy:
      "Levitä pieni määrä kosteisiin hiuksiin, erityisesti pituuksiin ja latvoihin. Vältä käyttämästä liikaa suoraan tyveen."
  },
  {
    handle: "hair-glaze",
    categories: ["Viimeistely", "Hoito"],
    tags: ["VIIMEISTELY"],
    headline: "Kevyttä kiiltoa ja sileämpää pintaa ilman märkää geelifinistä.",
    problemHeading: "Kun haluat siistimmän ja tarkoituksellisemman lookin.",
    problemCopy:
      "Kaikki tyylit eivät tarvitse rouheaa tekstuuria. Hair Glaze auttaa silottamaan pintaa ja tekee kampauksesta huolitellumman ilman kovaa tai raskasta vaikutelmaa.",
    benefits: ["Silottaa hiusten pintaa", "Lisää hillitysti kiiltoa", "Tekee lopputuloksesta viimeistellymmän"],
    suitableForHeading: "Kenelle tämä sopii?",
    suitableForCopy: "Kun tavoitteena on clean slick back, siistimpi jakaus tai hallittu viimeistely.",
    usageHeading: "Käytä näin",
    usageCopy: "Levitä pieni määrä kosteisiin tai kuiviin hiuksiin. Kampaa tai muotoile sormilla haluttuun suuntaan."
  }
];
