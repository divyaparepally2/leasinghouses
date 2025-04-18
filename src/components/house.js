import React, { useState, useRef, useEffect } from "react";
import styles from './loginStyles.module.css';
import ReusableComponents from './reusableComponents';
import { Form, Button, Modal } from 'react-bootstrap';

function House() {

    useEffect(() => {
        navigator.geolocation.getCurrentPosition(pos => {
            const {latitude, longitude} = pos.coords;
            console.log('lat', latitude, longitude);

        })
    })



    const [propertyName, setPropertyName] = useState('');
    const [selectedType, setSelectedType] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('');
    const [paymentMode, setPaymentMode] = useState('');
    const [salePrice, setSalePrice] = useState('');
    const [offerPrice, setOfferPrice] = useState('');
    const [propertyId, setPropertyId] = useState('');
    const [pricePerSft, setPricePerSft] = useState('');
    const [structureType, setStructureType] = useState('');
    const [bedroomCount, setBedroomCount] = useState('');
    const [bathroomCount, setBathroomCount] = useState('');
    const [sqft, setSqftValue] = useState('');
    const [checkedItems, setCheckedItems] = useState({});
    const [propertyDocuments, setPropertyDocuments] = useState('');
    const [selectedFile, setSelectedFile] = useState(null);
    const [propertyAddress, setPropertyAddress] = useState(null);
    const [state, setState] = useState(null);
    const [city, setCity] = useState(null);
    const [landmark, setLandmark] = useState(null);
    const [zipCode, setZipCode] = useState(null);
    const [description, setDescription] = useState(null);
    const [videoLink, setVideoLink] = useState(null);
    const [embedVideoLink, setEmbedVideoLink] = useState(null);
    const [isAddAmenitiesModalOpen, setIsAddAmenitiesModalOpen] = useState(false);
    const [amenities, setAmenities] = useState(null);
    
    const fileInputRef = useRef(null);

    const generateMapUrl = (propertyAddress, city, state, zipCode) => {
        return `https://www.google.com/maps/embed/v1/place?key=AIzaSyA0s1a7phLN0iaD6-UE7m4qP-z21pH0eSc&&q=${propertyAddress}${city}${state}${zipCode}&zoom=15`;
      };

    const handleFileChange = (event) => {
        setSelectedFile(event.target.files[0].name);
        setPropertyDocuments(propertyDocuments + ',' + event.target.files[0].name);
    };

    const handleUploadClick = () => {
        fileInputRef.current?.click();
    };

    const openAddAmenities = () => {
        setIsAddAmenitiesModalOpen(!isAddAmenitiesModalOpen);
    }

    const addAmenities = (value) => {
        amenitiesData.push(value);
        setIsAddAmenitiesModalOpen(!isAddAmenitiesModalOpen);
        setAmenities('');
    }

    const videoLinkOptions = [
        {
            value: "",
            label: "Select"
        },
        {
            value: "youtube",
            label: "Youtube"
        },
        {
            value: "vimeo",
            label: "Vimeo"
        }
    ]
    const propertyTypes = [
        {
            value: "",
            label: "Select"
        },
        {
            value: "buy",
            label: "Buy"
        },
        {
            value: "sell",
            label: "Sell"
        }
    ]
    const propertyCategories = [
        {
            value: "",
            label: "Select"
        },
        {
            value: "apartment",
            label: "Apartment"
        },
        {
            value: "villa",
            label: "Villa"
        }
    ]
    const paymentModes = [
        {
            value: "",
            label: "Select"
        },
        {
            value: "cash",
            label: "Cash"
        },
        {
            value: "bankTransfer",
            label: "Bank Transfer"
        }
    ]
    const structureTypes = [
        {
            value: "",
            label: "Select"
        },
        {
            value: "square",
            label: "Square"
        },
        {
            value: "rectangle",
            label: "Rectangle"
        }
    ]
    const amenitiesData = [
        {
            value: "ac",
            label: "Air Conditioning"
        },
        {
            value: "tvCable",
            label: "TV Cable"
        },
        {
            value: "refrigerator",
            label: "Refrigerator"
        },
        {
            value: "lawn",
            label: "Lawn"
        },
        {
            value: "dryer",
            label: "Dryer"
        }
    ]
    const handleCheckboxChange = (event) => {
        setCheckedItems({
          ...checkedItems,
          [event.target.name]: event.target.checked,
        });
    };
    return(
        <div>
            <h1>{"Welcome to House page"}</h1>
            <h1 style={{textAlign: 'center'}}>Add New Property</h1>
            <div className="content inner-content">
                <div className="container">
                    <div className="row" id="propertyInfo">
                        <div className="col-lg-4">
                            <h4>Property Information</h4>
                        </div>
                        <div className="col-lg-8">
                            <div className={styles.addPropertyInfo}>
                                <div className="row">
                                    <div className="col-md-12">
                                        <ReusableComponents
                                            componentType = "input"
                                            id="propertyName"
                                            label="Property Name"
                                            type="text"
                                            value={propertyName}
                                            classNameLabel={styles.propertyFormLabel}
                                            classNameInput={styles.propertyFormInput}
                                            onChange={(e) => setPropertyName(e.target.value)}
                                            placeholder="Enter Name"
                                        />
                                    </div>
                                    <div className="col-md-6">
                                        <ReusableComponents
                                            componentType = "select"
                                            id="propertyType"
                                            label="Property Type"
                                            value={selectedType}
                                            classNameInput={styles.propertyForm}
                                            onChange={(e) => setSelectedType(e.target.value)}
                                            options={propertyTypes}
                                        />
                                    </div>
                                    <div className="col-md-6">
                                        <ReusableComponents
                                            componentType = "select"
                                            id="propertyCategory"
                                            label="Property Category"
                                            value={selectedCategory}
                                            classNameInput={styles.propertyForm}
                                            onChange={(e) => setSelectedCategory(e.target.value)}
                                            options={propertyCategories}
                                        />
                                    </div>
                                    <div className="col-md-4">
                                        <ReusableComponents
                                            componentType = "select"
                                            id="paymentMode"
                                            label="Mode of Payment"
                                            value={paymentMode}
                                            classNameInput={styles.propertyForm}
                                            onChange={(e) => setPaymentMode(e.target.value)}
                                            options={paymentModes}
                                        />
                                    </div>
                                    <div className="col-md-4">
                                        <ReusableComponents
                                            componentType = "input"
                                            id="salePrice"
                                            label="Sale Price"
                                            type="number"
                                            value={salePrice}
                                            classNameLabel={styles.propertyFormLabel}
                                            classNameInput={styles.propertyFormInput}
                                            onChange={(e) => setSalePrice(e.target.value)}
                                            placeholder="Enter Sale Price"
                                        />
                                    </div>
                                    <div className="col-md-4">
                                        <ReusableComponents
                                            componentType = "input"
                                            id="offerPrice"
                                            label="Offer Price"
                                            type="number"
                                            value={offerPrice}
                                            classNameLabel={styles.propertyFormLabel}
                                            classNameInput={styles.propertyFormInput}
                                            onChange={(e) => setOfferPrice(e.target.value)}
                                            placeholder="Enter Offer Price"
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="row" id="propertyDetails">
                        <div className="col-lg-4">
                            <h4>Property Details</h4>
                        </div>
                        <div className="col-lg-8">
                            <div className={styles.addPropertyInfo}>
                                <div className="row">
                                    <div className="col-md-4">
                                        <ReusableComponents
                                            componentType = "input"
                                            id="propertyId"
                                            label="Property Id"
                                            type="text"
                                            value={propertyId}
                                            classNameLabel={styles.propertyFormLabel}
                                            classNameInput={styles.propertyFormInput}
                                            onChange={(e) => setPropertyId(e.target.value)}
                                            placeholder="Enter Value"
                                        />
                                    </div>
                                    <div className="col-md-4">
                                        <ReusableComponents
                                            componentType = "input"
                                            id="pricePerSft"
                                            label="Price per Sqft"
                                            type="number"
                                            value={pricePerSft}
                                            classNameLabel={styles.propertyFormLabel}
                                            classNameInput={styles.propertyFormInput}
                                            onChange={(e) => setPricePerSft(e.target.value)}
                                            placeholder="Enter Price"
                                        />
                                    </div>
                                    <div className="col-md-4">
                                        <ReusableComponents
                                            componentType = "select"
                                            id="structureType"
                                            label="Structure type"
                                            value={structureType}
                                            classNameInput={styles.propertyForm}
                                            onChange={(e) => setStructureType(e.target.value)}
                                            options={structureTypes}
                                        />
                                    </div>
                                    <div className="col-md-4">
                                        <ReusableComponents
                                            componentType = "input"
                                            id="bedroomCount"
                                            label="No of Bedrooms"
                                            type="number"
                                            value={bedroomCount}
                                            classNameLabel={styles.propertyFormLabel}
                                            classNameInput={styles.propertyFormInput}
                                            onChange={(e) => setBedroomCount(e.target.value)}
                                            placeholder="Enter Value"
                                        />
                                    </div>
                                    <div className="col-md-4">
                                        <ReusableComponents
                                            componentType = "input"
                                            id={bathroomCount}
                                            label="No of Bathrooms"
                                            type="number"
                                            value={bathroomCount}
                                            classNameLabel={styles.propertyFormLabel}
                                            classNameInput={styles.propertyFormInput}
                                            onChange={(e) => setBathroomCount(e.target.value)}
                                            placeholder="Enter Value"
                                        />
                                    </div>
                                    <div className="col-md-4">
                                        <ReusableComponents
                                            componentType = "input"
                                            id={sqft}
                                            label="Sqft"
                                            type="number"
                                            value={sqft}
                                            classNameLabel={styles.propertyFormLabel}
                                            classNameInput={styles.propertyFormInput}
                                            onChange={(e) => setSqftValue(e.target.value)}
                                            placeholder="Enter Value"
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="row" id="propertyDetails">
                        <div className="col-lg-4">
                            <h4>Amenities</h4>
                        </div>
                        <div className="col-lg-8">
                            <div className={styles.addPropertyInfo}>
                                <div className="row">
                                    {amenitiesData.map((val) => (
                                        <div key={val.value} className="col-md-4">
                                            <Form className={styles.propertyForm}>
                                                <Form.Check
                                                    type="checkbox"
                                                    id={val.value}
                                                    name={val.value}
                                                    label={val.label}
                                                    checked={checkedItems[val.value] || false}
                                                    onChange={handleCheckboxChange}
                                                />
                                            </Form>
                                        </div>
                                    ))}
                                    <div className="col-md-4">
                                        <button onClick={openAddAmenities}>+ Amenities</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div>
                        <Modal show={isAddAmenitiesModalOpen} onHide={openAddAmenities} centered>
                            <Modal.Header closeButton>
                                <Modal.Title> Add Amenities</Modal.Title>
                            </Modal.Header>
                            <Modal.Body>
                                <ReusableComponents
                                    componentType = "input"
                                    id="amenities"
                                    label="Add Amenity"
                                    type="text"
                                    value={amenities}
                                    classNameLabel={styles.propertyFormLabel}
                                    classNameInput={styles.propertyFormInput}
                                    onChange={(e) => setAmenities(e.target.value)}
                                    placeholder="Enter Value"
                                />
                                <button onClick={(e) => addAmenities(amenities)}>Add</button>
                            </Modal.Body>
                        </Modal>
                    </div>
                    <div className="row" id="propertyDetails">
                        <div className="col-lg-4">
                            <h4>Property Documents</h4>
                        </div>
                        <div className="col-lg-8">
                            <div className={styles.addPropertyInfo}>
                                <div className="row">
                                    <div className="col-md-8">
                                        <ReusableComponents
                                            componentType = "input"
                                            id="propertyDocuments"
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
                    <div className="row" id="propertyDetails">
                        <div className="col-lg-4">
                            <h4>Property Video</h4>
                        </div>
                        <div className="col-lg-8">
                            <div className={styles.addPropertyInfo}>
                                <div className="row">
                                    <div className="col-md-4">
                                        <ReusableComponents
                                            componentType = "select"
                                            id="embedVideoLink"
                                            label="Embed Video Link"
                                            value={embedVideoLink}
                                            classNameInput={styles.propertyForm}
                                            onChange={(e) => setEmbedVideoLink(e.target.value)}
                                            options={videoLinkOptions}
                                        />
                                    </div>
                                    <div className="col-md-8">
                                        <ReusableComponents
                                            componentType = "input"
                                            id="videoLink"
                                            label=""
                                            type="text"
                                            value={videoLink}
                                            classNameLabel={styles.propertyFormLabel}
                                            classNameInput={styles.propertyFormInput}
                                            onChange={(e) => setVideoLink(e.target.value)}
                                            placeholder="Enter Video Link"
                                            // style={{marginTop: '8px'}}
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="row" id="propertyDetails">
                        <div className="col-lg-4">
                            <h4>Description</h4>
                        </div>
                        <div className="col-lg-8">
                            <div className={styles.addPropertyInfo}>
                                <div className="row">
                                    <div className="col-md-12">
                                        <div className={styles.propertyForm}>
                                            <label className={styles.propertyFormLabel}>Enter Description of Property</label>
                                            <textarea 
                                                className={styles.propertyFormInput}
                                                rows={8}
                                                type="text"
                                                value={description}
                                                onChange={(e) => setDescription(e.target.value)}
                                                placeholder="Description"
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="row" id="propertyDetails">
                        <div className="col-lg-4">
                            <h4>Property Location</h4>
                        </div>
                        <div className="col-lg-8">
                            <div className={styles.addPropertyInfo}>
                                <div className="row">
                                    <div className="col-md-12">
                                        <ReusableComponents
                                            componentType = "input"
                                            id="propertyAddress"
                                            label="Address"
                                            type="text"
                                            value={propertyAddress}
                                            classNameLabel={styles.propertyFormLabel}
                                            classNameInput={styles.propertyFormInput}
                                            onChange={(e) => setPropertyAddress(e.target.value)}
                                            placeholder="Enter Address"
                                        />
                                    </div>
                                    <div className="col-md-6">
                                        <ReusableComponents
                                            componentType = "input"
                                            id="city"
                                            label="City"
                                            type="text"
                                            value={city}
                                            classNameLabel={styles.propertyFormLabel}
                                            classNameInput={styles.propertyFormInput}
                                            onChange={(e) => setCity(e.target.value)}
                                            placeholder="Enter City"
                                        />
                                    </div>
                                    <div className="col-md-6">
                                        <ReusableComponents
                                            componentType = "input"
                                            id="state"
                                            label="Country/State"
                                            type="text"
                                            value={state}
                                            classNameLabel={styles.propertyFormLabel}
                                            classNameInput={styles.propertyFormInput}
                                            onChange={(e) => setState(e.target.value)}
                                            placeholder="Enter Country/State"
                                        />
                                    </div>
                                    <div className="col-md-6">
                                        <ReusableComponents
                                            componentType = "input"
                                            id="landmark"
                                            label="Landmark"
                                            type="text"
                                            value={landmark}
                                            classNameLabel={styles.propertyFormLabel}
                                            classNameInput={styles.propertyFormInput}
                                            onChange={(e) => setLandmark(e.target.value)}
                                            placeholder="Enter Landmark"
                                        />
                                    </div>
                                    <div className="col-md-6">
                                        <ReusableComponents
                                            componentType = "input"
                                            id="zipCode"
                                            label="Zip Code"
                                            type="text"
                                            value={zipCode}
                                            classNameLabel={styles.propertyFormLabel}
                                            classNameInput={styles.propertyFormInput}
                                            onChange={(e) => setZipCode(e.target.value)}
                                            placeholder="Enter Zip Code"
                                        />
                                    </div>
                                    <div className="col-md-12">
                                        <iframe
                                            title="Google Map"
                                            width="100%"
                                            height="450"
                                            style={{ border: 0 }}
                                            src={generateMapUrl(propertyAddress, city, state, zipCode)}
                                            allowFullScreen=""
                                            aria-hidden="false"
                                            tabIndex="0"
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className={styles.addPropertyInfo}>
                        <div className="row">
                            <div className="col-md-12">
                                <div className={styles.propertyForm}>
                                    <button className={styles.propertyButton}>Add Property</button>
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

export default House;