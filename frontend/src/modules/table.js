// actions

const ADD_ITEM = "table/ADD_ITEM";
const REMOVE_ITEM = "table/REMOVE_ITEM";
const MOVE_ITEM = "table/MOVE_ITEM";
const RESET = "table/RESET";

export const AddItem = data => ({
  type: ADD_ITEM,
  data,
});
export const RemoveItem = id => ({
  type: REMOVE_ITEM,
  id,
});
export const MoveItem = data => ({
  type: MOVE_ITEM,
  data,
});

export const Reset = () => ({
  type: RESET,
});

const initialState = { tableList: [] };

// reducer

export default function table(state = initialState, action) {
  switch (action.type) {
    case ADD_ITEM:
      return { ...state, tableList: [...state.tableList, action.data] };
    case REMOVE_ITEM: {
      let newTableList = [...state.tableList];
      newTableList.splice(action.id, 1);
      return { ...state, tableList: [...newTableList] };
    }
    case MOVE_ITEM: {
      let newItem = Object.assign({}, state.tableList[action.data.index]);
      const newTop = newItem.top + action.data.deltaY;
      const newLeft = newItem.left + action.data.deltaX;
      newItem.top = newTop;
      newItem.left = newLeft;

      let newTableList = [...state.tableList];
      newTableList.splice(action.data.index, 1, newItem);
      return { ...state, tableList: [...newTableList] };
    }
    case RESET: {
      return initialState;
    }
    default:
      return state;
  }
}
