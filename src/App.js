import { BrowserRouter, Route, Routes } from "react-router-dom";
import ProductList from "./Components/ProductList";
import ProductView from "./Components/ProductView";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<ProductList />} />
        <Route path="/details/:id" element={<ProductView />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
