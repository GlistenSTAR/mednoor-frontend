import api from '../utils/api';
import { errors } from '../store';

// Save template
export const saveTemplate = async tempData => {
  const res = await api.post('/temps/createTemp', tempData);

  if (res.msg === 'success') {
    console.log(res.msg);
  } else {
    console.log(res.data);
    errors.set(res.data);
  }
}