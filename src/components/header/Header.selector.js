import { createSelector } from "reselect";

const selectStore = (state) => state.getIn(["header"]);

// Example Code
const getUser = () =>
  createSelector(selectStore, (state) => {
    return state.user;
  });

const getToken = () =>
  createSelector(selectStore, (state) => {
    return state.token;
  });

export { getUser, getToken };
