import React, {useState, useContext} from 'react';

import UserBox from '../../shared/components/UI/UserBox';
import Button from '../../shared/components/FormComponents/Button';
import Modal from '../../shared/components/UI/Modal';
import ErrorM from '../../shared/components/UI/ErrorM';
import LoadingSpinner from '../../shared/components/UI/LoadingSpinner';
import { authenticationContext } from '../../shared/reactContext/authenticationContext';

import { useHttpClient } from '../../shared/hooks/http-hook';

import './SurfPlaceItem.css';

const Surfplaceitem = props => {

    const { isLoading, error, sendRequest, clearError } = useHttpClient();
    const auth = useContext(authenticationContext);

    const [showConfirmModal, setShowConfirmModal] = useState(false);

    const showDeleteWarningHandler = () => { 
      setShowConfirmModal(true);
    };
  
    const cancelDeleteHandler = () => {
      setShowConfirmModal(false);
    };
  

      const confirmDeleteHandler = async () => {
        setShowConfirmModal(false);
        console.log('LD DELETING...');
        try {
          await sendRequest(
            "http://localhost:3001/api/places/" + props.id,
            "DELETE",
            JSON.stringify({
              something: "something",
            }), //LD body
            {
              'Content-Type': 'application/json',
              'Authorization' : auth.token
            }
          );
          props.onDelete(props.id);
        } catch (err) {
          console.log('LD DELETING... ERROR');
          console.log(err);
          console.log('LD DELETING... ERROR END');
        }
      };
    

  return (
        //LD using fragment to have a double access point with modal and the <li> div
        <React.Fragment>
          <ErrorM error={error} onClear={clearError} />
          {/* //LD deletion modal */}
          <Modal
            show={showConfirmModal}
            onCancel={cancelDeleteHandler}
            header="Confirm Cancel?"
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
          {isLoading && <LoadingSpinner asOverlay/>}
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