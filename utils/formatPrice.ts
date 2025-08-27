export const formatPriceToUsd = (totalPrice: number | undefined) => {

    if(totalPrice === undefined) return

  return new Intl.NumberFormat("us-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 2,
  }).format(totalPrice);
};
