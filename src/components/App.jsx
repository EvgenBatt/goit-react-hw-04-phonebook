import { useEffect, useState } from 'react';
import { Filter } from './Filter/Filter';
import { ContactForm } from './ContactForm/ContactForm';
import { ContactList } from './ContactList/ContactList';
import { Title, SubTitle, EmptyContact } from './App.styled';
import toast, { Toaster } from 'react-hot-toast';

export const App = () => {
  const [contacts, setContacts] = useState(() => {
    return (
      JSON.parse(localStorage.getItem('users')) ?? [
        { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
        { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
        { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
        { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
      ]
    );
  });

  const [filter, setFilter] = useState('');

  useEffect(() => {
    const localData = localStorage.getItem('users');
    if (localData) setContacts(JSON.parse(localData));
  }, []);

  useEffect(() => {
    localStorage.setItem('users', JSON.stringify(contacts));
  }, [contacts]);

  const removeContact = id => {
    toast.error('Delete user successfully');
    setContacts(prev => prev.filter(contact => contact.id !== id));
    localStorage.setItem(
      'users',
      JSON.stringify(contacts.filter(contact => contact.id !== id))
    );
  };

  const addContact = contact => {
    toast.success('Create new user successfully');
    const isExist = contacts.some(
      ({ name }) => name.toLowerCase() === contact.name.toLowerCase()
    );

    if (isExist) {
      alert(`${contact.name} is already in contacts.`);
      return;
    }

    setContacts(prevContacts => [contact, ...prevContacts]);

    localStorage.setItem('users', JSON.stringify([contact, ...contacts]));
  };

  const changeFilter = e => {
    setFilter(e.target.value);
  };

  const getFilterContacts = () => {
    const normalizedFilter = filter.toLowerCase();

    return contacts.filter(contact =>
      contact.name.toLowerCase().includes(normalizedFilter)
    );
  };

  const filterContacts = getFilterContacts();

  return (
    <div
      style={{
        height: '100vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column',
        color: '#010101',
      }}
    >
      <Toaster />
      <Title>Phonebook</Title>
      <ContactForm onSubmit={addContact} />
      <SubTitle>Contacts</SubTitle>
      {contacts.length > 0 ? (
        <Filter value={filter} onChange={changeFilter} />
      ) : (
        <EmptyContact>Your phonebook is empty. Add first contact!</EmptyContact>
      )}
      {contacts.length > 0 && (
        <ContactList
          contacts={filterContacts}
          onRemoveContact={removeContact}
        />
      )}
    </div>
  );
};
