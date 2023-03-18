import React, { useState } from "react";
import { Button, TextField } from "@mui/material";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";
import Swal from "sweetalert2";
import "./LoginRegister.css";

const Login = () => {
  const navigate = useNavigate();
  const [cookies, setCookies] = useCookies(["usertoken"]);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [formErrors, setFormErrors] = useState({});

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleLoginSubmit = (e) => {
    e.preventDefault();
    console.log(`Email: ${email}`);
    console.log(`Password: ${password}`);
    // Here you would typically make a network request to authenticate the user
    // and handle any validation errors that may be returned.
    const data = { email, password };

    axios
      .post("http://localhost:8000/api/login", data, { withCredentials: true })
      .then((result) => result.data)
      .then((response) => {
        console.log(response);
        navigate("/");
        setFormErrors({});
        setCookies(cookies.usertoken);
      })
      .catch((errors) => {
        console.log(errors.response.data);
        setFormErrors(errors.response.data);
      });
  };

  return (
    <div className="login-container">
      <form onSubmit={handleLoginSubmit}>
        <TextField
          label="Email"
          variant="outlined"
          value={email}
          onChange={handleEmailChange}
          margin="normal"
          fullWidth
          type="email"
          required
          error={formErrors.email != null}
          helperText={formErrors.email?.message}
        />
        <TextField
          label="Password"
          variant="outlined"
          value={password}
          onChange={handlePasswordChange}
          margin="normal"
          fullWidth
          type="password"
          required
          error={formErrors.password != null}
          helperText={formErrors.password?.message}
        />
        <Button variant="contained" type="submit" color="primary">
          Login
        </Button>
      </form>
    </div>
  );
};

const Register = () => {
  const navigate = useNavigate();

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [formErrors, setFormErrors] = useState({});

  const handleFirstNameChange = (e) => {
    setFirstName(e.target.value);
  };

  const handleLastNameChange = (e) => {
    setLastName(e.target.value);
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleConfirmPasswordChange = (e) => {
    setConfirmPassword(e.target.value);
  };

  const handleRegisterSubmit = (e) => {
    e.preventDefault();
    console.log(`First Name: ${firstName}`);
    console.log(`Last Name: ${lastName}`);
    console.log(`Email: ${email}`);
    console.log(`Password: ${password}`);
    console.log(`Confirm Password: ${confirmPassword}`);
    /* Here you would typically make a network request to create a new user
        and handle any validation errors that may be returned.*/

    const data = { firstName, lastName, email, password, confirmPassword };

    axios
      .post("http://localhost:8000/api/register", data, {
        withCredentials: true, //Nos permite enviar y recibir las cookies automaticamente
      })
      .then((result) => result.data)
      .then((response) => {
        console.log(response);
        setFormErrors({});
        navigate("/allPCs");
      })
      .catch((errors) => {
        console.log(errors);
        console.log(errors.response.data.errors);
        if (errors.response.data.code) {
          setFormErrors({ email: { message: "email already taken" } });
        } else {
          setFormErrors(errors.response.data.errors);
        }
      });
  };

  return (
    <div className="login-body">
      <div className="login-container">
        <form onSubmit={handleRegisterSubmit}>
          <TextField
            label="First Name"
            variant="outlined"
            value={firstName}
            onChange={handleFirstNameChange}
            margin="normal"
            fullWidth
            required
            error={formErrors.firstName != null}
            helperText={formErrors.firstName?.message}
          />
          <TextField
            label="Last Name"
            variant="outlined"
            value={lastName}
            onChange={handleLastNameChange}
            margin="normal"
            fullWidth
            required
            error={formErrors.lastName != null}
            helperText={formErrors.lastName?.message}
          />
          <TextField
            label="Email"
            variant="outlined"
            value={email}
            onChange={handleEmailChange}
            margin="normal"
            fullWidth
            type="email"
            error={formErrors.email != null}
            helperText={formErrors.email?.message}
          />
          <TextField
            label="Password"
            variant="outlined"
            value={password}
            onChange={handlePasswordChange}
            margin="normal"
            fullWidth
            type="password"
            required
            error={formErrors.password != null}
            helperText={formErrors.password?.message}
          />
          <TextField
            label="Confirm Password"
            variant="outlined"
            value={confirmPassword}
            onChange={handleConfirmPasswordChange}
            margin="normal"
            fullWidth
            type="password"
            required
            error={formErrors.confirmPassword != null}
            helperText={formErrors.confirmPassword?.message}
          />
          <Button variant="contained" type="submit" color="primary">
            Register
          </Button>
        </form>
      </div>
    </div>
  );
};

const LoginRegister = () => {
  const [showLogin, setShowLogin] = useState(true);

  const handleToggleClick = () => {
    setShowLogin(!showLogin);
  };

  return (
    <div className="text-center mt-2">
      {showLogin ? <Login /> : <Register />}
      <Button onClick={handleToggleClick}>
        <div className="mt-2">
          {showLogin ? "Create an account" : "Already have an account?"}
        </div>
      </Button>
    </div>
  );
};

export default LoginRegister;
