import React, { Component } from 'react'
import { Route } from 'react-router-dom'
import ListContacts from './ListContacts'
import * as ContactsAPI from './utils/ContactsAPI'
import CreateContact from './CreateContact'

class App extends Component {
  state = {
    screen: 'list',
    contacts: []
    
  }

  componentDidMount() {
    ContactsAPI.getAll().then((contacts)=> {
      this.setState({ contacts })
    })
  }
  removeContact = contact => {
    this.setState( state => ({
      contacts: this.state.contacts.filter((c) => c.id !== contact.id)

    }));
    ContactsAPI.remove(contact)
  };

  createContact(contact) {
    ContactsAPI.create(contact).then(contact => {
      this.setState(state => ({
        contacts: state.contacts.concat([ contact ])
      }))
    })
  }

  render() {
    return (
      <div>
        <Route exact path='/' render={() => (
          <ListContacts
            onDeleteContact={this.removeContact}
            contacts={this.state.contacts}
            onNavigate = {() => {
              this.setState({ screen: 'create'})
            }}
          />
        )}/>
        <Route path='/create' render={({ history }) => (
          <CreateContact
          onCreateContact={(contact) => {
            this.createContact(contact)
            history.push('/')
          }}
          />
        )}/>
      </div>
    )
  }
}

export default App;
