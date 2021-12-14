import React, { useRef, useState } from 'react';
import { FormFieldCollectorContext } from './Form';
import PropTypes from 'prop-types';

export default function Textfield(props) {
  const [value, setValue] = useState('a');
  const [errors, setErrors] = useState([]);
  const [validate, setValidate] = useState(props.validate);

  function __change(event, form_collector) {
    let errors = [];
    let v = event.target.value;
    // validations
    if (props.required) {
      if (v.trim().length === 0) {
        errors.push('This field is required');
      }
    }

    if (props.min_length) {
      if (v.length < props.min_length) {
        errors.push(
          'Value should at least be ' + props.min_length + ' in length.'
        );
      }
    }

    if (props.validations && props.validations.length > 0) {
      props.validations.map((validation) => {
        if (validation === 'email') {
          if (v.length > 0) {
            if (
              !v.match(
                /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([0-9A-Za-z]{2,15})$/
              )
            ) {
              errors.push('Invalid email format');
            }
          }
        }
      });
    }

    setErrors(errors);

    if (form_collector) {
      form_collector(event.target.value, props.name, errors);
    } else {
      console.log('No collector function');
    }
  }

  return (
    <div style={{ paddingTop: '8px' }}>
      <span className="text-label">{props.label}</span>
      <div>
        <FormFieldCollectorContext.Consumer>
          {({ form_collector, form_submit }) => {
            return (
              <input
                autoComplete={'off'}
                disabled={props.disabled}
                onChange={(e) => __change(e, form_collector)}
                name={props.name}
                className={[props.required ? 'required' : ''].join(' ')}
                type={props.password ? 'password' : 'text'}
              />
            );
          }}
        </FormFieldCollectorContext.Consumer>
      </div>
      {props.caption ? (
        <span className="text-caption">{props.caption}</span>
      ) : null}
      {errors && errors.length > 0 ? (
        <ol className={'field-errors-list'}>
          {errors.map((e, idx) => {
            return (
              <li style={{ color: 'red' }} key={idx}>
                {e}
              </li>
            );
          })}
        </ol>
      ) : null}
    </div>
  );
}

Textfield.propTypes = {
  name: PropTypes.string.isRequired,
  disabled: PropTypes.bool,
  label: PropTypes.string.isRequired,
  validations: PropTypes.array,
};
