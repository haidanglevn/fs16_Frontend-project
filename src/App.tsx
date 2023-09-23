import React from "react";
import ProductPage from "./pages/ProductPage";
import store from "./redux/store";
import { Provider } from "react-redux";
import Header from "./components/Header";

const App = () => {
  return (
    <Provider store={store}>
      <div>
        <Header />
        <ProductPage />
      </div>
    </Provider>
  );
};

export default App;
