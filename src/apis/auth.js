import { navigate } from 'svelte-navigator';

import api from '../utils/api';
import { auth } from '../store';

// Load User
export const loadUser = async () => {
  const res = await api.get('/users/auth');

  if (res.status === undefined) {
    auth.user.set(res);
    auth.isAuthenticated.set(true);
  } else {
    console.log(res.data);
  }
};

// Register User
export const register = async newUser => {
  const res = await api.post('/users/signup', newUser);

  if (res.status === undefined) {
    navigate('/', { replace: true });
  } else {
    console.log(res.data);
  }
};

// Login User
export const login = async userData => {
  const res = await api.post('/users/signin', userData);
  if (res.status === undefined) {
    localStorage.setItem('token', res.token);
    auth.isAuthenticated.set(true);
    navigate('/template', { replace: true });
  } else {
    console.log(res.data);
  }
};

// Logout User
export const logout = async () => {
  localStorage.removeItem('token');
  auth.user.set([]);
  auth.isAuthenticated.set(false);
  navigate('/login', { replace: true });
}
