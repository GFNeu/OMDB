export default function(query){
    return query.substring(1).split('%20').join(" ")
}