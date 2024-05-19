import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { registerUser } from "../../actions/userActions";
import { Container, Grid, TextField, Button, Typography, Alert } from "@mui/material";

const RegisterPage = ({ location, history }) => {
  const redirect = location.search ? location.search.split("=")[1] : "/";

  const dispatch = useDispatch();

  const registeredUser = useSelector((state) => state.registeredUser);
  const { loading, error, userInfo } = registeredUser;

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState(null);

  const submitHandler = (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setMessage("Passwords do not match");
    } else {
      dispatch(registerUser(name, email, password));
    }
  };

  useEffect(() => {
    if (userInfo) {
      history.push(redirect);
    }
  }, [history, userInfo, redirect]);

  return (
    <Container maxWidth="sm" style={{ marginTop: "100px", fontFamily: "'Poppins', sans-serif" }}>
      <Grid container spacing={2} alignItems="center" justifyContent="center">
        <Grid item xs={12}>
          <Typography variant="h5" align="center" gutterBottom style={{ marginBottom: "20px" }}>
            New User
          </Typography>
          {message && <Alert severity="error">{message}</Alert>}
          {error && <Alert severity="error">{error}</Alert>}
          {loading && <Alert severity="info">Loading...</Alert>}
          <form onSubmit={submitHandler}>
            <TextField
              fullWidth
              label="Name"
              variant="outlined"
              margin="normal"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              style={{ marginBottom: "10px" }}
            />
            <TextField
              fullWidth
              label="Email"
              variant="outlined"
              margin="normal"
              required
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              style={{ marginBottom: "10px" }}
            />
            <TextField
              fullWidth
              label="Password"
              variant="outlined"
              margin="normal"
              required
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              style={{ marginBottom: "10px" }}
            />
            <TextField
              fullWidth
              label="Confirm Password"
              variant="outlined"
              margin="normal"
              required
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              style={{ marginBottom: "20px" }}
            />
            <Button
              variant="contained"
              color="primary"
              className='title   rounded-2 border-0 text'
              fullWidth
              type="submit"
              style={{ textTransform: "none", marginBottom: "20px" }}
            >
              Sign Up
            </Button>
          </form>
          <Typography align="center">
            Already have an account?{" "}
            <Link to={redirect ? `/login?redirect=${redirect}` : "/login"} style={{ textDecoration: "none" }}>
              Login Here
            </Link>
          </Typography>
        </Grid>
      </Grid>
    </Container>
  );
};

export default RegisterPage;
