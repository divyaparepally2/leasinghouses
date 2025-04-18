import React, { useState } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit } from '@fortawesome/free-solid-svg-icons';
import styles from './loginStyles.module.css';
import { useNavigate } from 'react-router-dom';
import { Form } from 'react-bootstrap';

function AlphaPropertyPage() {
    const [isEnabled, setIsEnabled] = useState(false);

    const handleToggle = () => {
      setIsEnabled(!isEnabled);
      if(isEnabled) {
        navigate('/listings');
      }
    };
    const navigate = useNavigate();
    const navigateToHousePage = () => {
        navigate('/house');
    };
    return(
        <div>
            <h1>{"Welcome to Alpha Property Page"}</h1>
            <h1 style={{textAlign: 'center'}}>Property Page</h1>
            <div className="content inner-content">
                <div className="container">
                <div className={styles.addPropertyInfo}>
                        <div className="row">
                            <div className="col-md-12">
                                <div className={styles.propertyForm}>
                                    <div className={styles.displayInline}>
                                        <h6>Alpha Property</h6>
                                        <FontAwesomeIcon icon={faEdit} style={{marginTop: '4px', paddingLeft: '10px'}} onClick={navigateToHousePage}/>
                                    </div>
                                </div>
                                <div className={styles.propertyForm}>
                                    <div className={styles.displayInline}>
                                        <Form>
                                            <Form.Check
                                                reverse
                                                type="switch"
                                                id="custom-switch"
                                                label="List the Property"
                                                checked={isEnabled}
                                                onChange={handleToggle}
                                            />
                                        </Form>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default AlphaPropertyPage;