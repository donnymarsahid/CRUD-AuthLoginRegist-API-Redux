import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import api from '../API/Server';
import { getContacts } from '../Redux/Actions/Actions';
import Table from './Counter/Table';
import Cookies from 'js-cookie';
import { Redirect } from 'react-router-dom';

const Homepage = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    api
      .get('/')
      .then((res) => {
        dispatch(getContacts(res.data));
      })
      .catch((err) => {
        console.log(err);
      });
  }, [dispatch]);

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
            <Link class="nav-link active ms-auto" aria-current="page" to="/addcontact">
              Add Contacts
            </Link>
          </nav>
        </div>
        <div class="card mt-3">
          <Table />
        </div>
      </div>
    </>
  );
};

export default Homepage;
