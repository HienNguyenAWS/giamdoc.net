import { createSelector } from "reselect";

const storeName = "home";
const selectStore = (state) => state.get(storeName, {});

export const selectListCompany = () =>
  createSelector(selectStore, (state) => state.get("companies", []));

export const selectError = () =>
  createSelector(selectStore, (state) => state.get("error", null));

export const selectLoading = () =>
  createSelector(selectStore, (state) => state.get("loading", null));
