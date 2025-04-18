import React from "react";
import Form from 'react-bootstrap/Form';
import styles from './loginStyles.module.css';

function ReusableComponents({ componentType, label, type, value, onChange, classNameLabel, classNameInput, placeholder, options, disable, id }) {
    if(componentType === 'input') {
        return (
            <div className={styles.propertyForm}>
              <Form.Group controlId="myTextField">
                <Form.Label className={classNameLabel}>{label}</Form.Label>
                <Form.Control className={classNameInput} type={type} value={value} onChange={onChange} placeholder={placeholder} disabled={disable || false}/>
              </Form.Group>
            </div>
        );
    }
    else if(componentType === 'select') {
      return (
        <div className={classNameInput}>
          <label htmlFor="mySelect">{label}</label>
          <Form.Select id={id} value={value} onChange={onChange} aria-label="Select a value">
            {options.map((val) => (
              <option key={val.value} value={val.value}>
                  {val.label}
              </option>
            ))}
          </Form.Select>
        </div>
      )
    }
  }

  export default ReusableComponents;