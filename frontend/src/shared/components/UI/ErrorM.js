import React from 'react';

import Modal from './Modal';
import {Button} from "@mui/material";

const ErrorModal = props => {
    return (
        <Modal
            onCancel={props.onClear}
            header="An Error Occurred!"
            show={!!props.error}
            footer={<Button variant={"contained"} onClick={props.onClear}>Okay</Button>}
        >
            <p>{props.error}</p>
        </Modal>
    );
};

export default ErrorModal;