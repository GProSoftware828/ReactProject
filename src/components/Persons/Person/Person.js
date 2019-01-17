import React from 'react';
import classes from './Person.css';
import WithClass from '../../hoc/WithClass';
import PropTypes from 'prop-types';

class Person extends React.Component {

  componentDidMount = () => {
    if (this.props.position === 0) {
      this.inputElement.focus();
    }
  }

  render() {

    return (
      <WithClass classes={classes.Person}>
        {this.props.authenticated ? <p>I'm authenticated!</p> : null}
        <p onClick={this.props.click}>I'm {this.props.name}! and I'm {this.props.age} years old!</p>
        <p>{this.props.children}</p>
        <label>Name?</label> <br />
        <input
          ref={(inp) => { this.inputElement = inp }}
          type="text"
          onChange={this.props.changed}
          value={this.props.name} />
      </WithClass>
    );
  }
}

Person.PropTypes = {
  click: PropTypes.func,
  name: PropTypes.string,
  age: PropTypes.number,
  changed: PropTypes.func
};

export default Person;