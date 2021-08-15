import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import api from '../API/Server';

const Register = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const [status, setStatus] = useState('');

  const handlerRegister = (e) => {
    e.preventDefault();
    api
      .post('/register', {
        email: email,
        password: password,
      })
      .then((res) => {
        setStatus(res.data.message);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <>
      <div class="register d-flex align-items-center justify-content-center" style={{ height: '100vh' }}>
        <div class="box" style={{ width: '40%', height: '50%' }}>
          {status && (
            <div class="alert alert-success" role="alert">
              {status}
            </div>
          )}
          <form onSubmit={handlerRegister}>
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
              Have account ?<Link to="/login"> Login </Link>
            </div>
            <button type="submit" class="btn btn-primary mt-4">
              Register
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default Register;
