import React, {useState, useEffect} from 'react'
import { useDispatch } from 'react-redux';
import { setModal } from '../state/modal';
import { login } from '../state/user'
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import NormalInput from './NormalInput'
import { isEmail } from '../utils/validators'
import PasswordInput from './PasswordInput'
import Link from '@material-ui/core/Link';
import graphic from '../assets/undraw_Access_account_re_8spm.svg'
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
    maxWidth: 120,
    marginBottom: theme.spacing(1)
},
  form: {
    boxSizing: "border-box",
    width: "100%",
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(2),
    marginBottom: theme.spacing(3),
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
  buttonProgress: {
    color: theme.palette.primary.main,
    position: 'absolute',
    top: '50%',
    left: '50%',
    marginTop: -12,
    marginLeft: -12,
  },
}));

const Login = () => {
    let classes = useStyles()
    const dispatch= useDispatch();
    let [allOk, setAllOk] = useState(false) 
    let [loading, setLoading] = useState(false)
    const [form, setForm] = React.useState({
        email: "",
        password: ""
      });
    
      const confirmValue = (name, value) => {
          setForm({ ...form, [name]: value });
      };

      const changeModal = (event) => {
            event.preventDefault()
            dispatch(setModal({open: true, content: "register"}))
      };

      //SI NO HAY ERRORES EN EL FORMULARIO SETEA allOk A TRUE
      useEffect(()=>{
        let someError = Object.values(form).includes("error") 
        let someEmpty = Object.values(form).some(i => i === "")
        someError || someEmpty ? setAllOk(false) : setAllOk(true) 
    },[form, form.email, form.password, allOk])

      const handleSubmit = (event) => {
          event.preventDefault()
          setLoading(true)
          dispatch(login(form))
            .then(()=>dispatch(setModal({open: false, content: ""})))
            .catch((err)=> console.log(err))
      }
  

    let disabled = (!allOk || loading)
    return (
        <div className={classes.root} onSubmit={handleSubmit}>
            <Typography variant="h6" component="h4" className={classes.title}>
                OMDB
            </Typography>
            <div><img src={graphic} className={classes.img} alt="login" /></div>
            <Typography variant="body1" component="h4" gutterBottom>
                Welcome back!
            </Typography>
            <form className={classes.form} autoComplete="off">
                <NormalInput name="email" label="Email" confirmValue={confirmValue} validator={isEmail} validatorErrorMsg="You must enter a valid email" autoFocus />
                <PasswordInput label="Password" name="password" confirmValue={confirmValue} simple/>
                <div className={classes.wrapper}>
                  <Button variant="contained" color="secondary" className={classes.btn} type="submit" disabled={disabled}>
                  {!allOk? "Please enter your email and password" : "Sign in!"}
                  </Button>
                  {loading && <CircularProgress size={24} className={classes.buttonProgress} />}
                </div>
            </form>
            <Typography variant="body2" component="h6" >
                Don't have an account? Register <Link href="/Register" onClick={changeModal}>here!</Link>
            </Typography>
        </div>
    )
}

export default Login
