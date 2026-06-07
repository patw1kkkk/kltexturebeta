import { products, type Product } from "@/data/products";

export type ProductHandle =
  | "sea-salt-spray"
  | "texture-spray"
  | "hair-wax"
  | "volume-powder"
  | "hair-glaze"
  | "leave-in-conditioner";

export type TutorialStep = {
  text: string;
  productHandle?: ProductHandle;
};

export type Tutorial = {
  id: string;
  title: string;
  description: string;
  carouselDescription?: string;
  previewDescription?: string;
  suitableFor: string;
  productHandles: ProductHandle[];
  steps: TutorialStep[];
  previewSteps?: TutorialStep[];
  stylingTip: string;
  beforeImage: string;
  afterImage: string;
  beforeAlt: string;
  afterAlt: string;
  imagesAvailable: boolean;
};

export const tutorialProductCopy: Record<ProductHandle, { benefit: string; displayName: string }> = {
  "sea-salt-spray": {
    displayName: "Sea Salt Spray",
    benefit: "Ilmavaa rakennetta ja rouheaa tekstuuria."
  },
  "volume-powder": {
    displayName: "Volume Powder",
    benefit: "Lisää tyveen volyymia ilman raskasta tunnetta."
  },
  "texture-spray": {
    displayName: "Texture Spray",
    benefit: "Kevyttä rakennetta ja luonnollista liikettä."
  },
  "hair-wax": {
    displayName: "Texture Wax",
    benefit: "Muotoiltavaa pitoa ja eroteltua rakennetta."
  },
  "leave-in-conditioner": {
    displayName: "Leave-in Conditioner",
    benefit: "Pehmeyttä ja helpompaa hallittavuutta."
  },
  "hair-glaze": {
    displayName: "Hair Glaze",
    benefit: "Kevyttä kiiltoa ja sileämpää viimeistelyä."
  }
};

