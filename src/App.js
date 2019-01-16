import React, { Component } from 'react';
import classes from './App.css';
import Person from './Person/Person';
import ErrorBoundary from './ErrorBoundary/ErrorBoundary';

class App extends Component {
  state = {
    persons: [
      { id: "1", name: "George", age: "Age 30" },
      { id: "2", name: "Shanhs", age: "Age 25" },
      { id: "3", name: "Stephanie", age: "Age 26" }
    ],
    otherState: 'some other value',
    showPersons: false
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
    this.setState({ showPersons: !doesShow });
  }

  render() {

    //this.state.showPersons is a boolean
    let persons = null;

    let btnClass = '';

    if (this.state.showPersons) {
      persons = (
        <div>
          {this.state.persons.map((person, index) => {
            return <ErrorBoundary key={person.id}><Person
              click={() => this.deletePersonHandler(index)}
              name={person.name}
              age={person.age}

              className={btnClass}
              changed={(event) => this.nameChangedHandler(event, person.id)}
            /></ErrorBoundary>
          })}
        </div>
      );
      btnClass = classes.Red;
    };

    const assignedClasses = [];
    if (this.state.persons.length <= 2) {
      classes.push(classes.red); // classes = ['red']
    }
    if (this.state.persons.length <= 1) {
      classes.push(classes.bold);
    }

    return (
      <div className={classes.App}>
        <h1>Hi, I'm a React App</h1>
        <p className={assignedClasses.join(' ')}>This is really working!</p>
        <button
          className={btnClass}
          onClick={this.togglePersonsHandler}>Dropdown List</button>
        {persons}
      </div >
    );
    //return React.createElement('div', { className: 'App' }, 'Hi, I\'m a React app!')
  }
}

//higher-order component:
export default App;