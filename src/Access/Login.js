import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import api from '../API/Server';
import { Redirect } from 'react-router-dom';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const [redirect, setRedirect] = useState(false);

  const handlerLogin = (e) => {
    e.preventDefault();
    api
      .post('/login', {
        email: email,
        password: password,
      })
      .then((res) => {
        console.log(res);
        setRedirect(true);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <>
      {redirect && <Redirect to="/" />}
      <div class="register d-flex align-items-center justify-content-center" style={{ height: '100vh' }}>
        <div class="box" style={{ width: '40%', height: '50%' }}>
          <form onSubmit={handlerLogin}>
            <div class="mb-3">
              <label for="exampleInputEmail1" class="form-label">
                Email address
              </label>
              <input
                type="email"
                class="form-control"
                id="exampleInputEmail1"
                aria-describedby="emailHelp"
                onChange={(e) => {
                  setEmail(e.target.value);
                }}
              />
            </div>
            <div class="mb-3">
              <label for="exampleInputPassword1" class="form-label">
                Password
              </label>
              <input
                type="password"
                class="form-control"
                id="exampleInputPassword1"
                onChange={(e) => {
                  setPassword(e.target.value);
                }}
              />
            </div>
            <div id="emailHelp" class="form-text">
              {' '}
              No have account ?<Link to="/register"> Register </Link>
            </div>
            <button type="submit" class="btn btn-primary mt-4">
              Login
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default Login;
