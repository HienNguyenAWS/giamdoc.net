export const warning = (...args) => {
  if (process.env.NODE_ENV === "production") return;

  /* eslint-disable no-console */
  if (typeof console !== "undefined" && typeof console.error === "function") {
    console.error.apply(console, args);
  }
  /* eslint-enable no-console */
  try {
    throw new Error(args.join(" "));
    /* eslint-disable no-empty */
  } catch (e) {}
  /* eslint-enable no-empty */
};

export const debug = (...args) => {
  if (process.env.NODE_ENV === "production") return;

  /* eslint-disable no-console */
  if (typeof console !== "undefined" && typeof console.debug === "function") {
    console.debug.apply(console, args);
  }
};
