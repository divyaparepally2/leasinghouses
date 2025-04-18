import React, { useState, useRef } from "react";
import ReusableComponents from './reusableComponents';
import styles from './loginStyles.module.css';
import { useNavigate } from 'react-router-dom';
import { Form, Button } from 'react-bootstrap';

function Ownership() {
    const [ownerName, setOwnerName] = useState('');
    const [propertyAddress, setPropertyAddress] = useState('');
    const [mailingAddress, setMailingAddress] = useState('');
    const [propertyUse, setPropertyUse] = useState('');
    const [parcelNumber, setParcelNumber] = useState('');
    const [lotSize, setLotSize] = useState('');
    const [buildingSize, setBuildingSize] = useState('');
    const [taxAssessments, setTaxAssessments] = useState('');
    const [lastSaleDate, setLastSaleDate] = useState('');
    const [lastSalePrice, setLastSalePrice] = useState('');
    const [mortgageInfo, setMortgageInfo] = useState('');
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
            <h1>{"Welcome to OwnerShip Page"}</h1>
            <h1 style={{textAlign: 'center'}}>Ownership</h1>
            <div className="content inner-content">
                <div className="container">
                    <div className="row" id="propertyInfo">
                        <div className="col-lg-8">
                            <div className={styles.addPropertyInfo}>
                                <div className="row">
                                    <div className="col-md-12">
                                        <ReusableComponents
                                            componentType = "input"
                                            label="Owner Name(s) (individual or LLC)"
                                            type="text"
                                            value={ownerName}
                                            classNameLabel={styles.propertyFormLabel}
                                            classNameInput={styles.propertyFormInput}
                                            onChange={(e) => setOwnerName(e.target.value)}
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
                                            placeholder="Enter Property Address"
                                        />
                                    </div>
                                    <div className="col-md-12">
                                        <ReusableComponents
                                            componentType = "input"
                                            label="Mailing Address"
                                            type="text"
                                            value={mailingAddress}
                                            classNameLabel={styles.propertyFormLabel}
                                            classNameInput={styles.propertyFormInput}
                                            onChange={(e) => setMailingAddress(e.target.value)}
                                            placeholder="Enter Mailing Address"
                                        />
                                    </div>
                                    <div className="col-md-12">
                                        <ReusableComponents
                                            componentType = "input"
                                            label="Property use (residential, commercial, etc.)"
                                            type="text"
                                            value={propertyUse}
                                            classNameLabel={styles.propertyFormLabel}
                                            classNameInput={styles.propertyFormInput}
                                            onChange={(e) => setPropertyUse(e.target.value)}
                                            placeholder="Enter Property Use"
                                        />
                                    </div>
                                    <div className="col-md-12">
                                        <ReusableComponents
                                            componentType = "input"
                                            label="Parcel Number (APN) / Property ID"
                                            type="text"
                                            value={parcelNumber}
                                            classNameLabel={styles.propertyFormLabel}
                                            classNameInput={styles.propertyFormInput}
                                            onChange={(e) => setParcelNumber(e.target.value)}
                                            placeholder="Enter Parcel Number"
                                        />
                                    </div>
                                    <div className="col-md-12">
                                        <ReusableComponents
                                            componentType = "input"
                                            label="Lot Size"
                                            type="number"
                                            value={lotSize}
                                            classNameLabel={styles.propertyFormLabel}
                                            classNameInput={styles.propertyFormInput}
                                            onChange={(e) => setLotSize(e.target.value)}
                                            placeholder="Enter Lot Size"
                                        />
                                    </div>
                                    <div className="col-md-12">
                                        <ReusableComponents
                                            componentType = "input"
                                            label="Building Size"
                                            type="number"
                                            value={buildingSize}
                                            classNameLabel={styles.propertyFormLabel}
                                            classNameInput={styles.propertyFormInput}
                                            onChange={(e) => setBuildingSize(e.target.value)}
                                            placeholder="Enter Building Size"
                                        />
                                    </div>
                                    <div className="col-md-12">
                                        <ReusableComponents
                                            componentType = "input"
                                            label="Tax assessments"
                                            type="text"
                                            value={taxAssessments}
                                            classNameLabel={styles.propertyFormLabel}
                                            classNameInput={styles.propertyFormInput}
                                            onChange={(e) => setTaxAssessments(e.target.value)}
                                            placeholder="Enter Tax assessments"
                                        />
                                    </div>
                                    <div className="col-md-12">
                                        <ReusableComponents
                                            componentType = "input"
                                            label="Last Sale Price"
                                            type="number"
                                            value={lastSalePrice}
                                            classNameLabel={styles.propertyFormLabel}
                                            classNameInput={styles.propertyFormInput}
                                            onChange={(e) => setLastSalePrice(e.target.value)}
                                            placeholder="Enter Last Sale Price"
                                        />
                                    </div>
                                    <div className="col-md-12">
                                        <ReusableComponents
                                            componentType = "input"
                                            label="Last Sale Date"
                                            type="date"
                                            value={lastSaleDate}
                                            classNameLabel={styles.propertyFormLabel}
                                            classNameInput={styles.propertyFormInput}
                                            onChange={(e) => setLastSaleDate(e.target.value)}
                                        />
                                    </div>
                                    <div className="col-md-12">
                                        <ReusableComponents
                                            componentType = "input"
                                            label="Mortgage or lien info (if available)"
                                            type="text"
                                            value={mortgageInfo}
                                            classNameLabel={styles.propertyFormLabel}
                                            classNameInput={styles.propertyFormInput}
                                            onChange={(e) => setMortgageInfo(e.target.value)}
                                            placeholder="Enter Mortgage or lien info"
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

export default Ownership;