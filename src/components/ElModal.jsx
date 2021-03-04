import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {setModal} from '../state/modal'
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import Paper from '@material-ui/core/Paper';
import Login from './Login'
import Register from './Register'

const useStyles = makeStyles((theme) => ({
  modal: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
}));

export default function ElModal() {
  const classes = useStyles();
  const dispatch= useDispatch();
  const modal = useSelector(state => state.modal);


  const handleClose = () => {
    dispatch(setModal({open: false, content: ""}))
  };

  return (
    <div>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        className={classes.modal}
        open={modal.open}
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 300,
        }}
      >
        <Fade in={modal.open}>
         <Paper elevation={3} >
            {modal.content === "login" && <Login />}
            {modal.content === "register" && <Register />}
         </Paper>
        </Fade>
      </Modal>
    </div>
  );
}
