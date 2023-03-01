import "./All.css";
import Home from "./Pages/Home/Home";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { RootState } from "./store"
import { useSelector, useDispatch } from "react-redux"
import Navigation from "./Pages/Navigation/Navigation";
import Selectoption from "./Pages/Playgame/Selectoption";


function App() {
  let store = useSelector((store: RootState) => store)
  const isLoggedIn = store.auth.isLoggedIn

  return (
    <div className="App">
      <Router>
        <div className="appInner">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/selectoption" element={<Selectoption />} />
          </Routes>
        </div>
      </Router>
      {!isLoggedIn && <Navigation/>}
    </div>
  );
}

export default App;
