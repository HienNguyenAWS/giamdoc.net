import { fromJS } from "immutable";

import {
  GET_LIST_COMPANY,
  GET_LIST_COMPANY_SUCCESS,
  GET_LIST_COMPANY_ERROR,
  CREATE_COMPANY,
  CREATE_COMPANY_SUCCESS,
  CREATE_COMPANY_ERROR,
} from "./Home.action";

const initialState = fromJS({
  companies: [],
  loading: false,
  error: null,
});

const reducer = (state = initialState, action) => {
  let stateCompanies, listCompany;
  switch (action.type) {
    case GET_LIST_COMPANY:
      return state.set("loading", true).set("error", null).set("companies", []);
    case GET_LIST_COMPANY_SUCCESS:
      stateCompanies = state.get("companies", []);
      listCompany = [...stateCompanies, ...action.payload];
      return state
        .set("loading", false)
        .set("error", null)
        .set("companies", listCompany);
    case GET_LIST_COMPANY_ERROR:
      return state
        .set("loading", false)
        .set("error", action.payload)
        .set("companies", []);

    case CREATE_COMPANY:
      return state.set("loading", false).set("error", null);

    case CREATE_COMPANY_SUCCESS:
      stateCompanies = state.get("companies", []);
      listCompany = [...stateCompanies, action.payload];
      return state
        .set("loading", false)
        .set("error", null)
        .set("companies", listCompany);

    case CREATE_COMPANY_ERROR:
      return state.set("loading", false).set("error", action.payload);

    default:
      return state;
  }
};

export default reducer;
