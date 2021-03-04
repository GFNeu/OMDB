import React, {useState, useEffect} from 'react'
import { useDispatch } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import {register} from '../state/user'
import {setModal} from '../state/modal'
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import NormalInput from './NormalInput'
import {onlyRegularCharacters, isEmail, isValidPassword, match} from '../utils/validators'
import PasswordInput from './PasswordInput'
import graphic from '../assets/undraw_fill_forms_yltj.svg'
import CircularProgress from '@material-ui/core/CircularProgress';


const useStyles = makeStyles((theme) => ({
  root: {
    boxSizing: "border-box",
    width: "100%",
    maxWidth: 400,
    display: "flex",
    flexFlow: "column",
    alignItems: "center",
    borderRadius: theme.shape.borderRadius,
    marginBottom: theme.spacing(4)
  },
  title: {
    fontWeigth: "bold",
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.common.white,
    width: "100%",
    textAlign: "center",
    borderTopLeftRadius: theme.shape.borderRadius,
    borderTopRightRadius: theme.shape.borderRadius,
    paddingTop: theme.spacing(1),
    paddingBottom: theme.spacing(1),
    marginBottom: theme.spacing(4),
  },
  img: {
      height: "auto",
      maxWidth: 150,
      marginBottom: theme.spacing(1)
  },
  free: {
      color: theme.palette.secondary.main
  },
  form: {
    boxSizing: "border-box",
    width: "100%",
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(2),
    "& > *": {
      //margin: theme.spacing(1),
      width: "100%",
    },
  },
  wrapper: {
    marginTop: theme.spacing(2),
    position: 'relative',
  },
  btn: {
    width: "100%",
  },
  required: {
    marginTop: theme.spacing(2),
    color: theme.palette.grey[500]
  },
  buttonProgress: {
    color: theme.palette.primary.main,
    position: 'absolute',
    top: '50%',
    left: '50%',
    marginTop: -12,
    marginLeft: -12,
  },
}));

const Register = () => {
    const classes = useStyles()
    const dispatch = useDispatch()
    const [allOk, setAllOk] = useState(false) 
    const [loading, setLoading] = useState(false)
    const [form, setForm] = useState({
        firstName: "",
        middleName: "",
        lastName: "",
        email: "",
        password: "",
        confirmPassword: "",
      });
    
    //SI NO HAY ERRORES, ESTO SETEA EL ESTADO form DESDE LOS INPUTS
    const confirmValue = (name, value) => {
        setForm({ ...form, [name]: value });
    };
   
    //SI NO HAY ERRORES EN EL FORMULARIO SETEA allOk A TRUE
    useEffect(()=>{
        let someError = Object.values(form).includes("error") 
        let someEmpty = [form.firstName, form.lastName, form.email, form.password, form.confirmPassword].some(i => i === "")
        someError || someEmpty ? setAllOk(false) : setAllOk(true) 
    },[form, form.firstName, form.middleName, form.lastName, form.email, form.password, form.confirmPassword, allOk])
      
    const handleSubmit = (e) => {
      e.preventDefault()
      setLoading(true)
        let {firstName, middleName, lastName, email, password} = form
        let userData = {firstName, middleName, lastName, email, password}
        dispatch(register(userData))
          .then(()=>{dispatch(setModal({open: false, content: ""}))})
          .catch((err)=> console.log(err))
    }

    let disabled = (!allOk || loading)
    return (
        <div className={classes.root}>
            <Typography variant="h6" component="h4" className={classes.title}>
                OMDB
            </Typography>
            <div><img src={graphic} className={classes.img} alt="register"/></div>
            <Typography variant="body1" component="h4" gutterBottom>
                Sing up for <span className={classes.free}>free</span>!
            </Typography>
            <Typography variant="caption" component="h6" gutterBottom>
                We won't share your information with anyone in the world
            </Typography>
            <form className={classes.form} autoComplete="off" onSubmit={handleSubmit}>
                <NormalInput name="firstName" label="First name" confirmValue={confirmValue} validator={onlyRegularCharacters} validatorErrorMsg="Only letters are allowed" autoFocus fullWidth/>
                <NormalInput name="middleName" label="Middle name" confirmValue={confirmValue} validator={onlyRegularCharacters} validatorErrorMsg="Only letters are allowed" allowNull/>
                <NormalInput name="lastName" label="Last name" confirmValue={confirmValue} validator={onlyRegularCharacters} validatorErrorMsg="Only letters are allowed"/>
                <NormalInput name="email" label="Email" confirmValue={confirmValue} validator={isEmail} validatorErrorMsg="You must enter a valid email"/>
                <PasswordInput label="Password" name="password" confirmValue={confirmValue} validator={isValidPassword} />
                <PasswordInput label="Verify your password" name="confirmPassword" confirmValue={confirmValue} validator={match} validatorErrorMsg="Your verification doesn't match your password" simple pass={form.password}/>
                <Typography variant="caption" component="h6" className={classes.required}>
                *Required: first name, last name, email, password, verify your password
                </Typography>
                <div className={classes.wrapper}>
                  <Button variant="contained" color="secondary" className={classes.btn} type="submit" disabled={disabled}>
                      {!allOk? "Please fill all required fields" : "Complete registration!"}
                  </Button>
                  {loading && <CircularProgress size={24} className={classes.buttonProgress} />}
                </div>
            </form>
        </div>
    )
}

export default Register
