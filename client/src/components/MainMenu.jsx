import React from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";
import axios from "axios";
import Swal from "sweetalert2";

const MainMenu = () => {
  const [cookies, _setCookies, removeCookies] = useCookies(["usertoken"]);
  const navigate = useNavigate();

  const confirmarLogout = () => {
    Swal.fire({
      title: `Do you want to log-out?`,
      text: "We'll miss you!",
      //icon: 'warning',
      imageUrl:
        "https://img.wattpad.com/2fcc25a74cfc01253297f270537e64ebd40f3f48/68747470733a2f2f73332e616d617a6f6e6177732e636f6d2f776174747061642d6d656469612d736572766963652f53746f7279496d6167652f464f6f4a776d52647a3363517a673d3d2d3831303635383236342e313564626434616464393031623237663230373733383534333632372e676966",
      imageWidth: 400,
      imageHeight: 200,
      imageAlt: "Custom image",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, I want to log out",
    }).then((result) => {
      if (result.isConfirmed) {
        logoutUser();
      }
    });
  };

  const logoutUser = () => {
    axios
      .get("http://localhost:8000/api/logout")
      .then((result) => result.data)
      .then((response) => {
        console.log(response);
        removeCookies("usertoken");
        navigate("/");
      })
      .catch((errors) => {
        console.log(errors.response.data);
      });
  };

  return (
    <nav
      className="navbar navbar-expand-lg navbar-dark"
      style={{ backgroundColor: "#2b3035" }}
    >
      <div className="container-fluid d-flex justify-content-between">
        <Link className="navbar-brand" to="/">
          STRAY KIDS{" "}
          <span style={{ fontStyle: "italic" }}>photocard database ♡</span>
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse " id="navbarSupportedContent">
          <ul className="navbar-nav d-flex flex-row me-1">
            <li className="nav-item me-3 me-lg-0">
              <NavLink className="nav-link" aria-current="page" to="/allPCs">
                Check availables
              </NavLink>
            </li>
            {cookies.usertoken && (
              <li className="nav-item">
                <NavLink className="nav-link" aria-current="page" to="/newPC">
                  Add new one
                </NavLink>
              </li>
            )}
            <li className="nav-item">
              <NavLink className="nav-link" aria-current="page" to="/aboutus">
                About Us
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" aria-current="page" to="/contact">
                Contact
              </NavLink>
            </li>
            <div className="d-flex">
              {cookies.usertoken ? (
                <li className="nav-item">
                  <button
                    className="nav-link"
                    style={{
                      border: "none",
                      outline: "none",
                      background: "transparent",
                    }}
                    onClick={confirmarLogout}
                  >
                    Logout
                  </button>
                </li>
              ) : (
                <li className="nav-item">
                  <NavLink className="nav-link" aria-current="page" to="/login">
                    Login
                  </NavLink>
                </li>
              )}
            </div>
          </ul>
        </div>
        <div className="dropdown-menu" id="formLogin">
          <div className="row">
            <div className="container-fluid">
              <form className="">
                <div className="form-group">
                  <label className="">Username</label>
                  <input
                    className="form-control"
                    name="username"
                    id="username"
                    type="text"
                  />
                </div>
                <div className="form-group">
                  <label className="">Password</label>
                  <input
                    className="form-control"
                    name="password"
                    id="password"
                    type="password"
                  />
                  <br className="" />
                </div>
                <button
                  type="submit"
                  id="btnLogin"
                  className="btn btn-success btn-sm"
                >
                  Login
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default MainMenu;
