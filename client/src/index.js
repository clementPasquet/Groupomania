import React from "react";
import ReactDOM from "react-dom/client";
import "./styles/index.scss";
import App from "./App";
import { Provider } from "react-redux";
import { applyMiddleware, createStore } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import thunk from "redux-thunk";
import rootReducer from "./reducers";
import { getUsers } from "./reducers/usersActions";

// cette fonction nous permet d'initialiser notre store pour l'utilisation de redux
const store = createStore(
  rootReducer,
  composeWithDevTools(applyMiddleware(thunk))
);

store.dispatch(getUsers());

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  //placé autour du composant App notre store est accessible pour tout les composants de notre application.
  <Provider store={store}>
    <App />
  </Provider>
);
