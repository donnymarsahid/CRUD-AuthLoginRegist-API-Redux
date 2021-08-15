import { ActionTypes } from '../ActionTypes/ActionTypes';

export const getContacts = (data) => {
  return {
    type: ActionTypes.GET_CONTACTS,
    payload: data,
  };
};
