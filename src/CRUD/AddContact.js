import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Redirect } from 'react-router-dom';
import api from '../API/Server';
import Cookies from 'js-cookie';

const AddContact = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');

  const [redirect, setRedirect] = useState(false);
  const [status, setStatus] = useState('');

  const handlerSubmit = (e) => {
    e.preventDefault();
    api
      .post('/addcontact', {
        name: name,
        email: email,
      })
      .then((res) => {
        if (res.data.message) {
          setStatus(res.data.message);
          setTimeout(() => {
            setStatus('');
          }, 3000);
        } else {
          setRedirect(true);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  if (redirect) {
    return <Redirect to="/" />;
  }

  const tokenCookies = Cookies.get('token_user');
  if (!tokenCookies) {
    return <Redirect to="/login" />;
  }
  return (
    <>
      <div class="container mt-5">
        <div class="card">
          <nav class="nav">
            <Link class="nav-link active" aria-current="page" to="/">
              Contacts App
            </Link>
            <Link class="nav-link active ms-auto" aria-current="page" to="/">
              Go Back
            </Link>
          </nav>
        </div>
        <div class="card mt-3">
          {status && (
            <div class="alert alert-success" role="alert">
              {status}
            </div>
          )}
          <form onSubmit={handlerSubmit}>
            <div class="mb-3">
              <label for="name" class="form-label">
                Name
              </label>
              <input
                type="text"
                class="form-control"
                id="name"
                placeholder="Enter your name"
                onChange={(e) => {
                  setName(e.target.value);
                }}
              />
            </div>
            <div class="mb-3">
              <label for="email" class="form-label">
                Email address
              </label>
              <input
                type="email"
                class="form-control"
                id="email"
                placeholder="Enter your email"
                onChange={(e) => {
                  setEmail(e.target.value);
                }}
              />
            </div>
            <button type="submit" class="btn btn-primary">
              Submit
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default AddContact;
