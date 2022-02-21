import { createSelector } from "reselect";

const storeName = "userProfile";
const selectStore = (state) => state.getIn([storeName]);
export const getUser = state => state?.get('userProfile').get('profile');
export const getUserComp = () =>
  createSelector(selectStore, (state) => {
    return state.get("profile", null);
  });
