export type ProductCategory = "Volyymi" | "Rakenne" | "Viimeistely" | "Hoito";

export type ProductReview = {
  name: string;
  rating: number;
  text: string;
};

export type ProductRecommendationProfile = {
  volume: number;
  texture: number;
  hold: number;
  shine: number;
  moisture: number;
  smoothing: number;
  fineHair: number;
  thickHair: number;
  wavyCurlyHair: number;
  finish: "matte" | "natural" | "shiny";
  primaryUse: string;
  recommendationText: string;
};

export type Product = {
  id: string;
  slug: string;
  name: string;
  category: ProductCategory;
  shortDescription: string;
  longDescription: string;
  problem: string;
  promise: string;
  price: string;
  images: string[];
  benefits: string[];
  bestFor: string[];
  notIdealFor: string[];
  howToUse: string[];
  amountToUse: string;
  usePhase: string;
  hairState: string;
  ingredients: string;
  reviews: ProductReview[];
  recommendedProducts: string[];
  relatedRoutine: string;
  badge: string;
  tags: string[];
  shopifyHandle?: string;
  shopifyProductId?: string;
  shopifyEmbedCode?: string;
  shopifyContainerId?: string;
  recommendationProfile: ProductRecommendationProfile;
  featuredSpotlight?: boolean;
};

const baseReviews: ProductReview[] = [
  {
    name: "Aleksi",
    rating: 5,
    text: "Lopputulos näyttää paremmalta, mutta hiukset eivät tunnu täyteen laitetuilta."
  },
  {
    name: "Eetu",
    rating: 5,
    text: "Helppo käyttää myös kiireessä. Pieni määrä riittää."
  }
];

export const products: Product[] = [
  {
    id: "texture-spray",
    slug: "texture-spray",
    name: "Texture Spray",
    category: "Rakenne",
    shortDescription: "Kevyttä tekstuuria ja volyymia ilman tahmeaa tunnetta.",
    longDescription:
      "Texture Spray tekee hiuksista helpommin muotoiltavat ja antaa niihin luonnollista rakennetta. Se sopii arkeen, föönauksen tueksi ja nopeaan viimeistelyyn.",
    problem: "Kaipaavatko hiuksesi lisää rakennetta?",
    promise: "Kevyttä rakennetta ja volyymia ilman tahmeaa tunnetta.",
    price: "24,90 €",
    images: [
      "/images/products/texture-spray.svg",
      "/images/products/product-lineup.png",
      "/images/routines/social-routine.png"
    ],
    benefits: ["Tekee hiuksista helpommin muotoiltavat", "Lisää kevyttä volyymia", "Ei jätä tahmeaa tunnetta"],
    bestFor: ["Ohuille tai litteille hiuksille", "Rennolle otsahiustyylille", "Päivittäiseen muotoiluun"],
    notIdealFor: ["Erittäin sileään tai kiiltävään kampaukseen", "Kun haet vahvaa vahamaista pitoa"],
    howToUse: [
      "Suihkuta kosteisiin tai kuiviin hiuksiin.",
      "Muotoile sormilla tai föönillä haluttuun suuntaan.",
      "Lisää lopuksi pieni määrä, jos haluat enemmän rakennetta."
    ],
    amountToUse: "3-6 suihkausta hiusten pituuden ja paksuuden mukaan.",
    usePhase: "Ennen föönausta tai kuivien hiusten viimeistelyyn.",
    hairState: "Kosteisiin tai kuiviin hiuksiin.",
    ingredients: "Aqua, Alcohol Denat., VP/VA Copolymer, Sea Salt, Panthenol, Parfum.",
    reviews: baseReviews,
    recommendedProducts: ["volume-powder", "texture-wax"],
    relatedRoutine: "Fluffy Hair",
    badge: "Myydyin",
    tags: ["Luonnollinen lopputulos", "Päivittäiseen käyttöön", "Parturin kehittämä"],
    shopifyHandle: "texture-spray",
    shopifyProductId: "mock-texture-spray",
    shopifyEmbedCode: "",
    shopifyContainerId: "shopify-texture-spray",
    recommendationProfile: {
      volume: 65,
      texture: 90,
      hold: 45,
      shine: 10,
      moisture: 15,
      smoothing: 10,
      fineHair: 75,
      thickHair: 65,
      wavyCurlyHair: 70,
      finish: "natural",
      primaryUse: "Kevyt tekstuuri",
      recommendationText: "Vaivattomaan tekstuuriin ja rentoon lookiin."
    }
  },
  {
    id: "volume-powder",
    slug: "volume-powder",
    name: "Volume Powder",
    category: "Volyymi",
    shortDescription: "Nopea tapa saada lisää ryhtiä ja ilmavuutta erityisesti hiusten tyveen.",
    longDescription:
      "Volume Powder nostaa tyveä ja antaa kampaukselle kuivaa, kevyttä pitoa. Se on pieni tuote isoon muutokseen silloin, kun hiukset tuntuvat litteiltä.",
    problem: "Tuntuvatko hiuksesi litteiltä?",
    promise: "Ilmavuutta tyveen muutamassa sekunnissa.",
    price: "21,90 €",
    images: [
      "/images/products/volume-powder.svg",
      "/images/products/product-lineup.png",
      "/images/hero/hero-transformation.png"
    ],
    benefits: ["Nostaa tyveä nopeasti", "Antaa kuivaa tekstuuria", "Helppo lisätä päivän aikana"],
    bestFor: ["Litteille hiuksille", "Tyven nostoon", "Fluffy Hair -tyyleihin"],
    notIdealFor: ["Erittäin kiiltävään viimeistelyyn", "Kun hiuksissa on jo paljon tuotetta"],
    howToUse: [
      "Ripottele pieni määrä suoraan tyveen.",
      "Hieronta kevyesti sormilla hiusten sekaan.",
      "Lisää vain vähän kerrallaan, jotta lopputulos pysyy luonnollisena."
    ],
    amountToUse: "Hyvin pieni ripaus tyveen. Lisää tarvittaessa.",
    usePhase: "Kuivien hiusten viimeistelyyn.",
    hairState: "Kuiviin hiuksiin.",
    ingredients: "Silica Silylate, Tapioca Starch, Kaolin, Parfum.",
    reviews: [
      {
        name: "Eetu",
        rating: 5,
        text: "Volume Powder jäi päivittäiseen käyttöön. Hiukset pysyvät ilmavina ilman kypärämäistä tunnetta."
      },
      ...baseReviews.slice(0, 1)
    ],
    recommendedProducts: ["texture-spray", "salt-spray"],
    relatedRoutine: "Fluffy Hair",
    badge: "Tyven nosto",
    tags: ["Volyymi", "Matta", "Nopea käyttää"],
    shopifyHandle: "volume-powder",
    shopifyProductId: "mock-volume-powder",
    shopifyEmbedCode: "",
    shopifyContainerId: "shopify-volume-powder",
    recommendationProfile: {
      volume: 100,
      texture: 70,
      hold: 55,
      shine: 0,
      moisture: 0,
      smoothing: 0,
      fineHair: 100,
      thickHair: 45,
      wavyCurlyHair: 35,
      finish: "matte",
      primaryUse: "Maksimaalinen volyymi",
      recommendationText: "Ohuille ja helposti latistuville hiuksille."
    }
  },
  {
    id: "salt-spray",
    slug: "salt-spray",
    name: "Salt Spray",
    category: "Rakenne",
    shortDescription: "Luonnollista karheutta ja rakennetta huolettomaan kampaukseen.",
    longDescription:
      "Salt Spray tuo hiuksiin rentoa karheutta ja liikettä. Se toimii erityisen hyvin, kun haluat kampauksen näyttävän huolettomalta mutta tarkoituksella tehdyltä.",
    problem: "Haluatko rennomman rantatyylin?",
    promise: "Rento rakenne ilman liian viimeisteltyä tunnetta.",
    price: "22,90 €",
    images: [
      "/images/products/salt-spray.svg",
      "/images/routines/social-routine.png",
      "/images/products/product-lineup.png"
    ],
    benefits: ["Lisää luonnollista karheutta", "Auttaa erottelemaan hiuksia", "Sopii föönin alle"],
    bestFor: ["Rennolle tekstuurille", "Luonnolliselle liikkeelle", "Messy Texture -tyyleihin"],
    notIdealFor: ["Erittäin pehmeään ja sileään viimeistelyyn", "Hyvin kuiville hiuksille ilman hoitavaa tuotetta"],
    howToUse: [
      "Suihkuta pyyhekuiviin hiuksiin.",
      "Puristele hiuksia käsillä tai föönaa kevyesti.",
      "Viimeistele vahalla, jos haluat lisää kontrollia."
    ],
    amountToUse: "4-7 suihkausta hiusten paksuudesta riippuen.",
    usePhase: "Muotoilun pohjalle.",
    hairState: "Parhaiten kosteisiin tai pyyhekuiviin hiuksiin.",
    ingredients: "Aqua, Magnesium Sulfate, Sea Salt, Glycerin, Panthenol, Parfum.",
    reviews: baseReviews,
    recommendedProducts: ["texture-wax", "leave-in-conditioner"],
    relatedRoutine: "Messy Texture",
    badge: "Rento rakenne",
    tags: ["Rakenne", "Beach look", "Luonnollinen"],
    shopifyHandle: "sea-salt-spray",
    shopifyProductId: "mock-salt-spray",
    shopifyEmbedCode: "",
    shopifyContainerId: "shopify-salt-spray",
    recommendationProfile: {
      volume: 80,
      texture: 95,
      hold: 40,
      shine: 5,
      moisture: 5,
      smoothing: 0,
      fineHair: 90,
      thickHair: 60,
      wavyCurlyHair: 80,
      finish: "matte",
      primaryUse: "Volyymi ja rouhea tekstuuri",
      recommendationText: "Beach hair -tyyliin ja ilmavaan tekstuuriin."
    }
  },
  {
    id: "texture-wax",
    slug: "texture-wax",
    name: "Texture Wax",
    category: "Viimeistely",
    shortDescription: "Muotoiltava viimeistely luonnolliseen ja eroteltuun tyyliin.",
    longDescription:
      "Texture Wax antaa hallittavaa pitoa ilman kovaa tai liimamaista tunnetta. Se sopii, kun haluat viimeistellä rakenteen ja pitää kampauksen elävänä.",
    problem: "Tarvitsetko pitoa ilman jäykkyyttä?",
    promise: "Muotoiltavaa pitoa ja eroteltua rakennetta.",
    price: "23,90 €",
    images: [
      "/images/products/texture-wax.svg",
      "/images/products/product-lineup.png",
      "/images/routines/social-routine.png"
    ],
    benefits: ["Antaa luonnollista pitoa", "Erottelee hiuksia", "Uudelleenmuotoiltava päivän aikana"],
    bestFor: ["Lyhyille ja keskipitkille hiuksille", "Messy Texture -tyyleihin", "Luonnolliseen viimeistelyyn"],
    notIdealFor: ["Märkään kiiltävään lookiin", "Erittäin pitkille hiuksille yksinään"],
    howToUse: [
      "Lämmitä pieni määrä tuotetta kämmenissä.",
      "Levitä tasaisesti kuiviin hiuksiin.",
      "Viimeistele yksityiskohdat sormilla."
    ],
    amountToUse: "Herneen kokoinen määrä. Lisää tarvittaessa vähän kerrallaan.",
    usePhase: "Viimeistelyyn.",
    hairState: "Kuiviin hiuksiin.",
    ingredients: "Cera Alba, Kaolin, Copernicia Cerifera Wax, Lanolin, Parfum.",
    reviews: baseReviews,
    recommendedProducts: ["salt-spray", "texture-spray"],
    relatedRoutine: "Messy Texture",
    badge: "Kontrolli",
    tags: ["Pito", "Matta", "Muotoiltava"],
    shopifyHandle: "hair-wax",
    shopifyProductId: "mock-texture-wax",
    shopifyEmbedCode: "",
    shopifyContainerId: "shopify-texture-wax",
    featuredSpotlight: true,
    recommendationProfile: {
      volume: 25,
      texture: 70,
      hold: 90,
      shine: 20,
      moisture: 10,
      smoothing: 60,
      fineHair: 50,
      thickHair: 90,
      wavyCurlyHair: 55,
      finish: "natural",
      primaryUse: "Vahva muotoilu ja pito",
      recommendationText: "Tyylin viimeistelyyn ja pidempään kestävään hallintaan."
    }
  },
  {
    id: "hair-glaze",
    slug: "hair-glaze",
    name: "Hair Glaze",
    category: "Viimeistely",
    shortDescription: "Siisti viimeistely huoliteltuun kampaukseen.",
    longDescription:
      "Hair Glaze tuo hallitun, pehmeän ja hieman kiiltävämmän viimeistelyn. Se toimii silloin, kun haluat kampauksesta siistin ilman raskasta tuntua.",
    problem: "Haluatko hallitumman ja kiiltävämmän lopputuloksen?",
    promise: "Huoliteltu viimeistely ilman kovaa pintaa.",
    price: "25,90 €",
    images: [
      "/images/products/hair-glaze.svg",
      "/images/products/product-lineup.png",
      "/images/story/kosti-barber.png"
    ],
    benefits: ["Silottaa pintaa", "Lisää maltillista kiiltoa", "Auttaa hallitsemaan karheutta"],
    bestFor: ["Siistiin viimeistelyyn", "Kuiville latvoille", "Clean Finish -tyyleihin"],
    notIdealFor: ["Täysin mattaan lookiin", "Runsaan volyymin rakentamiseen yksinään"],
    howToUse: [
      "Ota pieni määrä tuotetta sormenpäihin.",
      "Levitä hiusten pintaan tai latvoihin.",
      "Kampaa tai muotoile sormilla siistiin suuntaan."
    ],
    amountToUse: "Puolikkaan herneen kokoinen määrä riittää useimmille.",
    usePhase: "Viimeistelyyn tai kevyen hoidon päälle.",
    hairState: "Kuiviin tai hieman kosteisiin hiuksiin.",
    ingredients: "Aqua, Cetearyl Alcohol, Glycerin, Dimethicone, Panthenol, Parfum.",
    reviews: baseReviews,
    recommendedProducts: ["leave-in-conditioner", "texture-spray"],
    relatedRoutine: "Clean Finish",
    badge: "Siisti pinta",
    tags: ["Kiilto", "Hallinta", "Pehmeys"],
    shopifyHandle: "hair-glaze",
    shopifyProductId: "mock-hair-glaze",
    shopifyEmbedCode: "",
    shopifyContainerId: "shopify-hair-glaze",
    recommendationProfile: {
      volume: 15,
      texture: 10,
      hold: 15,
      shine: 100,
      moisture: 55,
      smoothing: 95,
      fineHair: 55,
      thickHair: 80,
      wavyCurlyHair: 60,
      finish: "shiny",
      primaryUse: "Kiilto ja silottavuus",
      recommendationText: "Siistiin, kiiltävään ja hallittuun viimeistelyyn."
    }
  },
  {
    id: "leave-in-conditioner",
    slug: "leave-in-conditioner",
    name: "Leave-in Conditioner",
    category: "Hoito",
    shortDescription: "Pehmeyttä ja helpommin hallittavat hiukset ilman raskasta tunnetta.",
    longDescription:
      "Leave-in Conditioner tekee hiuksista pehmeämmät ja helpommin hallittavat. Se sopii erityisesti kuivalle, karhealle tai helposti pörröistyvälle hiukselle.",
    problem: "Tuntuvatko hiuksesi kuivilta tai karheilta?",
    promise: "Pehmeyttä ilman raskasta lopputulosta.",
    price: "24,90 €",
    images: [
      "/images/products/leave-in-conditioner.svg",
      "/images/products/product-lineup.png",
      "/images/story/kosti-barber.png"
    ],
    benefits: ["Pehmentää karheaa tunnetta", "Helpottaa muotoilua", "Ei tee hiuksista raskaita"],
    bestFor: ["Kuiville hiuksille", "Pörröisyyden hallintaan", "Clean Finish -rutiiniin"],
    notIdealFor: ["Kun haluat kuivaa mattatekstuuria", "Erittäin hentoon hiukseen liian suurena määränä"],
    howToUse: [
      "Levitä pieni määrä pyyhekuiviin hiuksiin.",
      "Kampaa tai levitä sormilla tasaisesti.",
      "Jatka muotoilua normaalisti."
    ],
    amountToUse: "Pieni painallus tai herneen kokoinen määrä.",
    usePhase: "Ennen muotoilua tai pesun jälkeen.",
    hairState: "Pyyhekuiviin tai hieman kosteisiin hiuksiin.",
    ingredients: "Aqua, Glycerin, Cetearyl Alcohol, Behentrimonium Chloride, Panthenol, Parfum.",
    reviews: [
      {
        name: "Elias",
        rating: 5,
        text: "Toimii hyvin, koska se ei tee hiuksista raskaita."
      },
      ...baseReviews.slice(0, 1)
    ],
    recommendedProducts: ["hair-glaze", "salt-spray"],
    relatedRoutine: "Clean Finish",
    badge: "Hoito",
    tags: ["Pehmeys", "Hoito", "Kevyt tunne"],
    shopifyHandle: "leave-in-conditioner",
    shopifyProductId: "mock-leave-in-conditioner",
    shopifyEmbedCode: "",
    shopifyContainerId: "shopify-leave-in-conditioner",
    recommendationProfile: {
      volume: 10,
      texture: 10,
      hold: 0,
      shine: 30,
      moisture: 100,
      smoothing: 80,
      fineHair: 55,
      thickHair: 95,
      wavyCurlyHair: 90,
      finish: "natural",
      primaryUse: "Hoito ja kosteutus",
      recommendationText: "Kuiville, pörröisille tai käsitellyille hiuksille."
    }
  }
];

export const productCategories = ["Kaikki", "Volyymi", "Rakenne", "Viimeistely", "Hoito"] as const;

export function getProductBySlug(slug: string) {
  return products.find((product) => product.slug === slug);
}

export function getRecommendedProducts(slugs: string[]) {
  return products.filter((product) => slugs.includes(product.slug));
}
