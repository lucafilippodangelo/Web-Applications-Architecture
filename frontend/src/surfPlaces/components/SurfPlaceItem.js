import React, {useState, useContext} from 'react';

import UserBox from '../../shared/components/UI/UserBox';
import Button from '../../shared/components/FormComponents/Button';
import Modal from '../../shared/components/UI/Modal';
import { authenticationContext } from '../../shared/reactContext/authenticationContext';

import './SurfPlaceItem.css';

const Surfplaceitem = props => {

    const auth = useContext(authenticationContext);

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
                  {/* //LD will need to add map later. that stuff needs refinement */}
                  {auth.isLoggedIn && <Button to={`/surfplaces/${props.id}`}>EDIT</Button>}
             
                  {auth.isLoggedIn && <Button danger onClick={showDeleteWarningHandler}> DELETE </Button>}

                </div>
          </UserBox>
        </li>


    </React.Fragment>
  );
};

export default Surfplaceitem;