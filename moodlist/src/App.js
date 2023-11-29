import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./Pages/HomePage.jsx";
import LoginPage from "./Pages/LoginPage.jsx";
import ResultPage from "./Pages/ResultPage.jsx";
import AccountPage from "./Pages/AccountPage.jsx";
import logo from "./logo.svg";
import "./App.css";

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<LoginPage />}></Route>
          <Route path="/home" element={<HomePage />}></Route>
          <Route path="/result" element={<ResultPage />}></Route>
          <Route path="/account" element={<AccountPage />}></Route>
        </Routes>
      </Router>
    </div>
  )
}

export default App;
