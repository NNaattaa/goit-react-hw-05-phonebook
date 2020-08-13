import React, { Component } from 'react';
import styled from 'styled-components';
import uuid from 'uuid/v4';
import Filter from './Filter';
import Layout from './Layout';
import ContactForm from './ContactForm';
import ContactList from './ContactList';
import Notification from './Notification';
import Title from './Title';
import '../base.css';

const Text = styled.p`
  font-size: 3rem;
`;

class App extends Component {
  state = {
    contacts: [],
    filter: '',
    apearNotice: false,
    notice: null,
  };

  componentDidMount() {
    const savedContacts = localStorage.getItem('contacts');

    if (savedContacts) {
      this.setState({
        contacts: JSON.parse(savedContacts),
      });
    }
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.contacts !== this.state.contacts) {
      localStorage.setItem('contacts', JSON.stringify(this.state.contacts));
    }
  }

  addContact = (name, number) => {
    const { contacts } = this.state;
    const checkedForName = contacts.find(contact => name === contact.name);
    if (checkedForName) {
      this.setState({
        notice: `${name} is already in contacts`,
        apearNotice: true,
      });

      return setTimeout(
        () =>
          this.setState({
            apearNotice: false,
          }),
        2000,
      );
    }
    const numberCheck = /^[+]*[(]{0,1}[0-9]{1,4}[)]{0,1}[-\s./0-9]*$/g;
    const checkedNumber = numberCheck.test(number);
    if (!checkedNumber) {
      this.setState({
        notice: 'Hey! This is not a real number :)',
        apearNotice: true,
      });
      return setTimeout(
        () =>
          this.setState({
            apearNotice: false,
          }),
        3000,
      );
    }
    const newContact = {
      id: uuid(),
      name,
      number,
    };
    this.setState(prevState => ({
      contacts: [...prevState.contacts, newContact],
    }));
  };

  removeContact = contactId => {
    this.setState(prevState => ({
      contacts: prevState.contacts.filter(({ id }) => id !== contactId),
    }));
  };

  changeFilter = filter => {
    this.setState({ filter });
  };

  getVisibleContacts = () => {
    const { contacts, filter } = this.state;
    return contacts.filter(({ name }) =>
      name.toLowerCase().includes(filter.toLowerCase()),
    );
  };

  render() {
    const { contacts, filter, notice, apearNotice } = this.state;
    const visibleContacts = this.getVisibleContacts();

    return (
      <Layout>
        <Title text={'Phonebook'} />
        <ContactForm onAddContact={this.addContact} />

        <Notification message={notice} apearNotice={apearNotice} />

        <Filter
          value={filter}
          onChangeFilter={this.changeFilter}
          contacts={contacts}
        />

        <ContactList
          contacts={visibleContacts}
          onRemoveContact={this.removeContact}
        />
        {contacts.length === 0 && (
          <Text>There are no contacts. Add some :)</Text>
        )}
        {contacts.length > 1 && visibleContacts.length === 0 && (
          <Text>No contacts found :(</Text>
        )}
      </Layout>
    );
  }
}

export default App;
