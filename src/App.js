import React, { useState, useEffect } from 'react';
import personService  from './services/personService';
import './App.css';
const Filter = ({ filter, setFilter }) => {
  return (
    <div>
      Filter with:{" "}
      <input type="text" value={filter} onChange={(e) => setFilter(e.target.value)} />
    </div>
  );
};
const PersonList = ({ filteredPersons }) => {
  return (
    <div>
      <h2>Numbers</h2>
      {filteredPersons.map((person, index) => (
        <div key={person.name}>
          <p>{person.name}: {person.number}</p>
          <button onClick={() => personService.deletePerson(person.id)}>Delete</button>
        </div>
      ))}
    </div>
  );
};

const PersonForm = ({
  newName,
  newNumber,
  handleNameChange,
  handleNumberChange,
  addPerson,
}) => {
  return (
    <form onSubmit={addPerson}>
      <div>
        name: <input value={newName} onChange={handleNameChange} /><br/>
        number: <input value={newNumber} onChange={handleNumberChange} />
      </div>
      <div>
        <button type="submit">add</button>
      </div>
    </form>
  );
};

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-1234567' },
    { name: 'Ada Lovelace', number: '39-44-5323523' },
    { name: 'Dan Abramov', number: '12-43-234345' }
  ]);

  const [filter, setFilter] = useState("");
  const [newName, setNewName] = useState('');
  const [newNumber, setNewNumber] = useState('');
  
  useEffect(() => {
    personService.getAll()
      .then(initialPersons => {
        setPersons(initialPersons);
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });
  }, []);

  const handleNumberChange = (e) => {
    setNewNumber(e.target.value);
  }

  const handleNameChange = (e) => {
    setNewName(e.target.value);
  }

  const isValidPhoneNumber = (number) => {
    const phoneNumberPattern = /^[0-9\s-]+$/;
    return phoneNumberPattern.test(number);
  };

  const addPerson = (e) => {
    e.preventDefault();

    if (newName === '') {
      alert(`Please enter a name`);
      return;
    } else if (newNumber === '') {
      alert(`Please enter a number`);
      return;
    }else if (persons.some(person => person.name === newName && person.number !== newNumber)) { // if the person is already in the phonebook but the number is different, ask if the user wants to update the number
      if (window.confirm(`${newName} is already added to phonebook, replace the old number with the new one?`)) {
        const personToUpdate = persons.find(person => person.name === newName);
        const updatedPerson = { ...personToUpdate, number: newNumber };
        personService.update(personToUpdate.id, updatedPerson)
          .then(returnedPerson => {
            setPersons(persons.map(person => person.id !== personToUpdate.id ? person : returnedPerson));
            setNewName('');
            setNewNumber('');
          })
          .catch(error => {
            console.error('Error updating person:', error);
          });
      } else {
        setNewName('');
        setNewNumber('');
        return;
      }
    }else if (persons.some(person => person.number === newNumber)) {
      alert(`${newNumber} is already added to phonebook`);
      setNewNumber('');
      return;
    }else if (newName.length > 40) {
      alert(`The name must be less than 40 characters`);
      return;
    } else if (!isValidPhoneNumber(newNumber)) {
      alert(`${newNumber} is not a valid phone number`);
      setNewNumber('');
      return;
    } else {
      const newPerson = {
        name: newName,
        number: newNumber
      };
      personService.create(newPerson)
        .then(returnedPerson => {
          setPersons(persons.concat(returnedPerson));
          setNewName('');
          setNewNumber('');
        })
        .catch(error => {
          console.error('Error adding person:', error);
        });
    }
  };

  const filteredPersons = persons.filter(person => {
    const personName = person.name.toLowerCase(); // personName is the value of the name property of the person object. It is converted to lowercase to make the search case insensitive
    const personNumber = person.number.toLowerCase(); // personNumber is the value of the number property of the person object. It is converted to lowercase to make the search case insensitive
    const filterText = filter.toLowerCase();    // filterText is the value of the filter input field. It is converted to lowercase to make the search case insensitive

    return personName.includes(filterText) || personNumber.includes(filterText); // returns true or false for each person object in the array
  });
  return (
    <div>
      <h2>Phonebook</h2>
      <div className="addedPerson"></div>
      <div>
        <Filter filter={filter} setFilter={setFilter} />
      </div>
      <h2>Add a new</h2>
      <PersonForm
        newName={newName}
        newNumber={newNumber}
        handleNameChange={handleNameChange}
        handleNumberChange={handleNumberChange}
        addPerson={addPerson}
      />
      <PersonList filteredPersons={filteredPersons} />
      {/* Debug button to update the person list */}
      {/* <button onClick={() => personService.getAll().then(initialPersons => setPersons(initialPersons))}>Update person list</button> */}
    </div>
  );
};

export default App;
