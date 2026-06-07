export type Routine = {
  id: string;
  slug: string;
  name: string;
  result: string;
  description: string;
  bestFor: string;
  image: string;
  video: string;
  products: string[];
  steps: string[];
  stylingTime: string;
  bundleShopifyProductId: string;
  bundleShopifyEmbedCode: string;
  bundleShopifyContainerId: string;
};

export const routines: Routine[] = [
  {
    id: "fluffy-hair",
    slug: "fluffy-hair",
    name: "Fluffy Hair",
    result: "Ilmava, runsas ja luonnollisen näköinen kampaus.",
    description:
      "Kun hiukset tuntuvat litteiltä, tämä rutiini rakentaa tyveen nostoa ja hiuksiin kevyttä liikettä.",
    bestFor: "Ohuet, laskeutuvat tai helposti päätä vasten painuvat hiukset.",
    image: "/images/hero/hero-transformation.png",
    video: "/images/routines/social-routine.png",
    products: ["texture-spray", "volume-powder"],
    steps: [
      "Suihkuta Texture Spray kosteisiin tai kuiviin hiuksiin.",
      "Muotoile hiukset käsin tai föönillä.",
      "Lisää pieni määrä Volume Powderia tyveen."
    ],
    stylingTime: "3-5 min",
    bundleShopifyProductId: "mock-bundle-fluffy-hair",
    bundleShopifyEmbedCode: "",
    bundleShopifyContainerId: "shopify-bundle-fluffy-hair"
  },
  {
    id: "messy-texture",
    slug: "messy-texture",
    name: "Messy Texture",
    result: "Rento ja eroteltu rakenne ilman jäykkää tunnetta.",
    description:
      "Rutiini toimii, kun haluat hiuksiin huolettoman tekstuurin ja pitoa, jota voi muotoilla uudelleen.",
    bestFor: "Rennot otsahiukset, luonnollinen liike ja eroteltu viimeistely.",
    image: "/images/routines/social-routine.png",
    video: "/images/routines/social-routine.png",
    products: ["salt-spray", "texture-wax"],
    steps: [
      "Lisää Salt Spray hiuksiin.",
      "Muotoile ja anna kuivua tai käytä fööniä.",
      "Viimeistele pienellä määrällä Texture Waxia."
    ],
    stylingTime: "4-6 min",
    bundleShopifyProductId: "mock-bundle-messy-texture",
    bundleShopifyEmbedCode: "",
    bundleShopifyContainerId: "shopify-bundle-messy-texture"
  },
  {
    id: "clean-finish",
    slug: "clean-finish",
    name: "Clean Finish",
    result: "Huoliteltu, pehmeä ja hallittu viimeistely.",
    description:
      "Kun hiukset kaipaavat pehmeyttä ja siistimpää pintaa, tämä rutiini pitää kokonaisuuden selkeänä.",
    bestFor: "Kuivat, karheat tai hankalasti hallittavat hiukset.",
    image: "/images/story/kosti-barber.png",
    video: "/images/routines/social-routine.png",
    products: ["leave-in-conditioner", "hair-glaze"],
    steps: [
      "Levitä pieni määrä Leave-in Conditioneria.",
      "Lisää Hair Glaze viimeistelyyn.",
      "Muotoile haluamasi siisti kampaus."
    ],
    stylingTime: "2-4 min",
    bundleShopifyProductId: "mock-bundle-clean-finish",
    bundleShopifyEmbedCode: "",
    bundleShopifyContainerId: "shopify-bundle-clean-finish"
  }
];

export function getRoutineByName(name: string) {
  return routines.find((routine) => routine.name === name);
}