export const tutorials: Tutorial[] = [
  {
    id: "fluffy-fringe",
    title: "Fluffy Fringe",
    description: "Ilmava, runsas ja luonnollisesti liikkuva etuhius ilman raskasta tunnetta.",
    carouselDescription: "Ilmava ja runsas etuhius, jossa rakenne jää luonnollisen rennoksi.",
    suitableFor: "Sopii erityisesti ohuille, normaaleille ja helposti latistuville hiuksille.",
    productHandles: ["sea-salt-spray", "volume-powder"],
    steps: [
      {
        text: "Kastele hiukset kevyesti tai kuivaa ne pyyhekuiviksi."
      },
      {
        text: "Suihkuta Sea Salt Sprayta erityisesti etuhiuksiin ja tyveen. Aloita pienellä määrällä.",
        productHandle: "sea-salt-spray"
      },
      {
        text: "Föönaa hiuksia ylöspäin ja hieman eteenpäin. Nosta etuhiuksia sormilla föönauksen aikana, jotta saat ilmavan muodon."
      },
      {
        text: "Lisää lopuksi pieni määrä Volume Powderia tyveen. Puristele hiuksia kevyesti sormilla ja jätä lopputulos rennoksi.",
        productHandle: "volume-powder"
      }
    ],
    stylingTip:
      "Älä kampaa lopputulosta liian sileäksi. Fluffy Fringe näyttää parhaimmalta, kun rakenne jää hieman huolettomaksi.",
    beforeImage: "/images/tutorials/fluffy-fringe-before.jpg",
    afterImage: "/images/tutorials/fluffy-fringe-after.jpg",
    beforeAlt: "Fluffy Fringe ennen muotoilua: latistunut tai muotoilematon etuhius",
    afterAlt: "Fluffy Fringe muotoilun jälkeen: ilmava etuhius ja näkyvä volyymi",
    imagesAvailable: true
  },
  {
    id: "messy-textured-crop",
    title: "Messy Textured Crop",
    description: "Eroteltu ja rento tekstuuri lyhyempiin hiuksiin. Toimii erityisen hyvin taperin tai faden kanssa.",
    carouselDescription:
      "Eroteltu ja rento tekstuuri lyhyempiin hiuksiin. Toimii erityisen hyvin taperin tai faden kanssa.",
    previewDescription: "Eroteltu ja rento tekstuuri lyhyempiin hiuksiin.",
    suitableFor: "Sopii lyhyille ja keskipitkille hiuksille, kun haluat rakennetta ja hallittua sotkuisuutta.",
    productHandles: ["texture-spray", "hair-wax"],
    steps: [
      {
        text: "Kuivaa hiukset pyyhekuiviksi. Hiukset saavat jäädä hieman kosteiksi."
      },
      {
        text: "Suihkuta Texture Sprayta tasaisesti hiusten päälle ja työstä tuotetta sormilla tyvestä latvoihin.",
        productHandle: "texture-spray"
      },
      {
        text: "Föönaa hiuksia eteenpäin ja puristele pieniä osioita sormilla. Älä tavoittele täysin tasaista muotoa."
      },
      {
        text: "Lämmitä pieni määrä Texture Waxia käsissä ja erottele sillä muutamia latvoja. Lisää vahaa vain vähän kerrallaan.",
        productHandle: "hair-wax"
      }
    ],
    previewSteps: [
      {
        text: "Kuivaa hiukset pyyhekuiviksi."
      },
      {
        text: "Suihkuta Texture Sprayta tasaisesti ja työstä tuotetta sormilla.",
        productHandle: "texture-spray"
      },
      {
        text: "Föönaa hiuksia eteenpäin ja puristele rakennetta sormilla."
      },
      {
        text: "Viimeistele pienellä määrällä Texture Waxia erityisesti latvoista.",
        productHandle: "hair-wax"
      }
    ],
    stylingTip:
      "Pidä vaha enemmän latvoissa kuin tyvessä. Näin hiuksiin jää rakenne ilman raskasta tai tahmeaa tunnetta.",
    beforeImage: "/images/tutorials/messy-textured-crop-before.jpg",
    afterImage: "/images/tutorials/messy-textured-crop-after.jpg",
    beforeAlt: "Messy Textured Crop ennen muotoilua: litteä lyhyt hius",
    afterAlt: "Messy Textured Crop muotoilun jälkeen: eroteltu crop-tyyli ja siisti taper tai fade",
    imagesAvailable: false
  },
  {
    id: "soft-curtains",
    title: "Soft Curtains",
    description:
      "Luonnollisesti laskeutuva middle part, jossa on pehmeää liikettä ja huoliteltu mutta rento lopputulos.",
    carouselDescription:
      "Pehmeä middle part, jossa hiuksiin jää luonnollista liikettä ja huoliteltu mutta rento lopputulos.",
    suitableFor:
      "Sopii keskipitkille hiuksille sekä hiuksille, jotka tuntuvat kuivilta, pörröisiltä tai vaikeasti hallittavilta.",
    productHandles: ["leave-in-conditioner", "texture-spray"],
    steps: [
      {
        text: "Kastele hiukset kevyesti ja tee keskelle rento jakaus."
      },
      {
        text: "Levitä pieni määrä Leave-in Conditioneria pituuksiin ja latvoihin. Vältä lisäämästä liikaa tuotetta suoraan tyveen.",
        productHandle: "leave-in-conditioner"
      },
      {
        text: "Föönaa hiuksia jakauksen molemmilta puolilta poispäin kasvoista. Käytä sormia tai harjaa ja jätä eteen luonnollinen kaari."
      },
      {
        text: "Suihkuta lopuksi kevyesti Texture Sprayta ja puristele hiuksiin hieman liikettä. Älä tee lopputuloksesta liian jäykkää.",
        productHandle: "texture-spray"
      }
    ],
    stylingTip:
      "Soft Curtains toimii parhaiten, kun hiuksissa näkyy liike. Älä paina jakausta liian suoraksi tai käytä liikaa tuotetta.",
    beforeImage: "/images/tutorials/soft-curtains-before.jpg",
    afterImage: "/images/tutorials/soft-curtains-after.jpg",
    beforeAlt: "Soft Curtains ennen muotoilua: muotoilematon keskipitkä hius",
    afterAlt: "Soft Curtains muotoilun jälkeen: pehmeä keskijakaus ja luonnollinen liike",
    imagesAvailable: false
  },
  {
    id: "clean-slick-back",
    title: "Clean Slick Back",
    description: "Siisti ja hallittu takaviisto tyyli, jossa on kevyt kiilto mutta ei märkää tai kovaa lopputulosta.",
    carouselDescription:
      "Siisti ja hallittu takaviisto tyyli, jossa on kevyt kiilto ilman märkää tai kovaa lopputulosta.",
    suitableFor: "Sopii normaaleille, paksuille ja keskipitkille hiuksille, kun haluat huolitellumman lookin.",
    productHandles: ["hair-glaze", "hair-wax"],
    steps: [
      {
        text: "Kastele hiukset kevyesti ja kampaa ne sormilla taaksepäin."
      },
      {
        text: "Levitä pieni määrä Hair Glazea hiusten päälle ja pituuksiin. Aloita vähällä määrällä ja lisää tarvittaessa.",
        productHandle: "hair-glaze"
      },
      {
        text: "Föönaa hiuksia matalalla tai keskilämmöllä taaksepäin. Käytä sormia, jos haluat rennomman lopputuloksen, tai kampaa, jos haluat siistimmän muodon."
      },
      {
        text: "Viimeistele pienellä määrällä Texture Waxia erityisesti sivuilta ja yksittäisistä kohdista, jotka tarvitsevat lisää hallintaa.",
        productHandle: "hair-wax"
      }
    ],
    stylingTip:
      "Pidä pinta huoliteltuna mutta jätä hiuksiin hieman liikettä. Tarkoitus ei ole tehdä kovaa geelikampausta.",
    beforeImage: "/images/tutorials/clean-slick-back-before.jpg",
    afterImage: "/images/tutorials/clean-slick-back-after.jpg",
    beforeAlt: "Clean Slick Back ennen muotoilua: muotoilematon keskipitkä hius",
    afterAlt: "Clean Slick Back muotoilun jälkeen: siisti taaksepäin viimeistelty tyyli ja maltillinen kiilto",
    imagesAvailable: false
  }
];

export const featuredMonthlyTutorialId = "messy-textured-crop";

export function getTutorialById(id: string) {
  return tutorials.find((tutorial) => tutorial.id === id);
}

export function getProductByTutorialHandle(handle: ProductHandle): Product | undefined {
  return products.find((product) => product.shopifyHandle === handle);
}

export function getTutorialProducts(tutorial: Tutorial) {
  return tutorial.productHandles.flatMap((handle) => {
    const product = getProductByTutorialHandle(handle);
    return product ? [product] : [];
  });
}
