import { createStore } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import rootReducer from "../Redux/RootReducer";

const store = createStore(rootReducer, composeWithDevTools());

export default store;
