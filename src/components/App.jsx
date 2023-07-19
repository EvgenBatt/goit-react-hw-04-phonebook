import { Component } from 'react';
import { Filter } from './Filter/Filter';
import { ContactForm } from './ContactForm/ContactForm';
import { ContactList } from './ContactList/ContactList';
import { Title, SubTitle, EmptyContact } from './App.styled';
import toast, { Toaster } from 'react-hot-toast';

export class App extends Component {
  state = {
    contacts: [
      { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
      { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
      { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
      { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
    ],
    filter: '',
  };

  componentDidMount() {
    const LocalData = localStorage.getItem('users');
    if (LocalData) this.setState({ contacts: JSON.parse(LocalData) });
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.contacts !== this.state.contacts)
      localStorage.setItem('users', JSON.stringify(this.state.contacts));
  }

  changeFilter = ({ target: { value } }) => {
    this.setState({ filter: value });
  };

  removeContact = id => {
    toast.error('Delete user successfully');
    this.setState(prev => ({
      contacts: prev.contacts.filter(contact => contact.id !== id),
    }));
  };

  addContact = contact => {
    toast.success('Create new user successfully');
    this.setState(prevState => {
      const isExist = prevState.contacts.find(
        ({ name }) => name.toLowerCase() === contact.name.toLowerCase()
      );

      if (isExist) {
        alert(`${contact.name} is already in contacts.`);
        return;
      }

      return { contacts: [contact, ...prevState.contacts] };
    });
  };

  getFilterContacts = () => {
    const { filter, contacts } = this.state;
    const normalizedFilter = filter.toLowerCase();

    return contacts.filter(contact =>
      contact.name.toLowerCase().includes(normalizedFilter)
    );
  };

  render() {
    const { filter } = this.state;
    const filterContacts = this.getFilterContacts();

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
        <ContactForm onSubmit={this.addContact} />
        <SubTitle>Contacts</SubTitle>
        {this.state.contacts.length > 0 ? (
          <Filter value={filter} onChange={this.changeFilter} />
        ) : (
          <EmptyContact>
            Your phonebook is empty. Add first contact!
          </EmptyContact>
        )}
        {this.state.contacts.length > 0 && (
          <ContactList
            contacts={filterContacts}
            onRemoveContact={this.removeContact}
          />
        )}
      </div>
    );
  }
}
