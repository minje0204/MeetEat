import { configureStore } from "@reduxjs/toolkit";

const initialState = { tableList: [] };

function reducers(state = initialState, action) {
  if (action.type === "ADD_ITEM") {
    return { ...state, tableList: [...state.tableList, action.data] };
  }
  if (action.type === "GET_BOUNDARY") {
    return { ...state, box: action.data };
  }
  if (action.type === "REMOVE_ITEM") {
    let newTableList = [...state.tableList];
    newTableList.splice(action.data.index, 1);
    return { ...state, tableList: [...newTableList] };
  }
  if (action.type === "MOVE_ITEM") {
    let newItem = Object.assign({}, state.tableList[action.data.index]);
    const newTop = newItem.top + action.data.deltaY;
    const newLeft = newItem.left + action.data.deltaX;
    newItem.top = newTop;
    newItem.left = newLeft;

    let newTableList = [...state.tableList];
    newTableList.splice(action.data.index, 1, newItem);
    return { ...state, tableList: [...newTableList] };
  }
  return state;
}

const store = configureStore({ reducer: reducers });

export default store;
