export const formatPriceToEuro = (totalPrice: number | undefined) => {

    if(totalPrice === undefined) return

  return new Intl.NumberFormat("es-ES", {
    style: "currency",
    currency: "EUR",
    maximumFractionDigits: 2,
  }).format(totalPrice);
};
