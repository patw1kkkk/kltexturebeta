export type Transformation = {
  id: string;
  title: string;
  routine: string;
  products: string[];
  image: string;
  beforeLabel: string;
  afterLabel: string;
};

export const transformations: Transformation[] = [
  {
    id: "fluffy-before-after",
    title: "Tyvestä litteästä ilmavaksi",
    routine: "Fluffy Hair",
    products: ["Texture Spray", "Volume Powder"],
    image: "/images/transformations/before-after-wide.png",
    beforeLabel: "Ennen",
    afterLabel: "Jälkeen"
  },
  {
    id: "texture-before-after",
    title: "Rakenne näkyy heti",
    routine: "Messy Texture",
    products: ["Salt Spray", "Texture Wax"],
    image: "/images/transformations/before-after-wide.png",
    beforeLabel: "Ilman tuotetta",
    afterLabel: "Muotoiltuna"
  }
];
