import React, { useState, useEffect } from "react";
import { useSelector, useDispatch, batch } from "react-redux";
import { useNavigate } from "react-router-dom";
import styled from "styled-components/macro";
import { API_URL } from "../utils/constants";
import user from "../reducers/user";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [mode, setMode] = useState("signup");
  const [error, setError] = useState("");

  const accessToken = useSelector((store) => store.user.accessToken);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (accessToken) {
      navigate("/");
    }
  }, [accessToken, navigate]);

  const onFormSubmit = (event) => {
    event.preventDefault();

    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username, password }),
    };

    fetch(API_URL(mode), options)
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        if (data.success) {
          batch(() => {
            dispatch(user.actions.setUserId(data.response.userId));
            dispatch(user.actions.setUsername(data.response.username));
            dispatch(user.actions.setAccessToken(data.response.accessToken));
            dispatch(user.actions.setError(null));
          });
        } else {
          batch(() => {
            dispatch(user.actions.setUserId(null));
            dispatch(user.actions.setUsername(null));
            dispatch(user.actions.setAccessToken(null));
            dispatch(user.actions.setError(data.response));
          });
          setError("Sorry, this is an invalid username or password");
        }
      });
  };

  return (
    <Container>
      <Form onSubmit={onFormSubmit}>
        <Title>Log in!</Title>
        <Label htmlFor="username">Username</Label>
        <Input
          id="username"
          type="text"
          required
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <Label htmlFor="password">Password</Label>
        <Input
          id="password"
          type="password"
          required
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <Button type="submit" onClick={() => setMode("signin")}>
          LOGIN
        </Button>
        <Button type="submit" onClick={() => setMode("signup")}>
          SIGNUP
        </Button>
        <Error> {error}</Error>
      </Form>
    </Container>
  );
};

export default Login;

const Container = styled.div`
  display: flex;
  justify-content: center;
  padding-top: 10%;
`;

const Title = styled.h1`
  font-size: 30px;
  margin: 0px;
  padding: 20px 0;
  @media (min-width: 768px) {
    font-size: 45px;
  }
  @media (min-width: 1025px) {
    font-size: 30px;
  }
`;
const Form = styled.form`
  display: flex;
  flex-direction: column;
  background-color: #984ba4;
  width: 80%;
  padding: 15px 10px;
  border-radius: 10px;

  @media (min-width: 768px) {
    width: 50%;
    padding: 30px 25px;
  }

  @media (min-width: 1025px) {
    width: 20%;
    padding: 30px 25px;
  }
`;
const Label = styled.label`
  font-size: 18px;
  @media (min-width: 768px) {
    font-size: 25px;
  }
  @media (min-width: 1025px) {
    font-size: 18px;
  }
`;
const Button = styled.button`
  padding: 10px;
  margin: 20px;
  border-radius: 15px;
  border: none;
  background-color: white;
  color: ;
  box-shadow: 0px 8px 15px rgba(100, 80, 18, 0.6);
  transition: all 0.3s ease 0s;
  cursor: pointer;
`;
const Input = styled.input`
  padding: 5px;
  border-radius: 5px;
`;
const Error = styled.p`
  font-size: 18px;
  text-align: center;
`;
