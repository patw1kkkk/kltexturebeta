export const finnishMonthGenitives = [
  "Tammikuun",
  "Helmikuun",
  "Maaliskuun",
  "Huhtikuun",
  "Toukokuun",
  "Kesäkuun",
  "Heinäkuun",
  "Elokuun",
  "Syyskuun",
  "Lokakuun",
  "Marraskuun",
  "Joulukuun"
];

export function getCurrentMonthTutorialTitle(date = new Date()) {
  return `${finnishMonthGenitives[date.getMonth()]} suosituin tyyli`;
}
