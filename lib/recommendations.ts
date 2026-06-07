import type { Product, ProductRecommendationProfile } from "@/data/products";

export type HairTypeAnswer = "fine-flat" | "normal" | "thick-unruly" | "dry-frizzy-treated";
export type HairShapeAnswer = "straight" | "wavy" | "curly";
export type DesiredResultAnswer = "volume" | "texture" | "shine" | "hold" | "moisture";
export type FinishAnswer = "matte" | "natural" | "shiny" | "unsure";

export type QuizAnswers = {
  hairType: HairTypeAnswer;
  hairShape: HairShapeAnswer;
  desiredResult: DesiredResultAnswer;
  finish: FinishAnswer;
};

export type RecommendationResult = {
  product: Product;
  matchPercent: number;
  rawScore: number;
};

type NumericProfileKey = Exclude<keyof ProductRecommendationProfile, "finish" | "primaryUse" | "recommendationText">;

type TargetProfile = Record<NumericProfileKey, number> & {
  finish: ProductRecommendationProfile["finish"] | "any";
};

const weights: Record<NumericProfileKey, number> = {
  volume: 1.25,
  texture: 1.15,
  hold: 1.1,
  shine: 1.05,
  moisture: 1.2,
  smoothing: 1,
  fineHair: 0.9,
  thickHair: 0.9,
  wavyCurlyHair: 0.8
};

const defaultTarget: TargetProfile = {
  volume: 35,
  texture: 45,
  hold: 35,
  shine: 35,
  moisture: 35,
  smoothing: 35,
  fineHair: 50,
  thickHair: 50,
  wavyCurlyHair: 50,
  finish: "any"
};

function clamp(value: number, min: number, max: number) {
  return Math.min(max, Math.max(min, value));
}

function withTarget(changes: Partial<TargetProfile>): TargetProfile {
  return { ...defaultTarget, ...changes };
}

export function getTargetProfile(answers: QuizAnswers): TargetProfile {
  let target = withTarget({});

  if (answers.hairType === "fine-flat") {
    target = withTarget({ ...target, volume: 95, texture: 70, fineHair: 100, moisture: 20, smoothing: 15 });
  }

  if (answers.hairType === "thick-unruly") {
    target = withTarget({ ...target, hold: 75, smoothing: 80, thickHair: 100, moisture: 45, fineHair: 30 });
  }

  if (answers.hairType === "dry-frizzy-treated") {
    target = withTarget({ ...target, moisture: 100, smoothing: 90, shine: 55, thickHair: 80 });
  }

  if (answers.hairShape === "wavy") {
    target = withTarget({ ...target, texture: Math.max(target.texture, 70), wavyCurlyHair: 80 });
  }

  if (answers.hairShape === "curly") {
    target = withTarget({ ...target, moisture: Math.max(target.moisture, 75), smoothing: 70, wavyCurlyHair: 95 });
  }

  const desiredTargets: Record<DesiredResultAnswer, Partial<TargetProfile>> = {
    volume: { volume: 100, texture: 70, fineHair: 90, finish: "matte" },
    texture: { texture: 100, volume: 70, hold: 45, finish: "natural" },
    shine: { shine: 100, smoothing: 95, moisture: 55, finish: "shiny" },
    hold: { hold: 100, texture: 70, smoothing: 55, thickHair: 80, finish: "natural" },
    moisture: { moisture: 100, smoothing: 85, shine: 45, wavyCurlyHair: 80, finish: "natural" }
  };

  target = withTarget({ ...target, ...desiredTargets[answers.desiredResult] });

  if (answers.finish !== "unsure") {
    target.finish = answers.finish;
  }

  return target;
}

function getRawCompatibilityScore(profile: ProductRecommendationProfile, target: TargetProfile) {
  const numericKeys = Object.keys(weights) as NumericProfileKey[];
  const maxDistance = numericKeys.reduce((total, key) => total + weights[key] * 100, 0);
  const distance = numericKeys.reduce((total, key) => total + weights[key] * Math.abs(profile[key] - target[key]), 0);
  const numericScore = 1 - distance / maxDistance;
  const finishBonus = target.finish === "any" || profile.finish === target.finish ? 0.08 : -0.04;

  // The model is a weighted similarity score: closer profile values rank higher,
  // while finish preference nudges ties without overpowering the core hair goals.
  return clamp(numericScore + finishBonus, 0, 1);
}

export function getProductRecommendations(products: Product[], answers: QuizAnswers): RecommendationResult[] {
  const target = getTargetProfile(answers);
  const scoredProducts = products
    .map((product) => ({
      product,
      rawScore: getRawCompatibilityScore(product.recommendationProfile, target)
    }))
    .sort((a, b) => b.rawScore - a.rawScore);

  const bestScore = scoredProducts[0]?.rawScore || 1;

  return scoredProducts.slice(0, 3).map((result, index) => {
    const normalized = Math.round((result.rawScore / bestScore) * 100);
    const matchPercent = index === 0 ? 100 : clamp(normalized, 65, 99);

    return {
      ...result,
      matchPercent
    };
  });
}
