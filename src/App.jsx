import { BrowserRouter, Routes, Route } from "react-router-dom";
// import NavBar from "./NavBar";
import Body from "./Body";
import Login from "./Login";
function App() {
  return (
    <>
    <BrowserRouter basename ="/">
    <Routes>
    <Route path="/" element={<Body />}>
    <Route path="/login" element={<Login />} />
     </Route>
    </Routes>
    </BrowserRouter>
     {/* <NavBar /> */}
    </>
  );
}

export default App;