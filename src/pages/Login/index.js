import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { login } from "../../actions/userActions";
import { Container, Grid, TextField, Button, Typography, Alert } from "@mui/material";
import 'react-toastify/dist/ReactToastify.min.css';

const LoginPage = ({ location, history }) => {
  const redirect = location.search ? location.search.split("=")[1] : "/";
  const dispatch = useDispatch();

  const currentUser = useSelector((state) => state.currentUser);
  const { loading, error, userInfo } = currentUser;

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(login(email, password));
  };

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    if (userInfo) {
      history.push(redirect);
    }
  }, [history, userInfo, redirect]);

  return (
    <Container maxWidth="sm" style={{ marginTop: "100px" }}>
      <Grid container spacing={2} alignItems="center" justifyContent="center">
        <Grid item xs={12}>
          <Typography variant="h5" align="center" gutterBottom>
            SIGN IN
          </Typography>
          {error && <Alert severity="error">{error}</Alert>}
          {loading && <Alert severity="info">Logging in...</Alert>}
          <form onSubmit={submitHandler}>
            <TextField
              fullWidth
              label="Email"
              variant="outlined"
              margin="normal"
              required
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
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
            />
            <Button
              variant="contained"
              color="primary"
              className='title   rounded-2 border-0 text'
              fullWidth
              type="submit"
              style={{ marginTop: "20px", textTransform: "none" }}
            >
              Submit
            </Button>
          </form>
          <Typography align="center" style={{ marginTop: "20px" }}>
            New Customer?{" "}
            <Link to={redirect ? `/register?redirect=${redirect}` : "/redirect"} style={{ textDecoration: "none" }}>
              Register Here
            </Link>
          </Typography>
        </Grid>
      </Grid>
    </Container>
  );
};

export default LoginPage;
