import api from '../utils/api';
import { errors } from '../store';

// Save template
export const saveTemplate = async tempData => {
  const res = await api.post('/temps/createTemp', tempData);

  if (res.msg === 'success') {
    console.log(res.msg);
    errors.set({});
  } else {
    console.log(res.data);
    errors.set(res.data);
  }
}

// Print template
export const printTemplate = async tempData => {
  const res = await api.post('/temps/printTemp', tempData);

  if (res.msg === 'success') {
    console.log(res.msg);
    errors.set({});
  } else {
    console.log(res.data);
    errors.set(res.data);
  }
}

//Search templates
export const searchTemplate = async searchKeys => {
  const res = await api.post('/temps/searchTemp', searchKeys);

  if (res.msg === 'success') {
    return res.searchResults;
  } else {
    console.log(res.data);
    errors.set(res.data);
  }
}