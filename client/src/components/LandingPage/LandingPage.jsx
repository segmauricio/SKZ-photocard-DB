import React from "react";
import "./LandingPage.css";
import { useNavigate } from "react-router-dom";
import { useCookies } from 'react-cookie'

const LandingPage = () => {
  const navigate = useNavigate();
  const [cookies] = useCookies(['usertoken']);

  const someEventHandler = () => {
    navigate("/login");
  };

  return (
    <div className="main-container">
      <div className="body">
        <div className="outer-container">
          <div className="inner-container">
            <h1>Welcome to our website!</h1>
            <p>
              This place functions as a database for all the Stray Kids
              photocards available in the market!
            </p>
            <p>
              Feel free to browse our archives to check what PCs are missing in
              your collection or to add new ones as the band releases new albums
              or they do giveaways in special events.
            </p>
            {!cookies.usertoken && <button onClick={someEventHandler}>Login</button>}
          </div>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;
