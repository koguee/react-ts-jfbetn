import React, { useState } from 'react';
import Form from './Form';
import Textfield from './Textfield';
import Button from './Button';

export default function App() {
  const [someMessage, setSomeMessage] = useState('');

  function __submit(evt, form_obj) {
    setSomeMessage('You submitted the form!\n' + JSON.stringify(form_obj));
    console.log(form_obj);
  }

  return (
    <>
      <span>{someMessage}</span>
      <Form __submit={(evt, form_obj) => __submit(evt, form_obj)}>
        <Textfield label={'Username'} min_length={3} required name="username" />
        <Textfield
          label={'Email Address'}
          autoComplete={'off'}
          required
          name="email_address"
          caption="This is a caption"
          min_length={3}
          validations={['email']}
        />
        <br />
        <Button label={'Submit'} />
      </Form>
    </>
  );
}
