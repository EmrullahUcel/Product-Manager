import React, { useState } from "react";
import { Client, Account } from "appwrite";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { login, whoIsLogin } from "../redux/SalesSlice";

const Sign = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleLogin = async (e) => {
    e.preventDefault();

    const client = new Client()
      .setEndpoint("https://cloud.appwrite.io/v1") // Your API Endpoint
      .setProject("65704f186517aeac4eda"); // Your project ID

    const account = new Account(client);

    const promise = account.createEmailSession(email, password);

    promise.then(
      function (response) {
        console.log("success", response, response.providerUid);
        dispatch(login(true));
        dispatch(whoIsLogin(response.providerUid));
        // navigate("/product");
      },
      function (error) {
        console.log(error); // Failure
        navigate("/");
      }
    );
  };

  return (
    <div>
      <h2>User Sign In</h2>

      <form onSubmit={handleLogin}>
        <div>
          <label>Email:</label>
          <input
            type="email"
            value={email}
            onChange={handleEmailChange}
            required
          />
        </div>
        <div>
          <label>Password:</label>
          <input
            type="password"
            value={password}
            onChange={handlePasswordChange}
            required
          />
        </div>
        <button type="submit">Sign In</button>
      </form>
    </div>
  );
};

export default Sign;
