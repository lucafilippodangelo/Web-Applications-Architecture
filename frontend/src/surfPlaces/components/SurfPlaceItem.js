import React, {useContext, useState} from 'react';

import ErrorM from '../../shared/components/UI/ErrorM';
import {authenticationContext} from '../../shared/reactContext/authenticationContext';
import Map from "../../shared/components/UI/Map"
import {useHttpClient} from '../../shared/hooks/http-hook';

import './SurfPlaceItem.css';
import {Box, Button, Container, Modal, Paper, Typography} from "@mui/material";
import CustomModal from "../../shared/components/UI/Modal"
import {Link, useParams} from "react-router-dom";

const SurfPlaceItem = props => {

    const {error, sendRequest, clearError} = useHttpClient();
    const auth = useContext(authenticationContext);
    const params = useParams();

    const showEdit = auth.isLoggedIn && auth.userId === params.userId;

    const [showMap, setShowMap] = useState(false);
    const [showConfirmModal, setShowConfirmModal] = useState(false);

    const closeMapHandler = () => setShowMap(false);

    const showDeleteWarningHandler = () => {
        setShowConfirmModal(true);
    };

    const cancelDeleteHandler = () => {
        setShowConfirmModal(false);
    };

    const confirmDeleteHandler = async () => {
        setShowConfirmModal(false);

        try {
            await sendRequest(
                "http://localhost:3001/api/places/" + props.place.id,
                "DELETE",
                JSON.stringify({
                    something: "something",
                }), //LD body
                {
                    'Content-Type': 'application/json',
                    'Authorization': auth.token
                }
            );
            props.onDelete(props.place.id);
        } catch (err) {


        }
    };

    const colour = props.place.id === props.selectedPlace?.id ? "rgb(238,238,238)" : "#fff";

    return (
        //LD using fragment to have a double access point with modal and the <li> div
        <>
            <ErrorM error={error} onClear={clearError}/>

            {/* //LD planning to show a map in a modal */}
            <Modal
                open={showMap}
                onClose={closeMapHandler}
            >

                    <Paper sx={{height: "75vh", width: "75vw", margin: "auto", mt: 3, mb: 12}}>
                        <div>
                            <Map places={[props.place]} selectedPlace={props.place} onPlaceSelected={() => {
                            }} center={props.place.coordinates} zoom={16}/>
                        </div>
                    </Paper>

            </Modal>


            {/* //LD deletion modal */}
            <CustomModal
                show={showConfirmModal}
                onCancel={cancelDeleteHandler}
                header="Confirm Delete?"
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
                    Are you sure you want to delete this place?
                </p>
            </CustomModal>

            <Paper onClick={() => props.onPlaceSelected(props.place)}
                   sx={{backgroundColor: colour, cursor: "pointer", padding: "20px", mb: 1}} elevation={3}>

                <Typography variant={"h5"} sx={{fontWeight: "bold", mb: 2}}>
                    {props.place.name}
                </Typography>

                <Box sx={{mb: 2}}>
                    {props.place.address.split(",").map(line =>
                        <Typography>
                            {line},
                        </Typography>
                    )}
                </Box>

                <Typography sx={{fontStyle: "italic", mb: 2}}>
                    {props.place.tags.map(t => <span>#{t} </span>)}
                </Typography>

                <Button
                    onClick={() => setShowMap(true)}
                    variant={"contained"}
                    sx={{display: {md: "none"}, mr: 1}}
                >
                    Map
                </Button>

                {showEdit &&
                    <>

                        <Button
                            onClick={() => setShowMap(true)}
                            variant={"contained"}
                            sx={{mr: 1}}
                            component={Link}
                            to={`/surfplaces/${props.place.id}`}
                        >
                            Edit
                        </Button>

                        <Button
                            onClick={() => showDeleteWarningHandler(true)}
                            variant={"contained"}
                        >
                            Delete
                        </Button>

                    </>
                }


            </Paper>

        </>
    );
};

export default SurfPlaceItem;