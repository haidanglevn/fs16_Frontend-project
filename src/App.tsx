import React from "react";
import ProductPage from "./features/product/ProductPage";
import store from "./app/store";
import { Provider } from "react-redux";

const App = () => {
  return (
    <Provider store={store}>
      <div>
        <h1>E-commerce Web site</h1>
        <ProductPage />
      </div>
    </Provider>
  );
};

export default App;
