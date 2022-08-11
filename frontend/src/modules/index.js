import { combineReducers } from "redux";
import undoable from "redux-undo";
import table from "./table";
import box from "./box";
import user from "./user";

const rootReducer = combineReducers({
  table: undoable(table),
  box: box,
  user: user,
});

export default rootReducer;
