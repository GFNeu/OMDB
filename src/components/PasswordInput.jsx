import React, { useState, useEffect } from 'react'
import clsx from 'clsx';

import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import Input from '@material-ui/core/Input';
import InputAdornment from '@material-ui/core/InputAdornment';
import IconButton from '@material-ui/core/IconButton';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import FormHelperText from '@material-ui/core/FormHelperText';



const PasswordInput = ({label, name, confirmValue, validator, validatorErrorMsg, helperText = '', simple, className = '', pass}) => {

   
  
    const [value, setValue] = useState('')
    const [error, setError] = useState('')
    const [show, setShow] = useState(false)
    const [changed, setChanged] = useState(false)

    helperText= !simple? 'It must have minimum eight characters, at least one uppercase letter, one lowercase letter, one number and one special character' : helperText

    const handleChange = (e) => {
        let v = e.target.value;
        setValue(v)
        if(v){
            let ok = true
            if(validator && !validator(v, pass)){
                ok = false
            }
            if(ok) confirmValue(name, v)
        }
    }

    const handleClickShowPassword = () => {
        setShow(!show);
      };

    const handleMouseDownPassword = (event) => {
        event.preventDefault();
      };

    const handleBlur = () => {
        setChanged(true)
        let v = value
        //si está vacío
        if (!v) {
            setError(`${label} can't be empty`)
        } else {
            if(validator && !validator(v, pass)){
                simple? setError(validatorErrorMsg) : setError(helperText)
                v= "error"
            }
        }
        confirmValue(name, v)
    }

    useEffect(()=>{
        if(changed){
            if(validator && !validator(value, pass)){
                setError(validatorErrorMsg)
                confirmValue(name, "error")
            } else {
                setError("")
                confirmValue(name, value)
            }
        }
    },[pass, value])
    

    const handleFocus = () => {
        setError("")
    }


    return (
        <FormControl className={clsx(className)} error={error? true : false} >
        <InputLabel htmlFor="standard-adornment-password">{error? 'Error' : label}</InputLabel>
        <Input
            id={name}
            type={show ? 'text' : 'password'}
            value={value}
            name={name}
            onChange={(e)=>handleChange(e)}
            onBlur={handleBlur}
            onFocus={handleFocus}
            endAdornment={
            <InputAdornment position="end">
                <IconButton
                aria-label="toggle password visibility"
                onClick={handleClickShowPassword}
                onMouseDown={handleMouseDownPassword}
                >
                {show ? <Visibility /> : <VisibilityOff />}
                </IconButton>
            </InputAdornment>
            }
            aria-describedby={`${name}-text`}
        />
        <FormHelperText id={`${name}-text`}>{error? error : helperText}</FormHelperText>
    </FormControl>
    )
}

export default PasswordInput
