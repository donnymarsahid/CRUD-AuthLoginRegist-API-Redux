import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import api from '../API/Server';
import Cookies from 'js-cookie';
import { Redirect } from 'react-router-dom';

const UpdateContact = (props) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const id = props.match.params.id;

  const [status, setStatus] = useState('');

  useEffect(() => {
    api
      .get('/update/' + id)
      .then((res) => {
        setName(res.data.name);
        setEmail(res.data.email);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [id]);

  const handlerUpdate = (e) => {
    const id = props.match.params.id;

    e.preventDefault();
    api
      .put('/update/' + id, {
        name: name,
        email: email,
      })
      .then((res) => {
        setStatus(res.data.message);
      })
      .catch((err) => {
        console.log(err);
      });
  };

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
          <form onSubmit={handlerUpdate}>
            <div class="mb-3">
              <label for="name" class="form-label">
                Name
              </label>
              <input
                type="text"
                class="form-control"
                id="name"
                placeholder="Update your name"
                defaultValue={name}
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
                placeholder="Update your email"
                defaultValue={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                }}
              />
            </div>
            <button type="submit" class="btn btn-primary">
              Update
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default UpdateContact;
