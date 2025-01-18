import { render } from "preact";
import "./index.css";
import { App } from "./App";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./store/store";
import { CartProvider } from "./context/CartProvider";

render(
  <BrowserRouter>
      <Provider store={store}>
      <CartProvider>
        <App />
      </CartProvider>
      </Provider>
  </BrowserRouter>,
  document.getElementById("app")
);
