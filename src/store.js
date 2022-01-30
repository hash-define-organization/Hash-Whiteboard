import { combineReducers, createStore } from "redux";
import theme from "./Reducers/theme";

const rootReducer = combineReducers({
    theme: theme,
});

const store = createStore(rootReducer);

export default store;