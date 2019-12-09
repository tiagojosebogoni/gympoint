import produde from 'immer';

const INITIAL_STATE = {
  token: null,
  signed: 123,
};

export default function auth(state = INITIAL_STATE, action) {
  return produde(state, draft => {
    switch (action.type) {
      case '@auth/SIGN_IN_REQUEST': {
        draft.loading = true;
        break;
      }
      case '@auth/SIGN_IN_SUCCESS': {
        draft.tokne = action.payload.token;
        draft.signed = true;
        break;
      }

      default:
    }
  });
}