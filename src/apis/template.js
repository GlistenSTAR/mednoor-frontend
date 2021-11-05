import api from '../utils/api';
import { errors, search_result } from '../store';

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

// Update template
export const updateTemplate = async (tempData, tempId) => {
  const res = await api.put(`/temps/updateTemp/${tempId}`, tempData);

  if (res.msg === 'success') {
    console.log(res.msg);
    errors.set({});
    return res;
  } else {
    console.log(res.data);
    errors.set(res.data);
  }
}

// Print template
export const printTemplate = async tempData => {
  const res = await api.post('/temps/printTemp', tempData);

  if (res.msg === 'success') {
    errors.set({});
    window.open(`http://localhost:7000/${res.path}`);
  } else {
    console.log(res.data);
    errors.set(res.data);
  }
}

//Search templates
export const searchTemplate = async searchKeys => {
  const res = await api.post('/temps/searchTemp', searchKeys);

  if (res.msg === 'success') {
    search_result.set(res.searchResults);
  } else {
    console.log(res.data);
  }
}

// Delete template
export const deleteTemplate = async tempId => {
  const res = await api.delete(`/temps/deleteTemp/${tempId}`);

  if (res.msg === 'success') {
    console.log(res.msg);
  } else {
    console.log(res.data);
  }
}