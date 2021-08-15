import React from 'react';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import api from '../../API/Server';
import { getContacts } from '../../Redux/Actions/Actions';

const CardsContacts = ({ contacts, index }) => {
  const dispatch = useDispatch();
  const handlerDelete = (e) => {
    e.preventDefault();
    api
      .delete('/' + contacts.id)
      .then((res) => {
        dispatch(getContacts(res.data));
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <>
      <tr>
        <th scope="row">{index}</th>
        <td>{contacts.name}</td>
        <td>{contacts.email}</td>
        <td>
          <Link to={`/update/${contacts.id}`}>
            <button class="btn btn-success me-2">Edit</button>
          </Link>
          <button class="btn btn-danger me-2" onClick={handlerDelete}>
            Delete
          </button>
        </td>
      </tr>
    </>
  );
};

export default CardsContacts;
