import React from "react";
import Card from 'react-bootstrap/Card';
import Form from 'react-bootstrap/Form';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLocationDot } from '@fortawesome/free-solid-svg-icons';
import styles from './loginStyles.module.css';
import { useState } from "react";
import Modal from 'react-bootstrap/Modal';
import { Link } from 'react-router-dom';
import Accordion from 'react-bootstrap/Accordion';

function Profile() {
    const [selectedOption, setSelectedOption] = useState('');
    const [isPropertyTypeModalOpen, setIsPropertyTypeModalOpen] = useState(false);
    const [isPropertyDetailsModelOpen, setIsPropertyDetailsModelOpen] = useState(false);
    const handleChange = (event) => {
        setSelectedOption(event.target.value);
    };
    const openPropertyType = () => {
        setIsPropertyTypeModalOpen(!isPropertyTypeModalOpen);
    };

    const openPropertyDetails = (value) => {
        setIsPropertyTypeModalOpen(!value);
        setIsPropertyDetailsModelOpen(value);
    }
    const personalInfo = [
        {
            id: 1,
            name: 'Person Legal Name 1',
            location: 'Dallas'
        },
        {
            id: 2,
            name: 'Person Legal Name 2',
            location: 'Texas'
        }
    ]
    const options = [
        { value: '', label: 'Select' },
        { value: 'owner', label: 'Owner' },
        { value: 'tenant', label: 'Tenant' }
    ]
    return(
        <div>
            <h1>{"Welcome to Profile page"}</h1>
            <ul style={{ listStyleType: "none" }}>
            {personalInfo.map(item => (
                <li key={item.id}>
                    <Card style={{ width: '20rem', marginBottom: '20px' }}>
                        <Card.Body>
                            <Card.Title>{item.name}</Card.Title>
                            <div className={styles.displayInline}>
                                <FontAwesomeIcon icon={faLocationDot} style={{marginTop: '4px', paddingRight: '5px'}}/>
                                <Card.Text>{item.location}</Card.Text>
                            </div>
                        </Card.Body>
                        <div className={styles.displayInline}>
                            <label htmlFor="mySelect">Select an option:</label>
                            <Form.Select value={selectedOption} onChange={handleChange}>
                            {options.map((option) => (
                                <option key={option.value} value={option.value}>
                                    {option.label}
                                </option>
                            ))}
                            </Form.Select>
                        </div>
                    </Card>
                    {selectedOption === 'owner' && <button onClick={openPropertyType}>Add Property</button>}
                </li>
            ))}
            </ul>
            <div>
                <Modal show={isPropertyTypeModalOpen} onHide={openPropertyType} backdrop="static" centered size="lg">
                    <Modal.Header closeButton>
                        <Modal.Title> Property Type</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Accordion>
                            <Accordion.Item eventKey="0">
                                <Accordion.Header>Residential Properties</Accordion.Header>
                                <Accordion.Body>
                                <ul style={{ listStyleType: "none" }}>
                                    <li>
                                        <button onClick={(e) => openPropertyDetails(true)} className={styles.propertyTypeButton}>House</button>
                                        <button className={styles.propertyTypeButton}>Apartment</button>
                                        <button className={styles.propertyTypeButton}>Town Homes</button>
                                        <button className={styles.propertyTypeButton}>Communities</button>
                                        {/* <p><Link to={'/house'}>House</Link></p>
                                        <p><Link to={'/house'}>Apartment</Link></p>
                                        <p><Link to={'/house'}>Town Homes</Link></p>
                                        <p><Link to={'/house'}>Communities</Link></p> */}
                                    </li>
                                </ul>
                                </Accordion.Body>
                            </Accordion.Item>
                        </Accordion>
                    </Modal.Body>
                </Modal>
            </div>
            <div>
                <Modal show={isPropertyDetailsModelOpen} onHide={(e) => openPropertyDetails(false)} centered>
                    <Modal.Header closeButton>
                        <Modal.Title> Property Details</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Accordion>
                            <Accordion.Item eventKey="0">
                                <Accordion.Header>Document Type</Accordion.Header>
                                <Accordion.Body>
                                <ul style={{ listStyleType: "none" }}>
                                    <li>
                                        <p><Link to={'/temporaryOwnership'}>Lease/Rental Agreement</Link></p>
                                        <p><Link to={'/ownership'}>Ownwership Documents</Link></p>
                                    </li>
                                </ul>
                                </Accordion.Body>
                            </Accordion.Item>
                        </Accordion>
                    </Modal.Body>
                </Modal>
            </div>
        </div>
    )
}

export default Profile;