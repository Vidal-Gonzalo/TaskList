import React, { useState, useContext } from "react";
import Axios from "axios";
import { LoginContext } from "../helpers/Context";
import { useHistory } from "react-router-dom";

const Login = () => {
  const { setIsAuth } = useContext(LoginContext);

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const [loginStatus, setLoginStatus] = useState("");

  const history = useHistory();

  const LoginData = (e) => {
    e.preventDefault();

    Axios.post("http://localhost:3001/login", {
      username: username,
      password: password,
    }).then((response) => {
      console.log(response);
      if (response.data.message) {
        setLoginStatus(response.data.message);
      } else {
        setIsAuth(true);
        history.push("/home");
      }
    });
  };

  return (
    <section id="login">
      <div className="container">
        <div className="wrapLogin">
          <div className="login">
            <h1 className="loginTitle">Iniciar sesión</h1>
            <hr />
            <form>
              <div className="form-floating mb-3">
                <input
                  type="text"
                  className="form-control"
                  name="username"
                  id="username"
                  placeholder="username"
                  onChange={(e) => {
                    setUsername(e.target.value);
                  }}
                />
                <label htmlFor="username">Nombre de usuario</label>
              </div>

              <div className="form-floating mb-3">
                <input
                  type="password"
                  name="password"
                  className="form-control"
                  id="password"
                  placeholder="password"
                  onChange={(e) => {
                    setPassword(e.target.value);
                  }}
                />
                <label htmlFor="password">Contraseña</label>
              </div>
              <span className="error">{loginStatus}</span>
              <button className="button" onClick={LoginData} type="submit">
                Entrar
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Login;
