import type { Product } from "@/data/products";
import type { QuizAnswers } from "@/lib/recommendations";

const productBenefitCopy: Record<string, string> = {
  "texture-spray": "Se tekee hiuksista helpommin muotoiltavat ja luonnollisen tuntuiset.",
  "volume-powder": "Se tuo nopeasti ryhtiä erityisesti hiusten tyveen.",
  "salt-spray": "Se tuo hiuksiin ilmavaa karheutta ja luonnollista rakennetta.",
  "texture-wax": "Se auttaa viimeistelemään tyylin ilman kovaa tai jäykkää tunnetta.",
  "leave-in-conditioner": "Se auttaa vähentämään karheaa tunnetta ilman raskautta.",
  "hair-glaze": "Se auttaa tekemään lopputuloksesta huolitellun ja hallitun."
};

function getNeedReason(answers: QuizAnswers, product: Product) {
  const isMoistureNeed = answers.hairType === "dry-frizzy-treated" || answers.desiredResult === "moisture";
  const isVolumeNeed = answers.hairType === "fine-flat" || answers.desiredResult === "volume";
  const isTextureNeed = answers.desiredResult === "texture" || answers.finish === "matte";
  const isHoldNeed = answers.desiredResult === "hold";
  const isShineNeed = answers.desiredResult === "shine" || answers.finish === "shiny";

  if (product.slug === "leave-in-conditioner" || (isMoistureNeed && product.recommendationProfile.moisture >= 70)) {
    return "Hiuksesi kaipaavat pehmeyttä ja helpompaa hallittavuutta";
  }

  if (product.slug === "volume-powder" || (isVolumeNeed && product.recommendationProfile.volume >= 80)) {
    return "Hiuksesi latistuvat helposti ja haluat lisää volyymia";
  }

  if (product.slug === "salt-spray") {
    return "Tavoitteenasi on rento ja teksturoitu lopputulos";
  }

  if (product.slug === "texture-spray" || (isTextureNeed && product.recommendationProfile.texture >= 80)) {
    return "Haluat hiuksiisi lisää rakennetta ilman raskasta tunnetta";
  }

  if (product.slug === "texture-wax" || (isHoldNeed && product.recommendationProfile.hold >= 75)) {
    return "Haluat pitävän mutta muotoiltavan lopputuloksen";
  }

  if (product.slug === "hair-glaze" || (isShineNeed && product.recommendationProfile.shine >= 75)) {
    return "Haluat siistimmän ja kiiltävämmän viimeistelyn";
  }

  return "Haet hiuksiisi toimivaa ja helposti hallittavaa lopputulosta";
}

export function getRecommendationReason(answers: QuizAnswers, product: Product) {
  const needReason = getNeedReason(answers, product);
  const benefit = productBenefitCopy[product.slug] ?? product.recommendationProfile.recommendationText;

  return `${needReason}, joten ${product.name} sopii sinulle erityisen hyvin. ${benefit}`;
}
