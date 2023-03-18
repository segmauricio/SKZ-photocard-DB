import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import PCform from "./components/PCform/PCform";
import PhotocardsList from "./components/PhotocardsList";
import AboutUs from "./components/AboutUs/AboutUs";
import ContactUs from "./components/ContactUs";
import LandingPage from "./components/LandingPage/LandingPage";
import LoginRegister from "./components/LoginRegister/LoginRegister";
import Layout from "./Layout";
import { useCookies } from "react-cookie";
import SingleCard from "./components/SingleCard/SingleCard";
import { useState, useEffect } from "react";
import axios from "axios";

const ProtectedRoute = ({ user, children }) => {
  if (!user) {
    return <Navigate to="/" replace />;
  }
  return children;
};

const App = () => {
  const [cookies] = useCookies(["usertoken"]);

  const [photocards, setPhotocards] = useState([]);

  useEffect(() => {
    axios
      .get(process.env.REACT_APP_BACKEND + "/api/straykids")
      .then((result) => result.data)
      .then((response) => {
        console.log(response);
        setPhotocards(response);
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" exact element={<Layout />}>
          <Route path="/" exact element={<LandingPage />} />
          <Route
            path="/newPC"
            exact
            element={
              <ProtectedRoute user={cookies.usertoken}>
                <PCform photocards={photocards} setPhotocards={setPhotocards} />
              </ProtectedRoute>
            }
          />
          <Route
            path="/allPCs"
            exact
            element={<PhotocardsList photocards={photocards} />}
          />
          <Route path="/aboutus" exact element={<AboutUs />} />
          <Route path="/contact" exact element={<ContactUs />} />
          <Route path="/login" exact element={<LoginRegister />} />
          <Route
            path="/photocard/:id"
            exact
            element={<SingleCard photocards={photocards} setPhotocards={setPhotocards} />}
          />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;
