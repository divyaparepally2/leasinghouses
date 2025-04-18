import React, { useState, forwardRef } from 'react';
import { Card, Carousel, Modal } from 'react-bootstrap';
import './PlaceCard.css'; // Import CSS for styled dots
import PlaceCardModal from './placeCardModal';

const PlaceCard = forwardRef(({ place, highlighted, onClick }, ref) => {
  const [photoIndex, setPhotoIndex] = useState(0);
  const [showModal, setShowModal] = useState(false);
  const photos = place.photos || [];

  const getPhotoUrl = (photo) =>
    photo?.getUrl({ maxWidth: 600 }) || 'https://via.placeholder.com/300x200?text=No+Image';

  const handleSelect = (selectedIndex) => {
    setPhotoIndex(selectedIndex);
  };

  const handleImageClick = (index) => {
    setPhotoIndex(index);
    setShowModal(true);
  };
  console.log('place', place)

  return (
    <>
      <Card
        className="shadow-sm"
        ref={ref}
        onClick={onClick}
        style={{
          border: highlighted ? '2px solid #007bff' : '1px solid #ccc',
          borderRadius: '5px',
          marginBottom: '12px',
          backgroundColor: highlighted ? '#e9f5ff' : '#fff',
          boxShadow: highlighted ? '0 4px 12px rgba(0, 123, 255, 0.3)' : '0 1px 3px rgba(0,0,0,0.1)',
          transition: 'all 0.3s ease',
          scrollMarginTop: '80px',
        }}
      >
        {photos.length > 0 ? (
          <Carousel
            activeIndex={photoIndex}
            onSelect={handleSelect}
            interval={null}
            indicators={true}
          >
            {photos.map((photo, idx) => (
              <Carousel.Item key={idx}>
                <img
                  src={getPhotoUrl(photo)}
                  className="d-block w-100"
                  alt={`Slide ${idx}`}
                  style={{
                    height: '200px',
                    objectFit: 'cover',
                    cursor: 'pointer',
                  }}
                  onClick={() => handleImageClick(idx)}
                />
              </Carousel.Item>
            ))}
          </Carousel>
        ) : (
          <Card.Img
            variant="top"
            src="https://via.placeholder.com/300x200?text=No+Image"
            style={{ height: '200px', objectFit: 'cover' }}
          />
        )}
  
        <Card.Body>
          <Card.Title>{place.name}</Card.Title>
          {place.vicinity && <Card.Text>{place.vicinity}</Card.Text>}
        </Card.Body>
      </Card>
  
      {/* Modal for Image Preview */}
      <Modal show={showModal} onHide={() => setShowModal(false)} size="xl" centered>
        <Modal.Header closeButton>
          <Modal.Title>Property Listings</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <img
            src={getPhotoUrl(photos[photoIndex])}
            className="img-fluid"
            alt={`Modal ${photoIndex}`}
          />
          <PlaceCardModal place={place} />
        </Modal.Body>
      </Modal>
    </>
  );  
});

export default PlaceCard;
