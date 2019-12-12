import { takeLatest, call, all, put } from 'redux-saga/effects';
import { signInSuccess } from './actions';
import history from '../../../services/history';
import api from '../../../services/api';

export function* signIn({ payload }) {
  const { email, password } = payload;

  const response = yield call(api.post, 'sessions', { email, password });

  const { token, user } = response.data;

  yield put(signInSuccess(token, user));
  history.push('/Student/list');
}

export function setToken({ payload }) {
  if (!payload) return;

  const { token } = payload.auth;

  if (token) {
    api.defaults.headers.Authorization = `Bearer ${token}`;
  }
}

export default all([
  takeLatest('@auth/SIGN_IN_REQUEST', signIn),
  takeLatest('persist/REHYDRATE', setToken),
]);
