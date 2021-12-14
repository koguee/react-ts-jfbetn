import React, { useEffect, useRef, useState } from 'react';
import Textfield from './Textfield';

export const FormFieldCollectorContext = React.createContext(null);

export default function Form(props) {
  const [formObj, setFormObj] = useState({});

  useEffect(() => {
    // something in the future
  });

  function __submit(event) {
    event.preventDefault();
    props.children.map((child) => {
      console.log(child);
      if (child.type.name === Textfield.name) {
        // this is what i want to achieve
        // imagine the user submitted the form without modifying the Textfield
        // child.validate_field();
      }
    });
    if (props.__submit) {
      props.__submit(event, formObj);
    }
  }

  // some new function
  function form_submit() {}

  function form_collector(value, field, errors) {
    // use FormData in the future
    let aaa = { ...formObj };
    aaa[field] = value;
    setFormObj(aaa);
  }

  return (
    <FormFieldCollectorContext.Provider value={{ form_collector, form_submit }}>
      <form onSubmit={__submit} autoComplete={'off'}>
        {props.children}
      </form>
    </FormFieldCollectorContext.Provider>
  );
}
