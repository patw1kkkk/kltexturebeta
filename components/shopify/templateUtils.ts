const htmlEntities: Record<string, string> = {
  "&": "&amp;",
  "<": "&lt;",
  ">": "&gt;",
  '"': "&quot;",
  "'": "&#39;"
};

export function escapeHtml(value: string) {
  return value.replace(/[&<>"']/g, (character) => htmlEntities[character]);
}

export function getAvailabilityLabel(availableLabel = "Lisää ostoskoriin", soldOutLabel = "Loppuunmyyty") {
  return `<span shopify-attr--hidden="!product.selectedOrFirstAvailableVariant.availableForSale">${escapeHtml(
    availableLabel
  )}</span><span shopify-attr--hidden="product.selectedOrFirstAvailableVariant.availableForSale">${escapeHtml(soldOutLabel)}</span>`;
}
