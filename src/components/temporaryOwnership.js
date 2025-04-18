import React, { useState, useRef } from "react";
import ReusableComponents from './reusableComponents';
import styles from './loginStyles.module.css';
import { useNavigate } from 'react-router-dom';
import { Form, Button } from 'react-bootstrap';

function TemporaryOwnership() {
    const [personName, setPersonName] = useState('');
    const [propertyAddress, setPropertyAddress] = useState('');
    const [leaseStartDate, setLeaseStartDate] = useState('');
    const [leaseEndDate, setLeaseEndDate] = useState('');
    const [propertyName, setPropertyName] = useState('');
    const [propertyDocuments, setPropertyDocuments] = useState('');
    const [selectedFile, setSelectedFile] = useState(null);

    const fileInputRef = useRef(null);
    
    
    const handleFileChange = (event) => {
        setSelectedFile(event.target.files[0].name);
        setPropertyDocuments(propertyDocuments + ',' + event.target.files[0].name);
    };
    
    const handleUploadClick = () => {
        fileInputRef.current?.click();
    };

    const navigate = useNavigate();
    const navigateToPropertyPage = () => {
        navigate('/propertyPage');
    };
    return(
        <div>
            <h1>{"Welcome to Temporary OwnerShip Page"}</h1>
            <h1 style={{textAlign: 'center'}}>Temporary Ownership</h1>
            <div className="content inner-content">
                <div className="container">
                    <div className="row" id="propertyInfo">
                        <div className="col-lg-8">
                            <div className={styles.addPropertyInfo}>
                                <div className="row">
                                    <div className="col-md-12">
                                        <ReusableComponents
                                            componentType = "input"
                                            label="Name of Person"
                                            type="text"
                                            value={personName}
                                            classNameLabel={styles.propertyFormLabel}
                                            classNameInput={styles.propertyFormInput}
                                            onChange={(e) => setPersonName(e.target.value)}
                                            placeholder="Enter Name"
                                        />
                                    </div>
                                    <div className="col-md-12">
                                        <ReusableComponents
                                            componentType = "input"
                                            label="Property Address"
                                            type="text"
                                            value={propertyAddress}
                                            classNameLabel={styles.propertyFormLabel}
                                            classNameInput={styles.propertyFormInput}
                                            onChange={(e) => setPropertyAddress(e.target.value)}
                                            placeholder="Enter Address"
                                        />
                                    </div>
                                    <div className="col-md-12">
                                        <ReusableComponents
                                            componentType = "input"
                                            label="Lease Start Date"
                                            type="date"
                                            value={leaseStartDate}
                                            classNameLabel={styles.propertyFormLabel}
                                            classNameInput={styles.propertyFormInput}
                                            onChange={(e) => setLeaseStartDate(e.target.value)}
                                        />
                                    </div>
                                    <div className="col-md-12">
                                        <ReusableComponents
                                            componentType = "input"
                                            label="Lease End Date"
                                            type="date"
                                            value={leaseEndDate}
                                            classNameLabel={styles.propertyFormLabel}
                                            classNameInput={styles.propertyFormInput}
                                            onChange={(e) => setLeaseEndDate(e.target.value)}
                                        />
                                    </div>
                                    <div className="col-md-12">
                                        <ReusableComponents
                                            componentType = "input"
                                            label="Property Name"
                                            type="text"
                                            value={propertyName}
                                            classNameLabel={styles.propertyFormLabel}
                                            classNameInput={styles.propertyFormInput}
                                            onChange={(e) => setPropertyName(e.target.value)}
                                            placeholder="Enter Name"
                                        />
                                    </div>
                                    <div className="col-md-8">
                                        <ReusableComponents
                                            componentType = "input"
                                            label="Property Documents"
                                            type="text"
                                            value={propertyDocuments}
                                            classNameLabel={styles.propertyFormLabel}
                                            classNameInput={styles.propertyFormInput}
                                            placeholder="Select Documents"
                                            disable={true}
                                        />
                                    </div>
                                    <div className="col-md-4">
                                        <Form.Control
                                            type="file"
                                            onChange={handleFileChange}
                                            style={{ display: 'none' }}
                                            ref={fileInputRef}
                                        />
                                        <Button variant="primary" onClick={handleUploadClick}>
                                            Upload Documents
                                        </Button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className={styles.addPropertyInfo}>
                        <div className="row">
                            <div className="col-md-12">
                                <div className={styles.propertyForm}>
                                    <button className={styles.propertyButton} onClick={navigateToPropertyPage}>Submit</button>
                                    <button className={styles.propertyButton}>Reset</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default TemporaryOwnership;