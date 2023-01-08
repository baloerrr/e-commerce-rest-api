import React from "react";
import StripeCheckout from "react-stripe-checkout";
import CategoryItem from "./components/CategoryItem";
import Navbar from "./components/Navbar";

const App = () => {
  return (
    <div className="App">
      <Navbar/>
      <CategoryItem/>
    </div>
  );
}

export default App;
