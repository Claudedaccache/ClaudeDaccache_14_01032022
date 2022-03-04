import "./App.css";
import { Routes, Route } from "react-router-dom";
import CreateEmployee from "./Pages/CreateEmployee";
import Error from "./Components/Error/Error";
import CurrentEmployees from "./Pages/CurrentEmployees";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<CreateEmployee />} />
        <Route path="/CurrentEmployees" element={<CurrentEmployees />} />
        <Route path="*" element={<Error />} />
      </Routes>
    </div>
  );
}

export default App;
