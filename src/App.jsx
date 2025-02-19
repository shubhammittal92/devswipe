import { BrowserRouter, Routes, Route } from "react-router-dom";
// import NavBar from "./NavBar";
import Body from "./Body";
import Login from "./Login";
import { Provider } from "react-redux";
import appStore from "./utils/appStore";
// import appStore from "./utils/appStore";
function App() {
  return (
    <>
   <Provider store={appStore}>
    <BrowserRouter basename ="/">
    <Routes>
    <Route path="/" element={<Feed />}>
    <Route path="/login" element={<Login />} />
    <Route path="/profile" element={<Profile />} />
     </Route>
    </Routes>
    </BrowserRouter>
    </Provider>
     {/* <NavBar /> */}
    </>
  );
}

export default App;