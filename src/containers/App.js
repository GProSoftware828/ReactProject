import React, { PureComponent } from 'react';
import classes from './App.css';
import Persons from '../components/Persons/Persons';
import ErrorBoundary from './ErrorBoundary/ErrorBoundary';
import Cockpit from '../components/Cockpit/Cockpit';
import Aux from '../hoc/Aux';
import WithClass from '../hoc/WithClass';

export const AuthContext = React.createContext(false);

class App extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      persons: [
        { id: "1", name: "George", age: "Age 30" },
        { id: "2", name: "Shanhs", age: "Age 25" },
        { id: "3", name: "Stephanie", age: "Age 26" }
      ],
      otherState: 'some other value',
      showPersons: false,
      authenticated: false
    }
  }

  nameChangedHandler = (event, id) => {
    const personIndex = this.state.persons.findIndex(p => {
      return p.id === id;
    });

    const person = {
      ...this.state.persons[personIndex]
    };

    //const person = Object.assign({}, this.state.persons[personIndex]);

    person.name = event.target.value;

    const persons = [...this.state.persons];
    persons[personIndex] = person;

    this.setState({
      persons: persons
    });
  }

  deletePersonHandler = (personIndex) => {
    //const persons = this.state.persons.splice();
    const persons = [...this.state.persons];
    persons.splice(personIndex, 1);
    this.setState({ persons: persons });
  }

  togglePersonsHandler = () => {
    //this syntax has working this keyword to class
    const doesShow = this.state.showPersons;
    this.setState((prevState, props) => {
      return {
        showPersons: !doesShow,
        toggleClicked: prevState.toggleClicked + 1
      }
    });
  }

  loginHandler = () => {
    this.setState({ authenticated: true });
  }

  render() {

    //this.state.showPersons is a boolean
    let persons = null;

    if (this.state.showPersons) {
      persons =
        <Persons
          persons={this.state.persons}
          clicked={this.deletePersonHandler}
          login={this.loginHandler}
          changed={this.nameChangedHandler}
          isAuthenticated={this.state.authenticated}
        />
    }

    return (
      <WithClass classes={classes.App}>
        <ErrorBoundary><Cockpit
          showPersons={this.state.showPersons}
          persons={this.state.persons}
          clicked={this.togglePersonsHandler} /></ErrorBoundary>
        <AuthContext.Provider value={this.state.authenticated}>
          {persons}
        </AuthContext.Provider>
      </WithClass>
    );
    //return React.createElement('div', { className: 'App' }, 'Hi, I\'m a React app!')
  }
}


//higher-order component:
export default App;