import React,{useState,useEffect} from "react";
import axios from "axios";

const UpdateMovie = (props) =>{

    const initialItem = {
        title: "",
        director: "",
        metascore: "",
        stars: []
    }
    const [movie, setMovie] = useState(initialItem);

    let newStars = movie.stars;

    const changeHandler = e => {
        e.persist();
        let value = e.target.value;
        if (e.target.name === 'price') {
          value = parseInt(value, 10);
        }
        setMovie({
          ...movie,
          [e.target.name]: value
        });
      };

    const arrayChangeHandler = e =>{
        e.persist();
        console.log(newStars[e.target.name]);
        newStars[e.target.name] = e.target.value
        setMovie({
            ...movie,
            stars: newStars
        })
    }

      const handleSubmit = e =>{
          e.preventDefault();
          axios.put(`http://localhost:5000/api/movies/${props.match.params.id}`, movie)
          .then((response)=>{
              console.log(response);
              props.history.push('/');
          })
      }

    useEffect(()=>{
        axios.get(`http://localhost:5000/api/movies/${props.match.params.id}`)
            .then((response)=>{
                console.log(response);
                setMovie(response.data);
            });
    },[props.match.params.id]);


    return(
        <div>
            <form onSubmit={handleSubmit}>
                <input value={movie.title} name="title" onChange={changeHandler} placeholder="title"/>
                <input value={movie.director} name="director" onChange={changeHandler} placeholder="director"/>
                <input value={movie.metascore} name="metascore" onChange={changeHandler} placeholder="metascore"/>
                {newStars.map((star, index)=>(
                    <input value={newStars[index]} name={index} placeholder={newStars[index]} onChange={arrayChangeHandler}/>
                ))}
                <button>Update Movie</button>
            </form>

        </div>
    )
}

export default UpdateMovie; 