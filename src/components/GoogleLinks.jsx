import React from 'react'
import MuiLink from '@material-ui/core/Link';

const GoogleLinks = ({string}) => {
    
    let people = string.split(", ").map(person => person.split(" ").join("+"))
    
    return (
        <span>
            {people.map((p, index) => (<span key={index}>
                <MuiLink href={`https://www.google.com/search?q=${p}`} target="_blank" rel="noreferrer">
                    {p.split("+").join(" ")}
                </MuiLink>{index!==(people.length-1)? ", " : ""}</span>
            ))}
        
        </span>
    )
}

export default GoogleLinks
