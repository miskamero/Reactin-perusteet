import React, { useState } from 'react';

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
      {filteredPersons.map((person) => (
        <div key={person.name}>
          {person.name}: {person.number}
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

    if (persons.some(person => person.name === newName)) {
      alert(`${newName} is already added to phonebook`);
      setNewName('');
      setNewNumber('');
      return;
    } else if (newName === '') {
      alert(`Please enter a name`);
      return;
    } else if (newNumber === '') {
      alert(`Please enter a number`);
      return;
    } else if (persons.some(person => person.number === newNumber)) {
      alert(`${newNumber} is already added to phonebook`);
      setNewNumber('');
      return;
    } else if (!isValidPhoneNumber(newNumber)) {
      alert(`${newNumber} is not a valid phone number`);
      setNewNumber('');
      return;
    } else {
      const newPerson = { name: newName, number: newNumber };
      setPersons([...persons, newPerson]);
      setNewName('');
      setNewNumber('');
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
    </div>
  );
};

export default App;
