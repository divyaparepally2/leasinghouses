import React from "react";
import styles from './loginStyles.module.css';
import { Button } from 'react-bootstrap';

function PlaceCardModal({ place }) {
    return(
        <>
            <div className="content inner-content">
                <div className="container">
                    <div className="row" id="propertyInfo">
                        <div className="col-lg-10">
                            <div className="row">
                                <div className="col-md-8">
                                    <h3>$1,200,000</h3>
                                    <h5>{place.vicinity}</h5>
                                </div>
                                <div className="col-md-1">
                                    <h3>5</h3>
                                    <h5>Beds</h5>
                                </div>
                                <div className="col-md-1">
                                    <h3>3</h3>
                                    <h5>Baths</h5>
                                </div>
                                <div className="col-md-1">
                                    <h3>3,124</h3>
                                    <h5>Sqft</h5>
                                </div>
                                <div className={`col-md-3 ${styles.listingsDetails}`}>
                                    <h6>Single Family Residence</h6>
                                </div>
                                <div className={`col-md-3 ${styles.listingsDetails}`}>
                                    <h6>Built in 1974</h6>
                                </div>
                                <div className={`col-md-3 ${styles.listingsDetails}`}>
                                    <h6>10,410.84 Square Feet Lot</h6>
                                </div>
                                <div className={`col-md-3 ${styles.listingsDetails}`}>
                                    <h6>$1,160,900 Zestimate®</h6>
                                </div>
                                <div className={`col-md-3 ${styles.listingsDetails}`}>
                                    <h6>$384/sqft</h6>
                                </div>
                                <div className={`col-md-3 ${styles.listingsDetails}`}>
                                    <h6>$-- HOA</h6>
                                </div>
                                <div>
                                    Add divider
                                </div>
                                <div>
                                    <h3>What's special</h3>
                                    <p>OPEN HOUSE SATURDAY & SUNDAY APRIL 10 & 11, 2-4PM!</p>
                                    <p>Tucked at the end of a quiet cul-de-sac just off White Rock Trail, this mid-century modern stunner was fully reimagined by a noted Dallas architect to deliver elevated design and effortless indoor-outdoor living. Its rare C-shaped layout wraps around a dramatic courtyard with a glass-fenced pool, granite firebowl, and courtyard entertaining space—plus a private side yard just off the kitchen and primary suite.</p>
                                    <p>Vaulted ceilings, rift-sawn white oak cabinetry, and hardwood flooring set a tone of refined minimalism, while curated built-ins and warm architectural lines create a space that feels both intentional and inviting. The secluded primary wing offers dual walk-in closets and a separate spa-style bath designed for retreat.</p>
                                    <p>Located minutes from White Rock Lake with RISD Schools, this home blends privacy, pedigree, and quiet luxury in one of East Dallas’ most sought-after pockets.</p>
                                    <p>Zillow last checked: April 11, 2025 at 03:30pm</p>
                                    <p>Listing updated: April 10, 2025 at 09:10am</p>
                                    <p>Listed by: Rania Blaik 0805739, BOHAAS LLC 214-713-3441</p>
                                    <p>Source: NTREIS,MLS#: 20886782</p>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-2">
                            <div className="row" style={{border: '1px solid'}}>
                                <div style={{margin: '10px'}}>
                                    <button onClick={''}>Request a Tour</button>
                                </div>
                                <div style={{margin: '10px'}}>
                                    <button onClick={''}>Contact Agent</button>
                                </div>
                            </div>
                        </div>
                        
                    </div>
                </div>
            </div>
        </>
    )
}

export default PlaceCardModal;