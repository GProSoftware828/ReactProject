import React from 'react';
import classes from './Person.css';
import WithClass from '../../../hoc/WithClass';
import Aux from '../../../hoc/Aux';
import PropTypes from 'prop-types';
import { AuthContext } from '../../../containers/App';

class Person extends React.Component {

  componentDidMount = () => {
    if (this.props.position === 0) {
      this.inputElement.focus();
    }
  }

  render() {

    return (
      <WithClass classes={classes.Person}>
        <Aux>
          <AuthContext.Consumer>
            {auth => this.props.authenticated ? <p>I'm authenticated!</p> : null}
          </AuthContext.Consumer>
          <p onClick={this.props.click}>I'm {this.props.name}! and I'm {this.props.age} years old!</p>
          <p>{this.props.children}</p>
          <label>Name?</label> <br />
          <input
            ref={(inp) => { this.inputElement = inp }}
            type="text"
            onChange={this.props.changed}
            value={this.props.name} />
        </Aux>
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