import { combineReducers } from "redux";
import undoable from "redux-undo";
import table from "./table";
import box from "./box";

const rootReducer = combineReducers({
  table: undoable(table),
  box: box,
});

export default rootReducer;
