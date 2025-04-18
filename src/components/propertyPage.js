import React from "react";
import styles from './loginStyles.module.css';
import { useNavigate } from 'react-router-dom';

function PropertyPage() {
    const navigate = useNavigate();
    const navigateToAlphaPropertyPage = () => {
        navigate('/alphaPropertyPage');
    };
    return(
        <div>
            <h1>{"Welcome to Property Page"}</h1>
            <h1 style={{textAlign: 'center'}}>Property Page</h1>
            <div className="content inner-content">
                <div className="container">
                <div className={styles.addPropertyInfo}>
                        <div className="row">
                            <div className="col-md-12">
                                <div className={styles.propertyForm}>
                                    <button className={styles.propertyButton} onClick={navigateToAlphaPropertyPage}>Property 3</button>
                                    <button className={styles.propertyButton} onClick={navigateToAlphaPropertyPage}>Property 2</button>
                                    <button className={styles.propertyButton} onClick={navigateToAlphaPropertyPage}>Property 1</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default PropertyPage;