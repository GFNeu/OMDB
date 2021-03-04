import React, {useState, useEffect} from 'react'
import FormControl from '@material-ui/core/FormControl';
import FormHelperText from '@material-ui/core/FormHelperText';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';


const NormalInput = ({label, name, confirmValue, className = "", validator, validatorErrorMsg, allowNull,...rest}) => {

    const [value, setValue] = useState("")
    const [error, setError] = useState("")
    const [changed, setChanged] = useState(false)

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
            //si pasaron la función validator y esta no pasó
            if(v && validator && !validator(v)){
                setError(validatorErrorMsg)
                v= "error"
            }   
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
          aria-describedby="component-error-text"
          {...rest}
        />
        <FormHelperText id="component-error-text">{error}</FormHelperText>
      </FormControl>
      

    )
}

export default NormalInput

