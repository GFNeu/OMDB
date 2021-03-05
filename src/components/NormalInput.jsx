import React, {useState, useEffect} from 'react'
import axios from 'axios'
import FormControl from '@material-ui/core/FormControl';
import FormHelperText from '@material-ui/core/FormHelperText';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import CircularProgress from '@material-ui/core/CircularProgress';
import InputAdornment from '@material-ui/core/InputAdornment';
import CheckIcon from '@material-ui/icons/Check';



const NormalInput = ({label, name, confirmValue,register=false, className = "", validator, validatorErrorMsg, allowNull,...rest}) => {

    const [value, setValue] = useState("")
    const [error, setError] = useState("")
    const [changed, setChanged] = useState(false)
    const [isLoading, setIsLoading] = useState(false)
    const [isOk, setIsOk] = useState(false)

    const handleChange = (e) => {
        let data = e.target.value;
        setValue(data)
        setChanged(true)
    }

    const handleBlur = () => {
        let v = value
        //si está vacío y si no está permitido que quede vacío
        if (!v && !allowNull) {
            setError(`${label} can't be empty`)
            v= "error"
        } else {
            //si hay una función validator y esta no pasó
            if(v && validator && !validator(v)){
                setError(validatorErrorMsg)
                v= "error"
            }   
        }
        if(value && register){
            setIsLoading(true)
            axios.post('/api/auth/emailverification',{email:value})
                .then(res=> {
                    if(res.data === "no") {
                        setError("The user already exists")
                        v= "error"
                        setIsLoading(false)
                    }
                    if(v !== "error") {
                        setIsOk(true)
                        setIsLoading(false)
                    }
                })
        }
        
        confirmValue(name, v)
    }

    const handleFocus = () => {
        setError("")
    }

    useEffect(()=>{
        if(changed){
            if(validator && !validator(value)){
                confirmValue(name, "error")
            } else {
                setError("")
                confirmValue(name, value)
            }
        }
    },[changed, value])



   
    return (
      <FormControl error={error? true : false} className={className}>
        <InputLabel htmlFor="component-error">{error? "Error" : label}</InputLabel>
        <Input
          id={name}
          value={value}
          name={name}
          onChange={handleChange}
          onBlur={handleBlur}
          onFocus={handleFocus}
          endAdornment={
            <InputAdornment position="start">
              {isLoading && <CircularProgress size={10} />}
              {isOk && <CheckIcon color="secondary" />}
            </InputAdornment>
          }
          aria-describedby="component-error-text"
          {...rest}
        />
        <FormHelperText id="component-error-text">{error}</FormHelperText>
      </FormControl>
      

    )
}

export default NormalInput

