import { configureStore } from "@reduxjs/toolkit";

const initialState = { tableList: [] };

function reducers(state = initialState, action) {
  if (action.type === "add") {
    return { ...state, tableList: [...state.tableList, action.data] };
  }
  if (action.type === "GETBOUNDARY") {
    return { ...state, box: action.data };
  }
  if (action.type === "REMOVEITEM") {
    let newTableList = [...state.tableList];
    newTableList.splice(action.data.index, 1);
    return { ...state, tableList: [...newTableList] };
  }
  return state;
}

const store = configureStore({ reducer: reducers });

export default store;
