import React from 'react';
import classes from './Person.css';
import WithClass from '../../hoc/WithClass';

const Person = (props) => {
  return (
    <WithClass classes={classes.Person}>
      <p onClick={props.click}>I'm {props.name}! and I'm {props.age} years old!</p>
      <p>{props.children}</p>
      <label>Name?</label> <br />
      <input type="text" onChange={props.changed} value={props.name} />
    </WithClass>
  )
};

export default Person;