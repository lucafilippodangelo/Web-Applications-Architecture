import React, {useState} from 'react';

import UserBox from '../../shared/components/UI/UserBox';
import Button from '../../shared/components/FormElements/Button';
import Modal from '../../shared/components/UIElements/Modal';

import './SurfPlaceItem.css';

const SurfPlaceItem = props => {

    const [showMap, setShowMap] = useState(false);
    const openMapHandler = () => setShowMap(true);
    const closeMapHandler = () => setShowMap(false);

  return (
        //LD using fragment to have a double access point with modal and the <li> div
        <React.Fragment>
        <Modal show={showMap} 
               onCancel={closeMapHandler}
               header={props.address}
               contentClass = "place-item__modal-content"
               footerClass = "place-item__modal-actions"
               //LD the below will be rendered in "ModalOverlay" that is a sub-component in Modal.js
               footer = {<Button onClick={closeMapHandler}>CLOSE</Button>} >

        {/*BELOW CONTENT WILL BE RENDERED IN children of "Modal.js"->nested component */}
        <div className="map-container">
          <h2>here the map</h2>
        </div>

        </ Modal>
        <li className="place-item">
          <UserBox className="place-item__content">
            <div className="place-item__image">
              <img src={props.image} alt={props.title} />
            </div>
            <div className="place-item__info">
              <h2>{props.title}</h2>
              <h3>{props.address}</h3>
              <p>{props.description}</p>
            </div>
            <div className="place-item__actions">
              <Button inverse onClick = {openMapHandler} >VIEW ON MAP</Button>
              <Button to={`/surfplaces/${props.id}`} >EDIT</Button>
              <Button danger>DELETE</Button>
            </div>
          </UserBox>
        </li>
    </React.Fragment>
  );
};

export default SurfPlaceItem;