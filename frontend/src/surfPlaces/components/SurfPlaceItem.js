import React, {useState, useContext} from 'react';

import UserBox from '../../shared/components/UI/UserBox';
import Modal from '../../shared/components/UI/Modal';
import ErrorM from '../../shared/components/UI/ErrorM';
import LoadingSpinner from '../../shared/components/UI/LoadingSpinner';
import Map from '../../shared/components/UI/Map'
import { authenticationContext } from '../../shared/reactContext/authenticationContext';

import { useHttpClient } from '../../shared/hooks/http-hook';

import './SurfPlaceItem.css';
import {Button} from "@mui/material";
import {Link} from "react-router-dom";

const Surfplaceitem = props => {

    const { isLoading, error, sendRequest, clearError } = useHttpClient();
    const auth = useContext(authenticationContext);

    // const [showMap, setShowMap] = useState(false);
    const [showConfirmModal, setShowConfirmModal] = useState(false);

    // const openMapHandler = () => setShowMap(true);
    // const closeMapHandler = () => setShowMap(false);

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

          {/* //LD planning to show a map in a modal */}
          {/* <Modal show={showMap} 
                 onCancel={closeMapHandler}
                 header={props.address}
                 contentClass = "place-item__modal-content"
                 footerClass = "place-item__modal-actions"
                 footer = {<Button onClick={closeMapHandler}>CLOSE</Button>} >

         
          <div className="map-container">
            <Map center={props.coordinates} zoom={16}/>
          </div>
          </ Modal> */}


          {/* //LD deletion modal */}
          <Modal
            show={showConfirmModal}
            onCancel={cancelDeleteHandler}
            header="Confirm Cancel?"
            footerClass="place-item__modal-actions"
            footer={
              <React.Fragment>
                <Button variant={"contained"} inverse onClick={cancelDeleteHandler}>
                  CANCEL
                </Button>
                <Button variant={"contained"} danger onClick={confirmDeleteHandler}>
                  DELETE
                </Button>
              </React.Fragment>
            }
          >
            <p>
              go ahead?
            </p>
          </Modal>




          <UserBox className="place-item__content">
          {isLoading && <LoadingSpinner asOverlay/>}
                {/* <div className="place-item__image"> */}
                  {/* <img src={props.image} alt={props.name} /> */}
                  {/* <img src={"https://i0.wp.com/www.courses.ie/wp-content/uploads/2019/07/TUD_RGB-1024x645-1024x645.png"} alt={props.name} /> */}
                {/* </div> */}
                <div className="map-container">
                  <Map center={props.coordinates} zoom={16}/>
                </div>
                <div className="place-item__info">
                  <h2>{props.name}</h2>
                  <h3>{props.address}</h3>
                  <h3>{props.tags.map(t => <span>#{t} </span>)}</h3>
                  <p>{props.description}</p>
                </div>
                <div className="place-item__actions">
                  {/* <Button inverse onClick={openMapHandler}>
                    - MAP -
                  </Button> */}

                  {auth.userId === props.creatorId && 
                  (<Button component={Link} variant={"contained"} to={`/surfplaces/${props.id}`}>EDIT</Button>)}
                  
                  {auth.userId === props.creatorId && 
                  (<Button variant={"contained"} danger onClick={showDeleteWarningHandler}> DELETE </Button>)}
                 
                  


                </div>
          </UserBox>


    </React.Fragment>
  );
};

export default Surfplaceitem;