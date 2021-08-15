import { ActionTypes } from '../ActionTypes/ActionTypes';

const globalReducer = {
  contacts: [],
};

export const rootReducer = (state = globalReducer, { type, payload }) => {
  switch (type) {
    case ActionTypes.GET_CONTACTS:
      return {
        ...state,
        contacts: payload,
      };

    default:
  }
  return state;
};
