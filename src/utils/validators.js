export const onlyRegularCharacters = (string)=>{
    return (/^[a-zA-Z]+$/g).test(string)
}

export const isEmail = (string)=>{
    return (/^\S+@\S+\.\S+$/).test(string)
}

export const isValidPassword = (string)=>{
    // Minimum eight characters, at least one uppercase letter, one lowercase letter, one number and one special character:
   return (/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/).test(string)
}

export const match = (string, string2) => string === string2
