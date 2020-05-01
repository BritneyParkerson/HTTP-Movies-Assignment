 import React from 'react';

 const UpdateMovie = () => {
     MovieUpdated = (id, updateMovie) => {
         axios
            .put(`http://localhost/api/movie/${id}`, updateMovie)
            .then(res => console.log(res))
            .catch(error => console.log(error))
     }
    return null 
 }
 
export default UpdateMovie