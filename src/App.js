import { Routes,Route} from "react-router-dom";
import "./App.css";
import Home from "./component/Home";
import HomeProd from "./component/HomeProd";
import Navbar from "./component/Navbar";
import Product from "./component/Product";

function App() {
  return (
    <div className="App">
     <Navbar />
      <Routes>
        <Route exact path="/" element={<Home/>}></Route>
        <Route exact path="/products" element={<HomeProd/>}></Route>
        <Route exact path="/products/:id" element={<Product/>}></Route>
      </Routes>
    </div>
  );
}

export default App;
