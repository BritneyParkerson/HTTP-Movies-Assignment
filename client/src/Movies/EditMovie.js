import React, { useState, useEffect } from 'react';
import { useRouteMatch, useHistory } from 'react-router-dom';
import axios from 'axios';

function EditMovie ({ handleEditCount }) {
    const [ newValue, setNewValue ] = useState(null)
    const match = useRouteMatch();
    const history = useHistory();

    useEffect(() => {
        const id = match.params.id;
        axios
            .get(`https://localhost:5000/api/movies/${id}`)
            .then(res => {
                res.data = {
                    ...res.data,
                    stars: res.data.stars.toString()
                }
                setNewValue(res.data)                
            })
            .catch(error => {
                console.log(error);
            })
    }, [match.params.id]);
    
    const previousPage = () => {
        const id = match.params.id;
        history.push(`/movies/${id}`);
    }

    const handleChange = e => {
        setNewValue({
            ...newValue,
            [e.target.name]: e.target.value
        });
    }

    const handleSubmit = e => {
        e.preventDefault();
        newValue.metascore = newValue.metascore * 1;
        newValue.stars = newValue.stars.split(',');

        const id = match.params.id;
        axios
            .put(`http://localhost:5000/api/movies/${id}`, newValue)
            .then(() => {
            handleEditCount();
            history.push(`/movies/${id}`);
        })
        .catch(error => {
            console.log(error);
        })
    }

    return (
          <div>
            <button onClick={previousPage}> Previous </button>
            {newValue && (
                <form onSubmt={handleSubmit}>
                   <lable>Title</lable>
                    <div className="EditInput">
                    <input
                    name='title'
                    value={newValue.title}
                    placeholder='Enter Title'
                    onChange={handleChange}
                    />
                    </div>
                     <input
                    name='director'
                    value={newValue.director}
                    placeholder='Enter Name of Director'
                    onChange={handleChange}
                    />
                     <input
                    name='stars'
                    value={newValue.stars}
                    placeholder='Enter List of Stars'
                    onChange={handleChange}
                    />
                     <input
                    name='metascore'
                    value={newValue.metascore}
                    placeholder='Enter Metascore'
                    onChange={handleChange}
                    />
                     <input
                    type='submit changes'
                    value='Save'
                     />
                </form>
            )}
        </div>
    )
}
export default EditMovie;