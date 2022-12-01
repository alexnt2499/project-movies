// Create our number formatter.
export const formatterUSD = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
});
