import { Routes,Route} from "react-router-dom";


import HomeProd from "./component/HomeProd";

import Product from "./component/Product";

function App() {
  return (
    <div className="App">

      <Routes>
        <Route exact path="/" element={<HomeProd/>}></Route>
        <Route exact path="/products/:id" element={<Product/>}></Route>
      </Routes>
    </div>
  );
}

export default App;
