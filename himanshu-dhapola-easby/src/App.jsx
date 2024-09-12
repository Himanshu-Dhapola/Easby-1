import { BrowserRouter, Route, Routes } from "react-router-dom";
import CustomerRoutes from "./Customer/Routes/CustomerRoutes";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/*" element={<CustomerRoutes />}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
