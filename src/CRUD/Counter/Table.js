import React from 'react';
import { connect } from 'react-redux';
import CardsContacts from '../Cards/CardsContacts';

const Table = (props) => {
  const cardContacts = props.contacts.map((contacts, index) => {
    return <CardsContacts contacts={contacts} index={index + 1} />;
  });
  return (
    <>
      <table class="table">
        <thead>
          <tr>
            <th scope="col">No.</th>
            <th scope="col">Name</th>
            <th scope="col">Email</th>
            <th scope="col">Action</th>
          </tr>
        </thead>
        <tbody>{cardContacts}</tbody>
      </table>
    </>
  );
};

const mapStateToProps = (state) => {
  return {
    contacts: state.contacts,
  };
};

export default connect(mapStateToProps)(Table);
