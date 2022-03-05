import React from "react";
import { Link } from "react-router-dom";
import s from './GameCard.module.css'

export default function GameCard ({id, name, image, genres, rating}){
    
    if(name==='No Results'){
        return(
            <h4>We couldn't find any games that match your request</h4>
        )
    }

    genres = genres.join(', ')

    return(
        <div className={s.card}>
            <Link className={s.link} to= {`/videogame/${id}`} key={id} >
                <h4 className={s.title}>{name}</h4>
                <img src={image} alt='img not found' className={s.image}/>
                <h5  className={s.genre}>{genres}</h5>
                <h5 className={s.genre}>Rating: {rating}</h5>
            </Link>
            
        </div>
    )
}

