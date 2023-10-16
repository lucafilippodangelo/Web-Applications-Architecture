import React, {useState} from 'react';

import UserBox from '../../shared/components/UI/UserBox';
import Button from '../../shared/components/FormComponents/Button';
import Modal from '../../shared/components/UI/Modal';

import './SurfPlaceItem.css';

const Surfplaceitem = props => {

    //const [showMap, setShowMap] = useState(false);
    //const openMapHandler = () => setShowMap(true);
    //const closeMapHandler = () => setShowMap(false);

    const [showConfirmModal, setShowConfirmModal] = useState(false);

    const showDeleteWarningHandler = () => { 
      setShowConfirmModal(true);
    };
  
    const cancelDeleteHandler = () => {
      setShowConfirmModal(false);
    };
  
    const confirmDeleteHandler = () => {
      setShowConfirmModal(false);
      console.log('DELETING...');
    };

  return (
        //LD using fragment to have a double access point with modal and the <li> div
        <React.Fragment>
        {/* <Modal show={showMap} 
               //onCancel={closeMapHandler}
               header={props.address}
               contentClass = "place-item__modal-content"
               footerClass = "place-item__modal-actions"
               LD the below will be rendered in "ModalOverlay" that is a sub-component in Modal.js
               footer = {<Button onClick={closeMapHandler}>CLOSE</Button>} 
               > */}

        {/*BELOW CONTENT WILL BE RENDERED IN children of "Modal.js"->nested component */}
        {/* <div className="map-container">
          <h2>map content will be implemented after crud</h2>
        </div> */}
        {/* </ Modal> */}




          {/* //LD deletion modal */}
          <Modal
            show={showConfirmModal}
            onCancel={cancelDeleteHandler}
            header="Are you sure?"
            footerClass="place-item__modal-actions"
            footer={
              <React.Fragment>
                <Button inverse onClick={cancelDeleteHandler}>
                  CANCEL
                </Button>
                <Button danger onClick={confirmDeleteHandler}>
                  DELETE
                </Button>
              </React.Fragment>
            }
          >
            <p>
              go ahead?
            </p>
          </Modal>




        <li className="place-item">
          <UserBox className="place-item__content">
          <div className="place-item__image">
                  <img src={props.image} alt={props.name} />
                </div>
                <div className="place-item__info">
                  <h2>{props.name}</h2>
                  <h3>{props.address}</h3>
                  <p>{props.description}</p>
                </div>
                <div className="place-item__actions">
                  {/* <Button inverse onClick={openMapHandler}> VIEW ON MAP </Button> */}
                  <Button to={`/surfplaces/${props.id}`}>EDIT</Button>
                  <Button danger onClick={showDeleteWarningHandler}>
                    DELETE
                  </Button>
                </div>
          </UserBox>
        </li>


    </React.Fragment>
  );
};

export default Surfplaceitem;