import axios from 'axios';
const baseUrl = 'http://localhost:3001/persons';

const getAll = () => {
  return axios.get(baseUrl).then(response => response.data);
}

const create = newPerson => {
  return axios.post(baseUrl, newPerson).then(response => response.data);
}

const update = (id, newPerson) => {
  return axios.put(`${baseUrl}/${id}`, newPerson).then(response => response.data);
}

const deletePerson = id => {
  //asks the user with window.confirm are they sure they want to delete the person, if the user clicks cancel, the function returns without doing anything
  //if the user clicks ok, the person is deleted from the server by making an HTTP DELETE request to the resource's URL
  if (window.confirm(`Are you sure you want to delete this person?`)) {
    return axios.delete(`${baseUrl}/${id}`).then(window.location.reload());
  }else {
    return;
  }
}

const personService = {
  getAll,
  create,
  update,
  deletePerson
};

export default personService;
// Compare this snippet from src\components\personForm.js: