import { configureStore } from "@reduxjs/toolkit";

const initialState = {};

function reducers(state = initialState, action) {
  if (action.type === "add") {
    return { ...state, tableList: [...state.tableList, action.data] };
  }
  if (action.type === "GETBOUNDARY") {
    return { ...state, box: action.data };
  }
  return state;
}

const store = configureStore({ reducer: reducers });

export default store;
