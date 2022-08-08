import { combineReducers } from "redux";
import undoable from "redux-undo";
import table from "./table";

const rootReducer = combineReducers({
  table: undoable(table),
});

export default rootReducer;
