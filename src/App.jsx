import { BrowserRouter, Routes, Route } from "react-router-dom";
// import NavBar from "./NavBar";
import Body from "./components/Body";
import Login from "./components/Login";
// import Profile from "./components/Profile";
import { Provider } from "react-redux";
import appStore from "./utils/appStore";
// import appStore from "./utils/appStore";
function App() {
  return (
    <>
   <Provider store={appStore}>
    <BrowserRouter basename ="/">
    <Routes>
    <Route path="/" element={<Body />}>
    <Route path="/login" element={<Login />} />
    {/* <Route path="/profile" element={<Profile />} /> */}
     </Route>
    </Routes>
    </BrowserRouter>
    </Provider>
     {/* <NavBar /> */}
    </>
  );
}

export default App;